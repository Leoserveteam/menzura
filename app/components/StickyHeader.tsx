'use client';
import { useEffect, useState } from 'react';
import Wordmark from './Wordmark';

export default function StickyHeader() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  return (
    <div className="sticky" data-show={show} aria-hidden={!show}>
      <div className="wrap">
        <a href="#top" tabIndex={show ? 0 : -1} aria-label="Menzura, back to top"><Wordmark /></a>
        <a className="btn btn-line btn-sm" href="#apply" tabIndex={show ? 0 : -1} data-tier="">Apply</a>
      </div>
    </div>
  );
}
