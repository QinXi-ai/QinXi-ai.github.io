'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { FieldMode, mountFluidField } from './fluidField';

const FIELD_MODES: readonly { id: FieldMode; label: string }[] = [
  { id: 'mineral', label: 'MINERAL' },
  { id: 'topo', label: 'TOPO' },
  { id: 'calm', label: 'CALM' },
];

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', onStoreChange);
  return () => mq.removeEventListener('change', onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function FluidForgeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [manualPaused, setManualPaused] = useState<boolean | null>(null);
  const [mode, setMode] = useState<FieldMode>('mineral');
  const paused = manualPaused ?? prefersReducedMotion;
  const pausedRef = useRef(paused);
  const modeRef = useRef(mode);
  const fieldRef = useRef<ReturnType<typeof mountFluidField>>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
    fieldRef.current?.setPaused(paused);
  }, [paused]);

  useEffect(() => {
    modeRef.current = mode;
    fieldRef.current?.setMode(mode);
  }, [mode]);

  useEffect(() => {
    const onCommand = (e: Event) => {
      const detail = (
        e as CustomEvent<
          | { type: 'pulse' }
          | { type: 'mode'; mode: FieldMode }
          | { type: 'toggle-pause' }
        >
      ).detail;
      if (!detail) return;
      if (detail.type === 'pulse') {
        fieldRef.current?.ripple();
      } else if (detail.type === 'mode') {
        setMode(detail.mode);
      } else if (detail.type === 'toggle-pause') {
        setManualPaused((prev) => !(prev ?? prefersReducedMotion));
      }
    };
    window.addEventListener('forge:command', onCommand);
    return () => window.removeEventListener('forge:command', onCommand);
  }, [prefersReducedMotion]);

  useEffect(() => {
    let disposed = false;
    let cancelStart: (() => void) | undefined;
    async function start() {
      const renderer = await import('./fluidField').catch(() => null);
      if (!renderer || disposed || !canvasRef.current) return;
      fieldRef.current = renderer.mountFluidField(
        canvasRef.current,
        pausedRef.current,
        modeRef.current,
      );
      setReady(Boolean(fieldRef.current));
    }
    function onLoad() {
      if (typeof window.requestIdleCallback === 'function') {
        const idle = window.requestIdleCallback(() => void start(), {
          timeout: 800,
        });
        cancelStart = () => window.cancelIdleCallback(idle);
      } else {
        const timer = window.setTimeout(() => void start(), 0);
        cancelStart = () => window.clearTimeout(timer);
      }
    }
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });
    return () => {
      disposed = true;
      window.removeEventListener('load', onLoad);
      cancelStart?.();
      fieldRef.current?.dispose();
      fieldRef.current = null;
    };
  }, []);

  const cycleMode = () => {
    const idx = FIELD_MODES.findIndex((m) => m.id === mode);
    const next = FIELD_MODES[(idx + 1) % FIELD_MODES.length];
    setMode(next.id);
    fieldRef.current?.ripple(0.5, 0.5);
  };

  const activeModeLabel =
    FIELD_MODES.find((m) => m.id === mode)?.label ?? 'MINERAL';

  return (
    <>
      <div className="forge-backdrop" aria-hidden="true">
        <canvas
          ref={canvasRef}
          className="forge-canvas"
          style={{ visibility: ready ? 'visible' : 'hidden' }}
        />
        <div className="forge-facets" />
      </div>
      {ready ? (
        <aside className="field-hud" aria-label="Fluid background controls">
          <button
            type="button"
            className="field-hud-btn"
            onClick={() => setManualPaused(!paused)}
            aria-pressed={!paused}
          >
            <span className={paused ? 'hud-dot hud-dot-paused' : 'hud-dot'} />
            <span>{paused ? 'PAUSED' : 'LIVE'}</span>
          </button>
          <span className="field-hud-sep" aria-hidden="true" />
          <button
            type="button"
            className="field-hud-btn field-hud-mode"
            onClick={cycleMode}
            title="Cycle shader mode: Mineral / Topographic / Calm"
          >
            <span>MODE · {activeModeLabel}</span>
          </button>
          <button
            type="button"
            className="field-hud-btn field-hud-pulse"
            onClick={() => fieldRef.current?.ripple()}
            title="Send a radial ripple through the mineral field"
          >
            PULSE ✦
          </button>
        </aside>
      ) : null}
    </>
  );
}
