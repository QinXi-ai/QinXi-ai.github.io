'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Real-time mineral fluid-marbling & radial singularity shader inspired by Fluid Forge.
const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_scroll;
uniform float u_pulse;
uniform vec2 u_pulseOrigin;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

const mat2 ROT = mat2(0.80, 0.60, -0.60, 0.80);

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    v += amp * noise(p);
    p = ROT * p * 2.04 + vec2(1.7, 9.2);
    amp *= 0.5;
  }
  return v;
}

// Radial singularity deformation matching the wallpaper's twin-eye + satellite pinch geometry.
vec2 poleWarp(vec2 p, vec2 center, float strength, float twist, float rays) {
  vec2 d = p - center;
  float r = length(d) + 0.001;
  float a = atan(d.y, d.x);
  float falloff = exp(-r * 2.15);
  float feather = sin(a * rays + r * 4.5 * twist) * 0.5 + 0.5;
  vec2 radial = d / r;
  vec2 tangent = vec2(-radial.y, radial.x);
  return (radial * (feather - 0.42) * strength + tangent * twist * 0.24) * falloff;
}

float facetLine(vec2 p, vec2 n, float offset, float width) {
  float dist = abs(dot(p, normalize(n)) - offset);
  return smoothstep(width, 0.0, dist);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  float t = u_time * 0.14;
  float scrollDrift = u_scroll * 0.28;
  vec2 mouseP = (u_mouse - 0.5) * vec2(aspect, 1.0);

  // Subtle architectural crystal refraction panes (diagonal & vertical glass cuts)
  float f1 = step(0.0, dot(p, normalize(vec2(0.76, -0.65))) - 0.18);
  float f2 = step(0.0, dot(p, normalize(vec2(-0.62, -0.78))) + 0.24);
  float f3 = step(0.0, p.x - (aspect * 0.37));
  float f4 = step(0.0, dot(p, normalize(vec2(0.84, 0.54))) + 0.36);

  vec2 refractShift =
    (f1 - 0.5) * vec2(0.032, -0.024) +
    (f2 - 0.5) * vec2(-0.026, 0.022) +
    (f3 - 0.5) * vec2(0.045, 0.015) +
    (f4 - 0.5) * vec2(-0.018, -0.025);

  vec2 sp = p + refractShift + vec2(0.0, -scrollDrift);

  // Three mineral singularities (twin center poles + lower satellite pole)
  vec2 poleA = vec2(0.02 + sin(t * 0.65) * 0.03, 0.14 + cos(t * 0.52) * 0.025) + mouseP * 0.05;
  vec2 poleB = vec2(-0.01 + cos(t * 0.58) * 0.025, -0.04 + sin(t * 0.48) * 0.025) + mouseP * 0.08;
  vec2 poleC = vec2(0.11 + sin(t * 0.44 + 1.4) * 0.035, -0.34 + cos(t * 0.50) * 0.02) + mouseP * 0.04;

  // Interactive click shockwave ripple
  vec2 pulseP = (u_pulseOrigin - 0.5) * vec2(aspect, 1.0);
  float pulseDist = length(p - pulseP);
  float pulseWave = sin((pulseDist - (1.0 - u_pulse) * 1.4) * 18.0) * exp(-pulseDist * 2.8) * u_pulse;

  // Combine starburst vector field warps
  vec2 w = sp;
  w += poleWarp(sp, poleA, 0.26, 1.15, 11.0);
  w += poleWarp(sp, poleB, 0.34, -1.35, 13.0);
  w += poleWarp(sp, poleC, 0.22, 0.95, 9.0);
  w += poleWarp(sp, mouseP, 0.14, 0.65, 7.0);
  w += normalize(sp - pulseP + 0.001) * pulseWave * 0.06;

  // Radial polar detail around twin center for crisp starburst striations
  vec2 dB = sp - poleB;
  float rB = length(dB);
  float aB = atan(dB.y, dB.x);
  float raysB = fbm(vec2(aB * 3.6 + sin(rB * 3.2 - t), log(rB + 0.14) * 2.6 - t * 0.55));

  vec2 dA = sp - poleA;
  float rA = length(dA);
  float aA = atan(dA.y, dA.x);
  float raysA = fbm(vec2(aA * 3.2 - cos(rA * 2.8 + t * 0.7), log(rA + 0.16) * 2.4 + t * 0.45));

  float radialDetail = mix(raysB, raysA, smoothstep(-0.08, 0.16, sp.y - poleB.y));
  float poleProximity = exp(-rB * 2.4) + exp(-rA * 2.6) * 0.85 + exp(-length(sp - poleC) * 3.0) * 0.65;

  // Multi-stage domain-warped fluid marbling
  vec2 q = vec2(
    fbm(w * 2.25 + vec2(0.0, t * 0.35)),
    fbm(w * 2.25 + vec2(5.2, 1.3 - t * 0.28))
  );

  vec2 r = vec2(
    fbm(w * 2.85 + 2.6 * q + vec2(1.7 + t * 0.22, 9.2)),
    fbm(w * 2.85 + 2.6 * q + vec2(8.3, 2.8 - t * 0.19))
  );

  float flow = fbm(w * 2.6 + 2.4 * r + radialDetail * 0.55);
  float fineVeins = fbm(w * 8.5 + 3.4 * r);

  // Sampled wallpaper palette: obsidian-malachite, mineral turquoise, amethyst-slate, antique gold
  vec3 cAbyss = vec3(0.028, 0.056, 0.064);
  vec3 cMalachite = vec3(0.075, 0.205, 0.212);
  vec3 cTeal = vec3(0.185, 0.455, 0.470);
  vec3 cGlacial = vec3(0.450, 0.735, 0.725);
  vec3 cAmethystDark = vec3(0.165, 0.135, 0.235);
  vec3 cAmethyst = vec3(0.395, 0.315, 0.485);
  vec3 cGilt = vec3(0.755, 0.665, 0.465);

  // Base fluid marbling blend
  vec3 col = mix(cAbyss, cMalachite, smoothstep(0.18, 0.58, flow));
  col = mix(col, cTeal, smoothstep(0.44, 0.78, flow + radialDetail * 0.22));

  // Amethyst / plum mineral eddies driven by warp vector q and r
  float plumMask = smoothstep(0.36, 0.74, length(q - 0.45) * 1.45) * smoothstep(0.22, 0.75, r.y);
  col = mix(col, cAmethystDark, plumMask * 0.68);
  col = mix(col, cAmethyst, smoothstep(0.56, 0.86, r.x * r.y * 1.9 + plumMask * 0.35) * 0.58);

  // Luminous mineral-teal crests & radial starburst bloom around poles
  float crest = smoothstep(0.58, 0.88, flow * 0.75 + radialDetail * 0.42);
  col = mix(col, cGlacial, crest * (0.28 + poleProximity * 0.28));

  // Fine oxidized gold filigree veins tracing sharp iso-contours of the marble
  float contourA = 1.0 - smoothstep(0.0, 0.024, abs(flow - 0.56));
  float contourB = 1.0 - smoothstep(0.0, 0.018, abs(fineVeins - 0.63));
  float giltMask = (contourA * 0.65 + contourB * 0.55) * smoothstep(0.28, 0.82, r.x + poleProximity * 0.35);
  col = mix(col, cGilt, clamp(giltMask * 0.52, 0.0, 0.55));

  // Singularity core glint
  float coreGlint = exp(-rB * 18.0) * 0.36 + exp(-rA * 20.0) * 0.26 + exp(-length(sp - poleC) * 22.0) * 0.22;
  col += mix(cGlacial, cGilt, 0.45) * coreGlint;

  // Architectural glass facet shading & crisp hairline seams
  float facetTint = (f1 * 0.055 - f2 * 0.045 + f3 * 0.075 - f4 * 0.03);
  col *= (1.0 - facetTint);

  float seam = 0.0;
  seam += facetLine(p, vec2(0.76, -0.65), 0.18, 0.0022);
  seam += facetLine(p, vec2(-0.62, -0.78), -0.24, 0.0020);
  seam += facetLine(p, vec2(1.0, 0.0), aspect * 0.37, 0.0022);
  seam += facetLine(p, vec2(0.84, 0.54), -0.36, 0.0018);
  seam += facetLine(p, vec2(0.76, -0.65), -0.38, 0.0016);
  col += mix(cGlacial, cGilt, 0.35) * seam * 0.22;

  // Pulse luminescence
  col += cGlacial * abs(pulseWave) * 0.22;

  // Lithographic mineral micro-grain
  float grain = (hash(gl_FragCoord.xy + fract(u_time) * 17.0) - 0.5) * 0.038;
  col += grain;

  // Depth vignette & readability darkening as user scrolls into content sections
  float vig = smoothstep(1.38, 0.18, length(p * vec2(0.78, 0.95)));
  float scrollCalm = mix(0.84, 0.50, clamp(u_scroll * 1.4, 0.0, 1.0));
  col = mix(cAbyss * 0.65, col, vig) * scrollCalm;

  // Subtle top-left reading clearance so hero display serif stays effortlessly crisp
  float heroReadMask = smoothstep(0.62, 0.05, length(uv - vec2(0.22, 0.56)));
  col = mix(col, col * 0.68, heroReadMask * (1.0 - clamp(u_scroll * 2.0, 0.0, 1.0)));

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

interface FluidGlPipeline {
  gl: WebGLRenderingContext;
  uResolution: WebGLUniformLocation | null;
  uTime: WebGLUniformLocation | null;
  uMouse: WebGLUniformLocation | null;
  uScroll: WebGLUniformLocation | null;
  uPulse: WebGLUniformLocation | null;
  uPulseOrigin: WebGLUniformLocation | null;
  dispose: () => void;
}

function createFluidGlPipeline(
  canvas: HTMLCanvasElement,
): FluidGlPipeline | null {
  const gl =
    canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    }) ??
    (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

  if (!gl) return null;

  const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vs || !fs) {
    if (vs) gl.deleteShader(vs);
    if (fs) gl.deleteShader(fs);
    return null;
  }

  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return null;
  }

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return null;
  }

  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );

  const positionLoc = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

  return {
    gl,
    uResolution: gl.getUniformLocation(program, 'u_resolution'),
    uTime: gl.getUniformLocation(program, 'u_time'),
    uMouse: gl.getUniformLocation(program, 'u_mouse'),
    uScroll: gl.getUniformLocation(program, 'u_scroll'),
    uPulse: gl.getUniformLocation(program, 'u_pulse'),
    uPulseOrigin: gl.getUniformLocation(program, 'u_pulseOrigin'),
    dispose: () => {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    },
  };
}

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
  const pulseRef = useRef({ value: 0, x: 0.5, y: 0.5 });
  const [webglReady, setWebglReady] = useState(true);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pipeline = createFluidGlPipeline(canvas);
    if (!pipeline) {
      queueMicrotask(() => setWebglReady(false));
      return;
    }

    const { gl, uResolution, uTime, uMouse, uScroll, uPulse, uPulseOrigin } =
      pipeline;

    const targetMouse = { x: 0.56, y: 0.52 };
    const currentMouse = { x: 0.56, y: 0.52 };
    let targetScroll = 0;
    let currentScroll = 0;
    let elapsed = 8.4; // Start at a rich composition frame
    let lastTs = performance.now();
    let rafId = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.45);
      const width = Math.max(1, Math.floor(window.innerWidth * dpr));
      const height = Math.max(1, Math.floor(window.innerHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      targetMouse.x = e.clientX / Math.max(window.innerWidth, 1);
      targetMouse.y = 1.0 - e.clientY / Math.max(window.innerHeight, 1);
    };

    const onScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      targetScroll = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, summary, details, svg')) return;
      pulseRef.current = {
        value: 1,
        x: e.clientX / Math.max(window.innerWidth, 1),
        y: 1.0 - e.clientY / Math.max(window.innerHeight, 1),
      };
    };

    resize();
    onScroll();

    const draw = (now: number) => {
      const dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;

      if (!pausedRef.current && !document.hidden) {
        elapsed += dt;
      }

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.06;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.06;
      currentScroll += (targetScroll - currentScroll) * 0.08;

      if (pulseRef.current.value > 0.001) {
        pulseRef.current.value = Math.max(
          0,
          pulseRef.current.value - dt * 0.85,
        );
      }

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uMouse, currentMouse.x, currentMouse.y);
      gl.uniform1f(uScroll, currentScroll);
      gl.uniform1f(uPulse, pulseRef.current.value);
      gl.uniform2f(uPulseOrigin, pulseRef.current.x, pulseRef.current.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafId = window.requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    rafId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll);
      pipeline.dispose();
    };
  }, []);

  const toggleMotion = () => {
    setManualPaused(!paused);
  };

  const triggerPulse = () => {
    pulseRef.current = { value: 1, x: 0.52, y: 0.54 };
  };

  return (
    <>
      <div className="forge-backdrop" aria-hidden="true">
        {webglReady ? (
          <canvas ref={canvasRef} className="forge-canvas" />
        ) : (
          <div className="forge-fallback" />
        )}
        <div className="forge-facets" />
      </div>
      {webglReady ? (
        <aside className="field-hud" aria-label="Fluid background controls">
          <button
            type="button"
            className="field-hud-btn"
            onClick={toggleMotion}
            aria-pressed={!paused}
          >
            <span className={paused ? 'hud-dot hud-dot-paused' : 'hud-dot'} />
            <span>{paused ? 'FIELD PAUSED' : 'FLUID FIELD · LIVE'}</span>
          </button>
          <button
            type="button"
            className="field-hud-btn field-hud-pulse"
            onClick={triggerPulse}
            title="Send a radial ripple through the mineral field"
          >
            PULSE ✦
          </button>
        </aside>
      ) : null}
    </>
  );
}
