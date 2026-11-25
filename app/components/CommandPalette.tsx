'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  contributions,
  identityPaper,
  latestPaper,
  projects,
  selectionPaper,
} from '../portfolio';
import type { FieldMode } from './fluidField';

interface CommandItem {
  id: string;
  group: string;
  label: string;
  meta: string;
  keywords: string;
  run: () => void;
}

const BIBTEX_IDENTITY = `@misc{qin2026identity,
  title={Instance-Optimal Identity Testing at the Original Total-Variation Radius},
  author={Xi Qin},
  year={2026},
  doi={10.5281/zenodo.23584756}
}`;

const BIBTEX_SELECTION = `@misc{qin2026threeexample,
  title={Exact Three-Example Selection in Every Dimension},
  author={Xi Qin},
  year={2026},
  doi={10.5281/zenodo.23119254}
}`;

const BIBTEX_EVAL = `@article{qin2026eval,
  title={What Does an Evaluation License? A Commit-Bound Census of Claim-Relative Inference in Inspect Evals},
  author={Xi Qin},
  journal={arXiv preprint arXiv:2608.19269},
  year={2026}
}`;

function dispatchField(
  detail:
    | { type: 'pulse' }
    | { type: 'mode'; mode: FieldMode }
    | { type: 'toggle-pause' },
) {
  window.dispatchEvent(new CustomEvent('forge:command', { detail }));
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const items = useMemo<CommandItem[]>(() => {
    const copyText = (text: string, label: string) => {
      void navigator.clipboard?.writeText(text);
      setToast(`Copied ${label}`);
      window.setTimeout(() => setToast(null), 1800);
    };
    const jump = (hash: string) => {
      setOpen(false);
      const target = document.querySelector(hash);
      target?.scrollIntoView({ behavior: 'smooth' });
    };
    const openUrl = (url: string) => {
      setOpen(false);
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    const base: CommandItem[] = [
      {
        id: 'nav-research',
        group: 'Navigate',
        label: 'Jump to 01 / Selected research',
        meta: '#research',
        keywords: 'papers wsdm canonne colt arxiv',
        run: () => jump('#research'),
      },
      {
        id: 'nav-contrib',
        group: 'Navigate',
        label: 'Jump to 02 / Open-source contributions',
        meta: '#contributions',
        keywords: 'pr github mojo datafusion sysknife',
        run: () => jump('#contributions'),
      },
      {
        id: 'nav-work',
        group: 'Navigate',
        label: 'Jump to 03 / Selected projects',
        meta: '#work',
        keywords: 'projects lean moss fastread mooncat',
        run: () => jump('#work'),
      },
      {
        id: 'nav-recognition',
        group: 'Navigate',
        label: 'Jump to 04 / Recognition & awards',
        meta: '#recognition',
        keywords: 'awards ccf quantum openvela',
        run: () => jump('#recognition'),
      },
      {
        id: 'field-pulse',
        group: 'Field & Shader',
        label: 'Emit radial shockwave pulse',
        meta: 'PULSE ✦',
        keywords: 'webgl ripple animation effect',
        run: () => {
          dispatchField({ type: 'pulse' });
          setOpen(false);
        },
      },
      {
        id: 'field-mineral',
        group: 'Field & Shader',
        label: 'Shader mode: Mineral Fluid',
        meta: 'MINERAL',
        keywords: 'shader background default webgl',
        run: () => {
          dispatchField({ type: 'mode', mode: 'mineral' });
          setOpen(false);
        },
      },
      {
        id: 'field-topo',
        group: 'Field & Shader',
        label: 'Shader mode: Topographic Instrument Grid',
        meta: 'TOPO',
        keywords: 'contour wireframe grid scientific shader',
        run: () => {
          dispatchField({ type: 'mode', mode: 'topo' });
          setOpen(false);
        },
      },
      {
        id: 'field-calm',
        group: 'Field & Shader',
        label: 'Shader mode: Calm Low-Motion',
        meta: 'CALM',
        keywords: 'quiet dim battery low power shader',
        run: () => {
          dispatchField({ type: 'mode', mode: 'calm' });
          setOpen(false);
        },
      },
      {
        id: 'copy-email',
        group: 'Copy',
        label: 'Copy email address',
        meta: '3624951962qx@gmail.com',
        keywords: 'contact mail email',
        run: () => copyText('3624951962qx@gmail.com', 'email'),
      },
      {
        id: 'copy-bib-id',
        group: 'Copy',
        label: 'Copy BibTeX: Instance-Optimal Identity Testing',
        meta: 'Zenodo DOI',
        keywords: 'bibtex citation canonne distribution testing lean',
        run: () => copyText(BIBTEX_IDENTITY, 'BibTeX (Identity Testing)'),
      },
      {
        id: 'copy-bib-sel',
        group: 'Copy',
        label: 'Copy BibTeX: Exact Three-Example Selection',
        meta: 'Zenodo DOI',
        keywords: 'bibtex citation colt learning theory',
        run: () => copyText(BIBTEX_SELECTION, 'BibTeX (Three-Example)'),
      },
      {
        id: 'copy-bib-eval',
        group: 'Copy',
        label: 'Copy BibTeX: What Does an Evaluation License?',
        meta: 'arXiv:2608.19269',
        keywords: 'bibtex citation inspect evals audit',
        run: () => copyText(BIBTEX_EVAL, 'BibTeX (Evaluation License)'),
      },
      {
        id: 'paper-wsdm',
        group: 'Research',
        label: latestPaper.title,
        meta: latestPaper.venue,
        keywords: 'paper multi-agent repair intent mp-bench',
        run: () => jump(latestPaper.href),
      },
      {
        id: 'paper-lean',
        group: 'Research',
        label: `${identityPaper.title} — Lean 4 (${identityPaper.leanModules} modules)`,
        meta: 'GitHub ↗',
        keywords: 'lean4 formalization theorem proof canonne',
        run: () => openUrl(identityPaper.leanRepo),
      },
      {
        id: 'paper-sel',
        group: 'Research',
        label: selectionPaper.title,
        meta: 'PDF ↗',
        keywords: 'three example selection colt 2025 pdf',
        run: () => openUrl(selectionPaper.pdf),
      },
    ];

    const projectItems: CommandItem[] = projects.map((p) => ({
      id: `proj-${p.name}`,
      group: 'Projects',
      label: p.name,
      meta: `${p.language} ↗`,
      keywords: `${p.description} ${p.language}`,
      run: () => openUrl(p.href),
    }));

    const prItems: CommandItem[] = contributions.map((c) => ({
      id: `pr-${c.href}`,
      group: 'Merged PRs',
      label: `${c.repo} ${c.number} — ${c.title}`,
      meta: `${c.mergedAt} ↗`,
      keywords: `${c.category} ${c.summary} ${c.repo}`,
      run: () => openUrl(c.href),
    }));

    return [...base, ...projectItems, ...prItems];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 12);
    return items
      .filter((item) =>
        `${item.group} ${item.label} ${item.meta} ${item.keywords}`
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 12);
  }, [items, query]);

  const safeIndex = Math.min(activeIndex, Math.max(filtered.length - 1, 0));

  useEffect(() => {
    const openPalette = () => {
      setOpen(true);
      setQuery('');
      setActiveIndex(0);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) {
            setQuery('');
            setActiveIndex(0);
          }
          return !prev;
        });
        return;
      }
      if (
        e.key === '/' &&
        !open &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        )
      ) {
        e.preventDefault();
        openPalette();
        return;
      }
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('forge:open-palette', openPalette);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('forge:open-palette', openPalette);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="palette-backdrop">
      <button
        type="button"
        className="palette-dismiss"
        aria-label="Close command palette"
        onClick={() => setOpen(false)}
      />
      <dialog
        open
        className="palette-dialog mineral-card"
        aria-label="Command palette"
      >
        <div className="palette-input-row">
          <span className="palette-prompt" aria-hidden="true">
            &gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIndex((prev) =>
                  filtered.length ? (prev + 1) % filtered.length : 0,
                );
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIndex((prev) =>
                  filtered.length
                    ? (prev - 1 + filtered.length) % filtered.length
                    : 0,
                );
              } else if (e.key === 'Enter' && filtered[safeIndex]) {
                e.preventDefault();
                filtered[safeIndex].run();
              }
            }}
            placeholder="Search papers, 98 PRs, projects, BibTeX, shader modes..."
            className="palette-input"
          />
          <kbd className="palette-kbd">ESC</kbd>
        </div>

        <div className="palette-list">
          {filtered.length === 0 ? (
            <p className="palette-empty">No matching command or record.</p>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                aria-current={idx === safeIndex ? 'true' : undefined}
                className={
                  idx === safeIndex ? 'palette-item is-active' : 'palette-item'
                }
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={item.run}
              >
                <span className="palette-group">{item.group}</span>
                <span className="palette-label">{item.label}</span>
                <span className="palette-meta">{item.meta}</span>
              </button>
            ))
          )}
        </div>

        <div className="palette-footer">
          <span>{toast ?? '↑↓ navigate · ↵ execute · / or ⌘K toggle'}</span>
          <span>FORGE COMMAND</span>
        </div>
      </dialog>
    </div>
  );
}
