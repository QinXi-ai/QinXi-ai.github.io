'use client';

import { useMemo, useState } from 'react';
import {
  contributions,
  contributionStats,
  mergedSearch,
  portfolioUpdated,
} from '../portfolio';

export function ContributionsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of contributions) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }
    return [
      { label: 'All', count: contributions.length },
      ...Array.from(counts.entries()).map(([label, count]) => ({
        label,
        count,
      })),
    ];
  }, []);

  const filtered = useMemo(() => {
    if (selectedCategory === 'All') return contributions;
    return contributions.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="contributions"
      className="section"
      aria-labelledby="contributions-title"
    >
      <div className="section-heading">
        <div>
          <span className="section-index">02</span>
          <p>Open-source contributions</p>
        </div>
        <h2 id="contributions-title">Built together. Merged upstream.</h2>
        <p className="section-intro">
          From query engines to developer tools and agent security.
        </p>
      </div>

      <div className="contribution-summary-bar mineral-card">
        <p>
          <strong>{contributionStats.recent} contributions merged</strong> since
          2 October · across{' '}
          <strong>{contributionStats.repositories} repositories</strong>.
        </p>
        <a href={mergedSearch} target="_blank" rel="noreferrer">
          Browse all {contributionStats.merged}{' '}
          <span className="arrow-glyph" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>

      <div
        className="filter-bar"
        role="tablist"
        aria-label="Filter open-source contributions by domain"
      >
        {categories.map((cat) => {
          const active = selectedCategory === cat.label;
          return (
            <button
              key={cat.label}
              type="button"
              role="tab"
              aria-selected={active}
              className={active ? 'filter-pill is-active' : 'filter-pill'}
              onClick={() => setSelectedCategory(cat.label)}
            >
              <span>{cat.label}</span>
              <span className="filter-count">{cat.count}</span>
            </button>
          );
        })}
      </div>

      <div className="contribution-grid">
        {filtered.map((item, index) => (
          <article className="contribution-card mineral-card" key={item.href}>
            <div className="contribution-top">
              <span>
                {String(index + 1).padStart(2, '0')} / {item.category}
              </span>
              <span className="merged-mark">Merged</span>
            </div>
            <p className="contribution-repo">
              {item.repo} <span>{item.number}</span>
            </p>
            <h3>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.title}{' '}
                <span className="arrow-glyph" aria-hidden="true">
                  ↗
                </span>
              </a>
            </h3>
            <p>{item.summary}</p>
            <div className="contribution-stats-line">{item.stats}</div>
            <div className="contribution-bottom">
              <span>{item.proof}</span>
              <time dateTime={item.mergedAt}>{item.mergedAt}</time>
            </div>
          </article>
        ))}
      </div>

      <p className="latest-merge mineral-card">
        <span className="status-dot" />
        <span className="latest-merge-label">Also just merged:</span>{' '}
        <a
          href="https://github.com/lacs-project/sysknife/pull/612"
          target="_blank"
          rel="noreferrer"
        >
          SysKnife #612 — credential detection after escaped boundaries{' '}
          <span aria-hidden="true">↗</span>
        </a>
        <time dateTime="2026-10-19">19 Oct</time>
      </p>
      <p className="data-note">
        Public merged PRs outside the QinXi-ai personal namespace. Snapshot:{' '}
        <time dateTime={portfolioUpdated}>20 October 2026</time>.
      </p>
    </section>
  );
}
