'use client';

import { useMemo, useRef, useState } from 'react';

type LabMode = 'extremal' | 'lean' | 'kernel';

interface Point {
  id: string;
  label: string;
  x: number;
  y: number;
  labelDx: number;
  labelDy: number;
}

const INITIAL_POINTS: readonly Point[] = [
  { id: 'x1', label: 'x₁', x: 220, y: 66, labelDx: 15, labelDy: -6 },
  { id: 'x2', label: 'x₂', x: 84, y: 274, labelDx: -26, labelDy: 18 },
  { id: 'x3', label: 'x₃', x: 356, y: 272, labelDx: 14, labelDy: 16 },
  { id: 'x4', label: 'x₄', x: 220, y: 344, labelDx: 15, labelDy: 20 },
];

// Asymmetric cluster near the 2D extremal configuration for n = 3 selection
const EXTREMAL_PRESET: readonly Point[] = [
  { id: 'x1', label: 'x₁', x: 220, y: 58, labelDx: 14, labelDy: -4 },
  { id: 'x2', label: 'x₂', x: 96, y: 298, labelDx: -26, labelDy: 16 },
  { id: 'x3', label: 'x₃', x: 344, y: 298, labelDx: 14, labelDy: 16 },
  { id: 'x4', label: 'x₄', x: 220, y: 228, labelDx: 14, labelDy: 16 },
];

interface LeanNode {
  id: string;
  file: string;
  short: string;
  x: number;
  y: number;
  exportName: string;
  detail: string;
}

const LEAN_NODES: readonly LeanNode[] = [
  {
    id: 'target',
    file: 'Target.lean',
    short: 'Target & Scale',
    x: 84,
    y: 190,
    exportName: 'complexityScale(q, ε)',
    detail: 'Allocation, overlap moment, positive roots, and TV-radius scale.',
  },
  {
    id: 'alloc',
    file: 'AllocationExistence.lean',
    short: 'Allocation',
    x: 215,
    y: 94,
    exportName: 'strictConcavity · derivatives',
    detail: 'Strict concavity, explicit derivatives, and sharp Hölder envelope.',
  },
  {
    id: 'heavy',
    file: 'HeavyUpperAssembly.lean',
    short: 'Upper / Lower',
    x: 215,
    y: 190,
    exportName: 'Heavy + Moment bounds',
    detail: 'Matching upper tests & prior lower bounds on countable alphabets.',
  },
  {
    id: 'rational',
    file: 'RationalComplexityScale.lean',
    short: 'Rational Eval',
    x: 215,
    y: 288,
    exportName: 'rationalComplexityInterval',
    detail: 'Polynomial-time factor-two interval 0 ≤ L ≤ scale ≤ U ≤ 2L.',
  },
  {
    id: 'char',
    file: 'CountableCharacterization.lean',
    short: 'Main Theorem',
    x: 348,
    y: 142,
    exportName: 'countable_characterization',
    detail: "Resolves Canonne's COLT 2024 Open Question 1 at original TV radius.",
  },
  {
    id: 'verify',
    file: 'Verification.lean',
    short: 'Axiom Audit',
    x: 348,
    y: 248,
    exportName: '530 modules · 0 sorrys',
    detail: 'Automated type, axiom, and executable rational interval audit.',
  },
];

const LEAN_EDGES: readonly [string, string][] = [
  ['target', 'alloc'],
  ['target', 'heavy'],
  ['target', 'rational'],
  ['alloc', 'char'],
  ['heavy', 'char'],
  ['rational', 'verify'],
  ['char', 'verify'],
];

const KERNEL_PRESETS = [
  {
    id: 'q4k',
    label: 'Q4_K · BLACKWELL',
    pr: 'mojo-dllm #71',
    href: 'https://github.com/dllm-labs/mojo-dllm/pull/71',
    metric: 'RTX PRO 6000D · +5,739 lines',
    summary: 'Short-tile Q4_K matmul dispatch tuned for Blackwell warps.',
    activeMask: [
      1, 1, 1, 1, 0, 0, 1, 1,
      1, 1, 1, 1, 0, 0, 1, 1,
      0, 1, 1, 0, 1, 1, 1, 0,
      0, 1, 1, 0, 1, 1, 1, 0,
    ],
  },
  {
    id: 'gqa',
    label: 'GQA · BATCH',
    pr: 'mojo-dllm #73',
    href: 'https://github.com/dllm-labs/mojo-dllm/pull/73',
    metric: 'Exact softmax order · +7,108 lines',
    summary: 'Batched long grouped-query attention loads with deterministic order.',
    activeMask: [
      1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 1, 1, 1, 1, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 1, 1, 1, 1, 0, 0,
    ],
  },
  {
    id: 'moe',
    label: 'MOE · Q5/Q8',
    pr: 'mojo-dllm #133',
    href: 'https://github.com/dllm-labs/mojo-dllm/pull/133',
    metric: 'Grouped MoE tiles · +1,914 lines',
    summary: 'Q5_0 and Q8_0 CPU tiles paired with grouped MoE execution primitives.',
    activeMask: [
      1, 0, 1, 0, 1, 1, 0, 1,
      1, 1, 0, 1, 0, 1, 1, 0,
      0, 1, 1, 0, 1, 0, 1, 1,
      1, 0, 0, 1, 1, 1, 0, 1,
    ],
  },
] as const;

const VIEW_W = 440;
const VIEW_H = 380;
const PAD = 34;

export function SimplexFieldArt() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [mode, setMode] = useState<LabMode>('extremal');
  const [points, setPoints] = useState<Point[]>(() =>
    INITIAL_POINTS.map((pt) => ({ ...pt })),
  );
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [hasDragged, setHasDragged] = useState(false);
  const [selectedLeanId, setSelectedLeanId] = useState<string>('char');
  const [kernelIndex, setKernelIndex] = useState<number>(0);

  const metrics = useMemo(() => {
    const mx = points.reduce((acc, pt) => acc + pt.x, 0) / points.length;
    const my = points.reduce((acc, pt) => acc + pt.y, 0) / points.length;
    const avgDist =
      points.reduce((acc, pt) => acc + Math.hypot(pt.x - mx, pt.y - my), 0) /
      points.length;
    const variancePx2 =
      points.reduce((acc, pt) => acc + (pt.x - mx) ** 2 + (pt.y - my) ** 2, 0) /
      points.length;

    // Best 3-example subset (with repetition allowed) minimizing ||mu_3 - mu||^2
    let bestErr2 = Number.POSITIVE_INFINITY;
    let bestTriple: [number, number, number] = [0, 1, 2];
    let bestMx3 = mx;
    let bestMy3 = my;
    for (let i = 0; i < points.length; i++) {
      for (let j = i; j < points.length; j++) {
        for (let k = j; k < points.length; k++) {
          const cx = (points[i].x + points[j].x + points[k].x) / 3;
          const cy = (points[i].y + points[j].y + points[k].y) / 3;
          const err2 = (cx - mx) ** 2 + (cy - my) ** 2;
          if (err2 < bestErr2) {
            bestErr2 = err2;
            bestTriple = [i, j, k];
            bestMx3 = cx;
            bestMy3 = cy;
          }
        }
      }
    }

    const excessRatio = variancePx2 > 1e-6 ? bestErr2 / variancePx2 : 0;
    return {
      mx,
      my,
      avgDist,
      bestTriple,
      bestMx3,
      bestMy3,
      excessRatio,
    };
  }, [points]);

  const updatePointFromClient = (
    index: number,
    clientX: number,
    clientY: number,
  ) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const nx = ((clientX - rect.left) / rect.width) * VIEW_W;
    const ny = ((clientY - rect.top) / rect.height) * VIEW_H;
    const clampedX = Math.max(PAD, Math.min(VIEW_W - PAD, nx));
    const clampedY = Math.max(PAD, Math.min(VIEW_H - 42, ny));

    setPoints((prev) =>
      prev.map((pt, i) =>
        i === index ? { ...pt, x: clampedX, y: clampedY } : pt,
      ),
    );
  };

  const handlePointerDown = (
    index: number,
    e: React.PointerEvent<SVGGElement>,
  ) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDraggingIndex(index);
    setHasDragged(true);
    updatePointFromClient(index, e.clientX, e.clientY);
  };

  const handlePointerMove = (
    index: number,
    e: React.PointerEvent<SVGGElement>,
  ) => {
    if (draggingIndex !== index) return;
    updatePointFromClient(index, e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<SVGGElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setDraggingIndex(null);
  };

  const applyPreset = () => {
    setPoints(EXTREMAL_PRESET.map((pt) => ({ ...pt })));
    setHasDragged(true);
  };

  const resetSimplex = () => {
    setPoints(INITIAL_POINTS.map((pt) => ({ ...pt })));
    setHasDragged(false);
  };

  const [p1, p2, p3, p4] = points;
  const activeLean =
    LEAN_NODES.find((node) => node.id === selectedLeanId) ?? LEAN_NODES[4];
  const activeKernel = KERNEL_PRESETS[kernelIndex];

  return (
    <div className="hero-art mineral-card">
      <div className="lab-tabs" role="tablist" aria-label="Interactive lab modes">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'extremal'}
          className={mode === 'extremal' ? 'lab-tab is-active' : 'lab-tab'}
          onClick={() => setMode('extremal')}
        >
          01 / EXTREMAL
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'lean'}
          className={mode === 'lean' ? 'lab-tab is-active' : 'lab-tab'}
          onClick={() => setMode('lean')}
        >
          02 / LEAN 4
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'kernel'}
          className={mode === 'kernel' ? 'lab-tab is-active' : 'lab-tab'}
          onClick={() => setMode('kernel')}
        >
          03 / KERNEL
        </button>
      </div>

      {mode === 'extremal' ? (
        <>
          <div className="art-label">
            <span>n = 3 SELECTION · DRAG VERTICES</span>
            <span className="art-label-right">
              <button type="button" className="art-reset" onClick={applyPreset}>
                EXTREMAL
              </button>
              {hasDragged ? (
                <button
                  type="button"
                  className="art-reset"
                  onClick={resetSimplex}
                >
                  RESET
                </button>
              ) : null}
            </span>
          </div>

          <div className="simplex-frame">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              aria-labelledby="geometry-title"
              className={
                draggingIndex !== null
                  ? 'simplex-svg is-dragging'
                  : 'simplex-svg'
              }
            >
              <title id="geometry-title">
                Interactive 3-example mean regression selection geometry
              </title>
              <defs>
                <pattern
                  id="mineral-dots"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="0.8" fill="#89d3d1" opacity="0.22" />
                </pattern>
                <radialGradient id="mean-halo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#89d3d1" stopOpacity="0.34" />
                  <stop offset="45%" stopColor="#8b729e" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#091113" stopOpacity="0" />
                </radialGradient>
                <linearGradient
                  id="simplex-fill"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#4ea8ab" stopOpacity="0.22" />
                  <stop offset="55%" stopColor="#8b729e" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#c8b482" stopOpacity="0.18" />
                </linearGradient>
                <linearGradient
                  id="edge-stroke"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#89d3d1" stopOpacity="0.92" />
                  <stop offset="50%" stopColor="#c8b482" stopOpacity="0.82" />
                  <stop offset="100%" stopColor="#a78bbf" stopOpacity="0.88" />
                </linearGradient>
              </defs>

              <rect width={VIEW_W} height={VIEW_H} fill="url(#mineral-dots)" />

              <circle
                cx={metrics.mx}
                cy={metrics.my}
                r={Math.max(48, Math.min(150, metrics.avgDist * 1.12))}
                fill="url(#mean-halo)"
              />
              <g fill="none" stroke="#89d3d1">
                <circle
                  cx={metrics.mx}
                  cy={metrics.my}
                  r={Math.max(44, Math.min(142, metrics.avgDist * 1.02))}
                  strokeWidth="1"
                  opacity="0.24"
                />
                <circle
                  cx={metrics.mx}
                  cy={metrics.my}
                  r={Math.max(26, Math.min(96, metrics.avgDist * 0.64))}
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  opacity="0.22"
                />
              </g>

              <polygon
                points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
                fill="url(#simplex-fill)"
              />
              <polygon
                points={`${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`}
                fill="#8b729e"
                opacity="0.09"
              />

              {/* Selected 3-example subset rays to optimal 3-point mean */}
              <g
                stroke="#e3cfa0"
                strokeWidth="1.2"
                strokeDasharray="4 5"
                opacity="0.72"
              >
                {metrics.bestTriple.map((ptIdx, slot) => (
                  <line
                    key={`best-${slot}-${ptIdx}`}
                    x1={points[ptIdx].x}
                    y1={points[ptIdx].y}
                    x2={metrics.bestMx3}
                    y2={metrics.bestMy3}
                  />
                ))}
              </g>

              <g fill="none" stroke="url(#edge-stroke)" strokeWidth="1.35">
                <polygon
                  points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
                />
                <polyline
                  points={`${p1.x},${p1.y} ${p4.x},${p4.y} ${p2.x},${p2.y}`}
                  opacity="0.7"
                />
                <line x1={p4.x} y1={p4.y} x2={p3.x} y2={p3.y} opacity="0.7" />
              </g>

              {/* Deviation vector from full mean mu to best 3-point mean mu_3* */}
              <line
                x1={metrics.mx}
                y1={metrics.my}
                x2={metrics.bestMx3}
                y2={metrics.bestMy3}
                stroke="#6bd4a5"
                strokeWidth="2"
              />

              {/* Full mean mu */}
              <g>
                <circle
                  cx={metrics.mx}
                  cy={metrics.my}
                  r="10"
                  fill="none"
                  stroke="#89d3d1"
                  strokeWidth="1"
                  opacity="0.55"
                />
                <circle cx={metrics.mx} cy={metrics.my} r="4.2" fill="#89d3d1" />
                <text
                  x={metrics.mx + 12}
                  y={metrics.my - 8}
                  fill="#89d3d1"
                  fontFamily="var(--font-display)"
                  fontSize="19"
                  fontStyle="italic"
                >
                  μ
                </text>
              </g>

              {/* Best 3-example mean mu_3* */}
              <g>
                <circle
                  cx={metrics.bestMx3}
                  cy={metrics.bestMy3}
                  r="5"
                  fill="#e3cfa0"
                />
                <text
                  x={metrics.bestMx3 - 26}
                  y={metrics.bestMy3 + 20}
                  fill="#e3cfa0"
                  fontFamily="var(--font-mono)"
                  fontSize="10"
                >
                  μ₃*
                </text>
              </g>

              {points.map((pt, index) => {
                const active = draggingIndex === index;
                const chosen = metrics.bestTriple.includes(index);
                return (
                  <g
                    key={pt.id}
                    className="simplex-handle"
                    onPointerDown={(e) => handlePointerDown(index, e)}
                    onPointerMove={(e) => handlePointerMove(index, e)}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                  >
                    <circle cx={pt.x} cy={pt.y} r="20" fill="transparent" />
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={active ? 12 : chosen ? 10 : 8.5}
                      fill="none"
                      stroke={active || chosen ? '#e3cfa0' : '#89d3d1'}
                      strokeWidth="1"
                      opacity={active ? 0.95 : chosen ? 0.65 : 0.3}
                    />
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={active ? 6.5 : 5.5}
                      fill="#0b1619"
                      stroke={active || chosen ? '#e3cfa0' : '#89d3d1'}
                      strokeWidth="2"
                    />
                    <text
                      x={pt.x + pt.labelDx}
                      y={pt.y + pt.labelDy}
                      fill="#eef3f1"
                      fontFamily="var(--font-display)"
                      fontSize="18"
                      fontStyle="italic"
                      pointerEvents="none"
                    >
                      {pt.label}
                    </text>
                  </g>
                );
              })}

              <text
                x="220"
                y="366"
                textAnchor="middle"
                className="diagram-caption"
              >
                EXCESS {metrics.excessRatio.toFixed(3)} · SHARP BOUND F(2,3)−1 =
                0.200
              </text>
            </svg>
          </div>
        </>
      ) : null}

      {mode === 'lean' ? (
        <>
          <div className="art-label">
            <span>IDENTITY-TESTING-LEAN · 530 MODULES</span>
            <a
              className="art-reset"
              href="https://github.com/QinXi-ai/identity-testing-lean"
              target="_blank"
              rel="noreferrer"
            >
              REPO ↗
            </a>
          </div>

          <div className="simplex-frame">
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              className="simplex-svg"
              aria-label="Lean 4 proof dependency graph"
            >
              <rect width={VIEW_W} height={VIEW_H} fill="url(#mineral-dots)" />
              <defs>
                <pattern
                  id="mineral-dots"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="0.8" fill="#89d3d1" opacity="0.22" />
                </pattern>
              </defs>

              {LEAN_EDGES.map(([fromId, toId]) => {
                const a = LEAN_NODES.find((n) => n.id === fromId);
                const b = LEAN_NODES.find((n) => n.id === toId);
                if (!a || !b) return null;
                const lit = fromId === selectedLeanId || toId === selectedLeanId;
                return (
                  <line
                    key={`${fromId}-${toId}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={lit ? '#e3cfa0' : '#89d3d1'}
                    strokeWidth={lit ? 1.8 : 1}
                    strokeDasharray={lit ? undefined : '4 5'}
                    opacity={lit ? 0.9 : 0.34}
                  />
                );
              })}

              {LEAN_NODES.map((node) => {
                const active = node.id === selectedLeanId;
                return (
                  <g
                    key={node.id}
                    className="lab-node"
                    onClick={() => setSelectedLeanId(node.id)}
                  >
                    <rect
                      x={node.x - 56}
                      y={node.y - 22}
                      width="112"
                      height="44"
                      rx="8"
                      fill={
                        active
                          ? 'rgba(200, 180, 130, 0.2)'
                          : 'rgba(9, 18, 21, 0.85)'
                      }
                      stroke={active ? '#e3cfa0' : 'rgba(137, 211, 209, 0.38)'}
                      strokeWidth={active ? 1.5 : 1}
                    />
                    <text
                      x={node.x}
                      y={node.y - 2}
                      textAnchor="middle"
                      fill={active ? '#e3cfa0' : '#ecf3f1'}
                      fontFamily="var(--font-mono)"
                      fontSize="10"
                    >
                      {node.short}
                    </text>
                    <text
                      x={node.x}
                      y={node.y + 13}
                      textAnchor="middle"
                      fill="#738a88"
                      fontFamily="var(--font-mono)"
                      fontSize="8"
                    >
                      ✓ verified
                    </text>
                  </g>
                );
              })}

              <text
                x="220"
                y="366"
                textAnchor="middle"
                className="diagram-caption"
              >
                CLICK NODE TO INSPECT · ZERO SORRYS · CANONNE COLT 2024 Q1
              </text>
            </svg>

            <div className="lab-readout">
              <div className="lab-readout-top">
                <code>{activeLean.file}</code>
                <span>{activeLean.exportName}</span>
              </div>
              <p>{activeLean.detail}</p>
            </div>
          </div>
        </>
      ) : null}

      {mode === 'kernel' ? (
        <>
          <div className="art-label">
            <span>MOJO-DLLM · TILE DISPATCH</span>
            <a
              className="art-reset"
              href={activeKernel.href}
              target="_blank"
              rel="noreferrer"
            >
              {activeKernel.pr} ↗
            </a>
          </div>

          <div className="simplex-frame">
            <div className="kernel-switch">
              {KERNEL_PRESETS.map((preset, idx) => (
                <button
                  key={preset.id}
                  type="button"
                  className={
                    idx === kernelIndex
                      ? 'kernel-chip is-active'
                      : 'kernel-chip'
                  }
                  onClick={() => setKernelIndex(idx)}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <svg
              viewBox="0 0 440 245"
              className="simplex-svg kernel-svg"
              aria-label="Quantized GPU kernel tile schedule"
            >
              {activeKernel.activeMask.map((bit, idx) => {
                const col = idx % 8;
                const row = Math.floor(idx / 8);
                const x = 24 + col * 50;
                const y = 22 + row * 48;
                return (
                  <g key={`${activeKernel.id}-${idx}`}>
                    <rect
                      x={x}
                      y={y}
                      width="40"
                      height="36"
                      rx="6"
                      fill={
                        bit
                          ? 'rgba(137, 211, 209, 0.22)'
                          : 'rgba(12, 22, 27, 0.65)'
                      }
                      stroke={
                        bit
                          ? '#e3cfa0'
                          : 'rgba(137, 211, 209, 0.16)'
                      }
                      strokeWidth={bit ? 1.3 : 1}
                    />
                    <text
                      x={x + 20}
                      y={y + 22}
                      textAnchor="middle"
                      fill={bit ? '#e3cfa0' : '#738a88'}
                      fontFamily="var(--font-mono)"
                      fontSize="9"
                    >
                      T{String(idx).padStart(2, '0')}
                    </text>
                  </g>
                );
              })}
              <text
                x="220"
                y="232"
                textAnchor="middle"
                className="diagram-caption"
              >
                {activeKernel.metric}
              </text>
            </svg>

            <div className="lab-readout">
              <div className="lab-readout-top">
                <code>{activeKernel.label}</code>
                <span>MERGED UPSTREAM</span>
              </div>
              <p>{activeKernel.summary}</p>
            </div>
          </div>
        </>
      ) : null}

      <div className="art-note">
        <span>Nullius in verba.</span>
        <p>
          Ideas worth proving.
          <br />
          Systems worth building.
        </p>
      </div>
    </div>
  );
}
