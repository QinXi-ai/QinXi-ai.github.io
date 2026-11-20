'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { mountFluidField } from './fluidField';

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
  const paused = manualPaused ?? prefersReducedMotion;
  const pausedRef = useRef(paused);
  const fieldRef = useRef<ReturnType<typeof mountFluidField>>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
    fieldRef.current?.setPaused(paused);
  }, [paused]);

  useEffect(() => {
    let disposed = false;
    let cancelStart: (() => void) | undefined;
    async function start() {
      const renderer = await import('./fluidField').catch(() => null);
      if (!renderer || disposed || !canvasRef.current) return;
      fieldRef.current = renderer.mountFluidField(
        canvasRef.current,
        pausedRef.current,
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
            <span>{paused ? 'FIELD PAUSED' : 'FLUID FIELD · LIVE'}</span>
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
