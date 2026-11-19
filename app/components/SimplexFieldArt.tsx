'use client';

import { useMemo, useRef, useState } from 'react';

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

const VIEW_W = 440;
const VIEW_H = 420;
const PAD = 34;

export function SimplexFieldArt() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [points, setPoints] = useState<Point[]>(() =>
    INITIAL_POINTS.map((pt) => ({ ...pt })),
  );
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [hasDragged, setHasDragged] = useState(false);

  const metrics = useMemo(() => {
    const mx = points.reduce((acc, pt) => acc + pt.x, 0) / points.length;
    const my = points.reduce((acc, pt) => acc + pt.y, 0) / points.length;
    const avgDist =
      points.reduce((acc, pt) => acc + Math.hypot(pt.x - mx, pt.y - my), 0) /
      points.length;
    const variance =
      points.reduce(
        (acc, pt) => acc + ((pt.x - mx) ** 2 + (pt.y - my) ** 2) / 10000,
        0,
      ) / points.length;
    return { mx, my, avgDist, variance };
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
    const clampedY = Math.max(PAD, Math.min(VIEW_H - 46, ny));

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

  const resetSimplex = () => {
    setPoints(INITIAL_POINTS.map((pt) => ({ ...pt })));
    setHasDragged(false);
  };

  const [p1, p2, p3, p4] = points;

  return (
    <div className="hero-art mineral-card">
      <div className="art-label">
        <span>FIELD NOTES / 2026</span>
        <span className="art-label-right">
          <span>FIG. 01 · DRAG VERTICES</span>
          {hasDragged ? (
            <button type="button" className="art-reset" onClick={resetSimplex}>
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
            draggingIndex !== null ? 'simplex-svg is-dragging' : 'simplex-svg'
          }
        >
          <title id="geometry-title">
            Interactive geometric study of four points, a simplex, and their
            live mean
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
              <stop offset="0%" stopColor="#4ea8ab" stopOpacity="0.24" />
              <stop offset="55%" stopColor="#8b729e" stopOpacity="0.14" />
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

          {/* Architectural crystal fracture lines inside figure */}
          <g stroke="#89d3d1" strokeWidth="0.7" opacity="0.16">
            <line x1="0" y1="335" x2="310" y2="0" />
            <line x1="140" y1="420" x2="440" y2="105" />
            <line
              x1="372"
              y1="0"
              x2="372"
              y2="420"
              stroke="#c8b482"
              opacity="0.22"
            />
          </g>

          {/* Mean aura & dynamic dispersion rings */}
          <circle
            cx={metrics.mx}
            cy={metrics.my}
            r={Math.max(54, Math.min(165, metrics.avgDist * 1.16))}
            fill="url(#mean-halo)"
          />
          <g fill="none" stroke="#89d3d1">
            <circle
              cx={metrics.mx}
              cy={metrics.my}
              r={Math.max(48, Math.min(156, metrics.avgDist * 1.06))}
              strokeWidth="1"
              opacity="0.26"
            />
            <circle
              cx={metrics.mx}
              cy={metrics.my}
              r={Math.max(30, Math.min(108, metrics.avgDist * 0.68))}
              strokeWidth="1"
              strokeDasharray="3 5"
              opacity="0.24"
            />
            <line
              x1="34"
              y1={metrics.my}
              x2="406"
              y2={metrics.my}
              strokeWidth="0.8"
              opacity="0.18"
            />
            <line
              x1={metrics.mx}
              y1="24"
              x2={metrics.mx}
              y2="378"
              strokeWidth="0.8"
              opacity="0.18"
            />
          </g>

          {/* Simplex faces */}
          <polygon
            points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
            fill="url(#simplex-fill)"
          />
          <polygon
            points={`${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`}
            fill="#8b729e"
            opacity="0.09"
          />

          {/* Barycentric geodesics to centroid μ */}
          <g
            stroke="#c8b482"
            strokeWidth="1.1"
            strokeDasharray="4 6"
            opacity="0.58"
          >
            {points.map((pt) => (
              <line
                key={`ray-${pt.id}`}
                x1={pt.x}
                y1={pt.y}
                x2={metrics.mx}
                y2={metrics.my}
              />
            ))}
          </g>

          {/* Simplex structural edges */}
          <g fill="none" stroke="url(#edge-stroke)" strokeWidth="1.45">
            <polygon
              points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
            />
            <polyline
              points={`${p1.x},${p1.y} ${p4.x},${p4.y} ${p2.x},${p2.y}`}
              opacity="0.72"
            />
            <line x1={p4.x} y1={p4.y} x2={p3.x} y2={p3.y} opacity="0.72" />
          </g>

          {/* Live centroid μ */}
          <g className="simplex-centroid">
            <circle
              cx={metrics.mx}
              cy={metrics.my}
              r="11"
              fill="none"
              stroke="#c8b482"
              strokeWidth="1"
              opacity="0.55"
            />
            <circle cx={metrics.mx} cy={metrics.my} r="4.8" fill="#c8b482" />
            <text
              x={metrics.mx + 14}
              y={metrics.my - 8}
              fill="#e3cfa0"
              fontFamily="var(--font-display)"
              fontSize="20"
              fontStyle="italic"
            >
              μ
            </text>
          </g>

          {/* Draggable vertices */}
          {points.map((pt, index) => {
            const active = draggingIndex === index;
            return (
              <g
                key={pt.id}
                className="simplex-handle"
                onPointerDown={(e) => handlePointerDown(index, e)}
                onPointerMove={(e) => handlePointerMove(index, e)}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                {/* Generous invisible hit area */}
                <circle cx={pt.x} cy={pt.y} r="20" fill="transparent" />
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={active ? 12 : 9.5}
                  fill="none"
                  stroke={active ? '#c8b482' : '#89d3d1'}
                  strokeWidth="1"
                  opacity={active ? 0.9 : 0.35}
                />
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={active ? 6.5 : 5.5}
                  fill="#0b1619"
                  stroke={active ? '#e3cfa0' : '#89d3d1'}
                  strokeWidth="2"
                />
                <text
                  x={pt.x + pt.labelDx}
                  y={pt.y + pt.labelDy}
                  fill="#eef3f1"
                  fontFamily="var(--font-display)"
                  fontSize="19"
                  fontStyle="italic"
                  pointerEvents="none"
                >
                  {pt.label}
                </text>
              </g>
            );
          })}

          <text x="220" y="404" textAnchor="middle" className="diagram-caption">
            POINTS → STRUCTURE → PROOF · VAR {metrics.variance.toFixed(2)}
          </text>
        </svg>
      </div>

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
