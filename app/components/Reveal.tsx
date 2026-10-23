'use client';
import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }: { children: React.ReactNode; delay?: number; as?: 'div' | 'article'; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { rootMargin: '0px 0px -12% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref as never} className={`reveal ${className}`} data-in={inView} style={{ transitionDelay: `${delay}s` }}>{children}</Tag>;
}
