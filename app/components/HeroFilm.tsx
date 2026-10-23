'use client';
import { useEffect, useRef } from 'react';

export default function HeroFilm() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.pause(); return; }
    v.play().catch(() => {});
  }, []);
  return (
    <video ref={ref} className="film" muted loop playsInline preload="metadata" poster="/images/hero-teaser-poster.webp" aria-label="A short film from the house" width={1280} height={720}>
      <source src="/motion/hero-teaser.webm" type="video/webm" />
      <source src="/motion/hero-teaser.mp4" type="video/mp4" />
    </video>
  );
}
