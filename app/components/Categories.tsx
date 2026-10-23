'use client';
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import type { Category } from '../content';

function CategoryRow({ c, initiallyOpen, registerVideo }: { c: Category; initiallyOpen: boolean; registerVideo: (v: HTMLVideoElement | null) => void }) {
  const [open, setOpen] = useState(initiallyOpen);
  const id = `incl-${c.key}`;
  return (
    <article className="cat">
      <div className="cat-name">
        <h3 className="t-card">{c.name}</h3>
        <p className="t-promise">{c.promise}</p>
      </div>
      <div className="story">
        <video ref={registerVideo} className="loop" muted loop playsInline preload="none" data-poster={`/images/loop-${c.key}.webp`} aria-hidden="true" width={1280} height={720}>
          <source src={`/motion/loop-${c.key}.webm`} type="video/webm" />
          <source src={`/motion/loop-${c.key}.mp4`} type="video/mp4" />
        </video>
        <p className="t-scene">{c.scene}</p>
        <button className="toggle" type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          What’s included
          <img className="chev" src="/images/chevron.svg" alt="" width={14} height={14} />
        </button>
        <div className="panel" id={id} data-open={open}>
          <div>
            <ul className="benefits">
              {c.items.map((b) => (
                <li key={b.text}><span>{b.text}</span>{b.principal && <span className="tag">Principal</span>}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Categories({ items }: { items: Category[] }) {
  const videos = useRef<HTMLVideoElement[]>([]);
  // Stills load only as a loop nears the screen, so they stay off the critical path.
  useEffect(() => {
    const show = (v: HTMLVideoElement) => { if (!v.poster && v.dataset.poster) v.poster = v.dataset.poster; };
    if (!('IntersectionObserver' in window)) { videos.current.forEach(show); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { show(e.target as HTMLVideoElement); io.unobserve(e.target); } }), { rootMargin: '100% 0px' });
    videos.current.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const pick = () => {
      ticking = false;
      const mid = window.innerHeight / 2;
      let best: HTMLVideoElement | null = null; let bestD = Infinity;
      for (const v of videos.current) {
        const r = v.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) { const d = Math.abs((r.top + r.bottom) / 2 - mid); if (d < bestD) { bestD = d; best = v; } }
      }
      for (const v of videos.current) {
        if (v === best) { if (v.paused) { v.preload = 'auto'; v.play().catch(() => {}); } }
        else if (!v.paused) v.pause();
      }
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(pick); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    pick();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const register = (v: HTMLVideoElement | null) => { if (v && !videos.current.includes(v)) videos.current.push(v); };
  return (
    <div className="cats">
      {items.map((c, i) => <CategoryRow key={c.key} c={c} initiallyOpen={i === 0} registerVideo={register} />)}
    </div>
  );
}
