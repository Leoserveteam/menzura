import { NextResponse } from 'next/server';
import { createSign } from 'node:crypto';

export const runtime = 'nodejs';

const clean = (v: unknown, max = 2000) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
const safeCell = (v: string) => (/^[=+\-@]/.test(v) ? `'${v}` : v); // stop formula injection in the sheet
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now(); const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  recent.push(now); hits.set(ip, recent);
  return recent.length > 5;
}

async function googleToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
  const key = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({ iss: email, scope: 'https://www.googleapis.com/auth/spreadsheets', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 })}`;
  const sig = createSign('RSA-SHA256').update(unsigned).sign(key, 'base64url');
  const res = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${sig}` }) });
  if (!res.ok) throw new Error(`token ${res.status}`);
  return (await res.json()).access_token as string;
}

async function appendRow(row: string[]) {
  const token = await googleToken();
  const tab = process.env.APPLICATIONS_SHEET_TAB || 'Sheet1';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.APPLICATIONS_SHEET_ID}/values/${encodeURIComponent(tab)}!A1:N1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ values: [row] }) });
  if (!res.ok) throw new Error(`sheets ${res.status}`);
}

async function sendEmail(to: string, subject: string, text: string, replyTo?: string) {
  if (!process.env.RESEND_API_KEY || !to) return;
  await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: process.env.FROM_EMAIL || 'Menzura <house@menzura.co>', to: [to], subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }) });
}

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try { data = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  if (clean(data.company)) return NextResponse.json({ ok: true }); // honeypot: quietly accept, store nothing
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) return NextResponse.json({ ok: false }, { status: 429 });

  const a = { name: clean(data.name, 120), email: clean(data.email, 200), city: clean(data.city, 120), phone: clean(data.phone, 60), tier: clean(data.tier, 40), heard: clean(data.heard, 80), sponsor: clean(data.sponsor, 40), needs: clean(data.needs, 2000), source: clean(data.source, 120) };
  if (!a.name || !a.city || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email)) return NextResponse.json({ ok: false }, { status: 422 });

  if (process.env.APPLY_DRY_RUN === '1') return NextResponse.json({ ok: true, dryRun: true });
  if (!process.env.APPLICATIONS_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.error('apply: sheet credentials missing');
    return NextResponse.json({ ok: false }, { status: 503 });
  }
  const row = [new Date().toISOString(), a.name, a.email, a.city, a.phone, a.tier, a.heard, a.sponsor, a.needs, 'Applied', '', '', '', a.source].map(safeCell);
  try { await appendRow(row); } catch (err) { console.error('apply: sheet append failed', err); return NextResponse.json({ ok: false }, { status: 502 }); }

  await Promise.allSettled([
    sendEmail(process.env.OPERATOR_EMAIL || '', `New application: ${a.name}, ${a.city}`, `A new application is in the applications sheet.\n\nName: ${a.name}\nEmail: ${a.email}\nCity: ${a.city}\nPhone: ${a.phone || '(not given)'}\nMembership: ${a.tier}\nHeard: ${a.heard || '(not given)'}\nSponsor: ${a.sponsor || '(none)'}\nNeeds: ${a.needs || '(not given)'}\nSource: ${a.source}`, a.email),
    sendEmail(a.email, 'Your application is with the house', `Dear ${a.name.split(' ')[0]},\n\nThank you. Your application is with the house.\n\nThe house reviews every application personally. Within one business day, a stylist will write to you by email. If membership is offered, you will be invited to a short welcome conversation and your first fitting.\n\nThe house\nMenzura`),
  ]);
  return NextResponse.json({ ok: true });
}
