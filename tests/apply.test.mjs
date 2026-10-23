// Posts sample applications to /api/apply in dry-run mode and checks each response.
// Run `npm run build` first. Set BASE_URL to test a running deployment (e.g. a preview, which has APPLY_DRY_RUN=1)
// instead of starting a local server.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';

const port = 3200 + Math.floor(Math.random() * 500);
let base = process.env.BASE_URL;
let server;

before(async () => {
  if (base) return;
  base = `http://127.0.0.1:${port}`;
  // Credentials are blanked so a misconfigured dry run can never reach the sheet or send email.
  const env = { ...process.env, APPLY_DRY_RUN: '1', GOOGLE_SERVICE_ACCOUNT_EMAIL: '', GOOGLE_PRIVATE_KEY: '', APPLICATIONS_SHEET_ID: '', RESEND_API_KEY: '', OPERATOR_EMAIL: '' };
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port), '-H', '127.0.0.1'], { env, stdio: 'ignore' });
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(base)).ok) return; } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('Server did not start. Run `npm run build` first.');
});

after(() => server?.kill());

const post = (body, ip) => fetch(`${base}/api/apply`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': ip },
  body: JSON.stringify(body),
});

const sample = {
  name: 'Test Applicant', email: 'applicant@example.com', city: 'Lagos', phone: '+234 800 000 0000',
  tier: 'The Member', heard: 'A member invited me', sponsor: 'No. 002', needs: 'Two suits for board meetings.',
  source: 'test · Send application', company: '',
};

test('a complete application is accepted in dry-run mode without being stored', async () => {
  const res = await post(sample, '203.0.113.10');
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, dryRun: true });
});

test('an application missing name, city or a valid email is rejected', async () => {
  for (const missing of [{ name: '' }, { city: ' ' }, { email: 'not-an-email' }]) {
    const res = await post({ ...sample, ...missing }, '203.0.113.11');
    assert.equal(res.status, 422, JSON.stringify(missing));
    assert.deepEqual(await res.json(), { ok: false });
  }
});

test('the honeypot quietly accepts and stores nothing', async () => {
  const res = await post({ ...sample, company: 'Bot Ltd' }, '203.0.113.12');
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
});

test('malformed JSON is rejected', async () => {
  const res = await fetch(`${base}/api/apply`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': '203.0.113.13' }, body: '{' });
  assert.equal(res.status, 400);
});
