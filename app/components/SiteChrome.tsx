'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { href: '#research', id: 'research', label: 'Research' },
  { href: '#contributions', id: 'contributions', label: 'Open source' },
  { href: '#work', id: 'work', label: 'Projects' },
  { href: '#recognition', id: 'recognition', label: 'Recognition' },
] as const;

export function SiteChrome() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const sectionElements = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter((el): el is HTMLElement => el !== null);

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      setProgress(Math.min(Math.max(y / maxScroll, 0), 1));

      if (y < 140) {
        setActiveSection('');
        return;
      }

      const probeY = Math.max(150, window.innerHeight * 0.28);
      let current = '';
      for (const el of sectionElements) {
        if (el.getBoundingClientRect().top <= probeY) {
          current = el.id;
        }
      }
      setActiveSection(current);
    };

    const onPointerMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const card = target?.closest<HTMLElement>('.mineral-card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <div className="header-inner">
        <a className="wordmark" href="#top" aria-label="Xi Qin, back to top">
          <span className="monogram">
            <span>XQ</span>
          </span>
          <span className="wordmark-text">
            <strong>Xi Qin</strong>
            <small>Wuhan University</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={activeSection === item.id ? 'is-active' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-contact" href="mailto:3624951962qx@gmail.com">
          <span>Let&apos;s talk</span>
          <span className="arrow-glyph" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
      <div
        className="scroll-rail"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
    </header>
  );
}
