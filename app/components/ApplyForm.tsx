'use client';
import { useEffect, useRef, useState } from 'react';

type Status = 'idle' | 'sending' | 'sent';
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function ApplyForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});
  const [tier, setTier] = useState('The Member');
  const [heard, setHeard] = useState('');
  const [source, setSource] = useState('');
  const sponsorRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href="#apply"]') as HTMLAnchorElement | null;
      if (!a) return;
      setSource(a.textContent?.trim() || '');
      const t = a.getAttribute('data-tier'); if (t) setTier(t);
      if (a.hasAttribute('data-invite')) { setHeard('A member invited me'); setTimeout(() => sponsorRef.current?.focus({ preventScroll: true }), 900); }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => { if (status === 'sent') confirmRef.current?.focus(); }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') || ''), email = String(fd.get('email') || ''), city = String(fd.get('city') || '');
    const bad = { name: !name.trim(), email: !emailOk(email), city: !city.trim() };
    setInvalid(bad);
    if (bad.name || bad.email || bad.city) { setError('Please add your name, your city and a valid email.'); return; }
    setError(''); setStatus('sending');
    try {
      const body = Object.fromEntries(fd.entries());
      const res = await fetch('/api/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...body, source: `${window.innerWidth >= 1100 ? 'desktop' : window.innerWidth >= 600 ? 'tablet' : 'mobile'} · ${source || 'form'}` }) });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
    } catch {
      setStatus('idle');
      setError('Something went wrong sending your application. Please try again, or write to house@menzura.co.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="confirm" role="status">
        <h3 ref={confirmRef} tabIndex={-1}>Thank you.</h3>
        <p className="t-lead">Your application is with the house. Here is what happens next.</p>
        <ol className="next">
          <li><span>1</span>The house reviews your application personally.</li>
          <li><span>2</span>Within one business day, a stylist writes to you by email.</li>
          <li><span>3</span>If membership is offered, you’re invited to a short welcome conversation and your first fitting.</li>
        </ol>
        <p className="t-small muted">Your stylist will write within one business day.</p>
      </div>
    );
  }

  return (
    <form className="form" noValidate onSubmit={onSubmit} aria-describedby="form-intro">
      <p id="form-intro" className="full t-small muted">Takes under a minute. Only your name, email and city are needed.</p>
      <div className="field" data-error={invalid.name}><label htmlFor="f-name">Full name</label><input id="f-name" name="name" autoComplete="name" required aria-invalid={invalid.name || undefined} /></div>
      <div className="field" data-error={invalid.email}><label htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" autoComplete="email" required aria-invalid={invalid.email || undefined} /></div>
      <div className="field" data-error={invalid.city}><label htmlFor="f-city">City</label><input id="f-city" name="city" autoComplete="address-level2" required aria-invalid={invalid.city || undefined} /></div>
      <p className="full opt-head">Tell us more (optional)</p>
      <div className="field"><label htmlFor="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" autoComplete="tel" /></div>
      <div className="field"><label htmlFor="f-tier">Membership</label>
        <select id="f-tier" name="tier" value={tier} onChange={(e) => setTier(e.target.value)}>
          <option>The Member</option><option>The Principal</option><option>Not sure yet</option>
        </select>
      </div>
      <div className="field"><label htmlFor="f-heard">How did you hear about Menzura?</label>
        <select id="f-heard" name="heard" value={heard} onChange={(e) => setHeard(e.target.value)}>
          <option value="">Choose one</option><option>A member invited me</option><option>A friend or colleague</option><option>Press</option><option>Social media</option><option>Other</option>
        </select>
      </div>
      <div className="field"><label htmlFor="f-sponsor">Sponsor number, if invited</label><input id="f-sponsor" name="sponsor" ref={sponsorRef} placeholder="For example, No. 002" /></div>
      <div className="field full"><label htmlFor="f-needs">What do you need your clothes to do?</label><textarea id="f-needs" name="needs" /></div>
      <div className="hp" aria-hidden="true"><label htmlFor="f-company">Company</label><input id="f-company" name="company" tabIndex={-1} autoComplete="off" /></div>
      <p className="full error" role="alert">{error}</p>
      <div className="full submit">
        <button className="btn btn-solid" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending' : 'Send application'}</button>
        <p className="t-meta">Your details are used only to review your application.</p>
      </div>
    </form>
  );
}
