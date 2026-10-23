'use client';
import { useEffect, useRef } from 'react';

// The teaser carries title cards, measurement graphics and burned-in words that would sit behind the
// headline. Until a clean background cut exists, only this stretch of footage (no text or graphics) plays.
// With a clean cut, set CLIP to null.
const CLIP: { start: number; end: number } | null = { start: 5.9, end: 6.5 };

type FrameVideo = HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number };

export default function HeroFilm() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current as FrameVideo | null;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.pause(); return; }
    if (!CLIP) { v.play().catch(() => {}); return; }
    const { start, end } = CLIP;
    let stopped = false;
    const keepInClip = () => { if (v.currentTime >= end || v.currentTime < start) v.currentTime = start; };
    // Check every frame where supported, so the loop never shows a frame past the clean stretch.
    const onFrame = () => { if (stopped) return; keepInClip(); v.requestVideoFrameCallback?.(onFrame); };
    const begin = () => {
      v.currentTime = start;
      v.play().catch(() => {});
      if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(onFrame);
      else v.addEventListener('timeupdate', keepInClip);
    };
    if (v.readyState >= 1) begin(); else v.addEventListener('loadedmetadata', begin, { once: true });
    return () => { stopped = true; v.removeEventListener('timeupdate', keepInClip); v.removeEventListener('loadedmetadata', begin); };
  }, []);
  return (
    <video ref={ref} className="hero-bg" muted playsInline loop={!CLIP} preload="metadata" poster="/images/hero-teaser-poster.webp" aria-hidden="true" width={1280} height={720}>
      <source src="/motion/hero-teaser.webm" type="video/webm" />
      <source src="/motion/hero-teaser.mp4" type="video/mp4" />
    </video>
  );
}
