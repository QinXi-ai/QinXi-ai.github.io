'use client';

import { useMemo, useState } from 'react';
import {
  contributions,
  contributionStats,
  domainClusters,
  mergedSearch,
  portfolioUpdated,
  recentMerges,
} from '../portfolio';

const CONSTELLATION_LAYOUT = [
  { cx: 112, cy: 76, r: 28 },
  { cx: 282, cy: 58, r: 22 },
  { cx: 438, cy: 96, r: 16 },
  { cx: 610, cy: 62, r: 21 },
  { cx: 768, cy: 88, r: 17 },
] as const;

export function ContributionsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredCluster, setHoveredCluster] = useState<string | null>(null);

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

  const activeCluster =
    domainClusters.find(
      (c) => c.id === (hoveredCluster ?? selectedCategory),
    ) ?? domainClusters[0];

  const handleClusterToggle = (id: string) => {
    setSelectedCategory((prev) => (prev === id ? 'All' : id));
  };

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
          From Blackwell GPU kernels and query engines to developer tooling and
          agent security.
        </p>
      </div>

      <div className="contribution-summary-bar mineral-card">
        <p>
          <strong>{contributionStats.recent} contributions merged</strong> since
          20 October · <strong>{contributionStats.merged} total</strong> across{' '}
          <strong>{contributionStats.repositories} repositories</strong>.
        </p>
        <a href={mergedSearch} target="_blank" rel="noreferrer">
          Browse all {contributionStats.merged}{' '}
          <span className="arrow-glyph" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>

      <div className="constellation-panel mineral-card">
        <div className="constellation-head">
          <span className="eyebrow">
            ENGINEERING CONSTELLATION · CLICK DOMAIN TO FILTER
          </span>
          <span className="constellation-readout">
            <strong>{activeCluster.label}</strong> · {activeCluster.prs} PRs ·{' '}
            {activeCluster.highlight}
          </span>
        </div>

        <svg
          viewBox="0 0 880 148"
          className="constellation-svg"
          aria-label="Interactive domain constellation of merged pull requests"
        >
          <defs>
            <pattern
              id="constellation-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="0.7" fill="#89d3d1" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="880" height="148" fill="url(#constellation-grid)" />

          {/* Connecting orbital filaments */}
          {CONSTELLATION_LAYOUT.slice(0, -1).map((pos, idx) => {
            const next = CONSTELLATION_LAYOUT[idx + 1];
            return (
              <line
                key={`edge-${idx}`}
                x1={pos.cx}
                y1={pos.cy}
                x2={next.cx}
                y2={next.cy}
                stroke="#89d3d1"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.28"
              />
            );
          })}

          {domainClusters.map((cluster, idx) => {
            const pos = CONSTELLATION_LAYOUT[idx];
            const isSelected = selectedCategory === cluster.id;
            const isHot = hoveredCluster === cluster.id || isSelected;
            return (
              <g
                key={cluster.id}
                className="constellation-node"
                onClick={() => handleClusterToggle(cluster.id)}
                onMouseEnter={() => setHoveredCluster(cluster.id)}
                onMouseLeave={() => setHoveredCluster(null)}
              >
                <circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r={pos.r + (isHot ? 9 : 5)}
                  fill="none"
                  stroke={cluster.accent}
                  strokeWidth={isSelected ? 1.5 : 1}
                  strokeDasharray={isSelected ? undefined : '3 4'}
                  opacity={isHot ? 0.85 : 0.3}
                />
                <circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r={pos.r}
                  fill={isHot ? cluster.accent : 'rgba(9, 18, 21, 0.88)'}
                  fillOpacity={isHot ? 0.22 : 0.92}
                  stroke={cluster.accent}
                  strokeWidth={isHot ? 1.8 : 1.15}
                />
                <text
                  x={pos.cx}
                  y={pos.cy + 4}
                  textAnchor="middle"
                  fill={isHot ? '#ecf3f1' : cluster.accent}
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                  fontWeight="500"
                >
                  {cluster.prs}
                </text>
                <text
                  x={pos.cx}
                  y={134}
                  textAnchor="middle"
                  fill={isHot ? '#ecf3f1' : '#a6bab7'}
                  fontFamily="var(--font-mono)"
                  fontSize="9.5"
                >
                  {cluster.id.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="spectrum-bar">
          {domainClusters.map((cluster) => (
            <button
              key={`bar-${cluster.id}`}
              type="button"
              aria-label={`Filter by ${cluster.label} (${cluster.prs} PRs)`}
              aria-pressed={selectedCategory === cluster.id}
              className={
                selectedCategory === cluster.id
                  ? 'spectrum-seg is-active'
                  : 'spectrum-seg'
              }
              style={{
                flexGrow: cluster.prs,
                background: cluster.accent,
              }}
              onClick={() => handleClusterToggle(cluster.id)}
            />
          ))}
        </div>
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

      <div className="telemetry-feed mineral-card" aria-label="Recent merges">
        <div className="telemetry-feed-head">
          <span className="status-dot" />
          <span>RECENT MERGES TELEMETRY</span>
        </div>
        <div className="telemetry-feed-list">
          {recentMerges.map((entry) => (
            <a
              key={entry.href}
              href={entry.href}
              target="_blank"
              rel="noreferrer"
              className="telemetry-feed-item"
            >
              <code>
                {entry.repo} {entry.number}
              </code>
              <span>{entry.title}</span>
              <time>{entry.date}</time>
            </a>
          ))}
        </div>
      </div>

      <p className="data-note">
        Public merged PRs outside the QinXi-ai personal namespace. Snapshot:{' '}
        <time dateTime={portfolioUpdated}>25 November 2026</time>.
      </p>
    </section>
  );
}
