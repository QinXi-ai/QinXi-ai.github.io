'use client';

import { useEffect, useRef, useState } from 'react';

interface TelemetryCounterProps {
  value: number;
  pad?: number;
  suffix?: string;
}

export function TelemetryCounter({
  value,
  pad = 0,
  suffix = '',
}: TelemetryCounterProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let raf = 0;
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const duration = 560;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setDisplay(Math.round(value * eased));
        if (progress < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setDisplay(value);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  const text = pad > 0 ? String(display).padStart(pad, '0') : String(display);
  return (
    <strong ref={ref}>
      {text}
      {suffix}
    </strong>
  );
}
