'use client';

import { useEffect, useState } from 'react';
import { CommandPalette } from './CommandPalette';

const NAV_ITEMS = [
  { href: '#research', id: 'research', label: 'Research', chapter: 1 },
  {
    href: '#contributions',
    id: 'contributions',
    label: 'Open source',
    chapter: 2,
  },
  { href: '#work', id: 'work', label: 'Projects', chapter: 3 },
  { href: '#recognition', id: 'recognition', label: 'Recognition', chapter: 4 },
] as const;

export function SiteChrome() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const sectionElements = NAV_ITEMS.flatMap((item) => {
      const el = document.getElementById(item.id);
      return el ? [{ el, id: item.id, chapter: item.chapter }] : [];
    });

    let lastChapter = -1;
    const emitChapter = (chapter: number) => {
      if (chapter === lastChapter) return;
      lastChapter = chapter;
      window.dispatchEvent(
        new CustomEvent<number>('forge:section', { detail: chapter }),
      );
    };

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
        emitChapter(0);
        return;
      }

      const probeY = Math.max(150, window.innerHeight * 0.28);
      let current = '';
      let currentChapter = 0;
      for (const entry of sectionElements) {
        if (entry.el.getBoundingClientRect().top <= probeY) {
          current = entry.id;
          currentChapter = entry.chapter;
        }
      }
      setActiveSection(current);
      emitChapter(currentChapter);
    };

    // Specular border spotlight: update hovered and nearby visible mineral cards
    let pointerRaf = 0;
    let lastClientX = 0;
    let lastClientY = 0;
    const updateCardSpotlights = () => {
      pointerRaf = 0;
      const cards = document.querySelectorAll<HTMLElement>('.mineral-card');
      const margin = 220;
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        if (
          rect.bottom < -margin ||
          rect.top > window.innerHeight + margin ||
          rect.right < -margin ||
          rect.left > window.innerWidth + margin
        ) {
          continue;
        }
        const near =
          lastClientX >= rect.left - margin &&
          lastClientX <= rect.right + margin &&
          lastClientY >= rect.top - margin &&
          lastClientY <= rect.bottom + margin;
        if (near) {
          card.style.setProperty('--mx', `${lastClientX - rect.left}px`);
          card.style.setProperty('--my', `${lastClientY - rect.top}px`);
          card.style.setProperty('--spot', '1');
        } else if (card.style.getPropertyValue('--spot') === '1') {
          card.style.setProperty('--spot', '0');
        }
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      if (!pointerRaf) {
        pointerRaf = requestAnimationFrame(updateCardSpotlights);
      }
    };

    // Scroll reveal choreography
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let revealObserver: IntersectionObserver | null = null;
    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      for (const el of revealEls) el.classList.add('is-revealed');
    } else {
      revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              revealObserver?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.08, rootMargin: '0px 0px -32px 0px' },
      );
      for (const el of revealEls) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          el.classList.add('is-revealed');
        } else {
          revealObserver.observe(el);
        }
      }
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(pointerRaf);
      revealObserver?.disconnect();
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
        <div className="header-actions">
          <button
            type="button"
            className="header-cmd"
            onClick={() =>
              window.dispatchEvent(new Event('forge:open-palette'))
            }
            title="Open command palette (⌘K or /)"
          >
            <span>Search</span>
            <kbd>⌘K</kbd>
          </button>
          <a className="header-contact" href="mailto:3624951962qx@gmail.com">
            <span>Let&apos;s talk</span>
            <span className="arrow-glyph" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>
      <div
        className="scroll-rail"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      <CommandPalette />
    </header>
  );
}
