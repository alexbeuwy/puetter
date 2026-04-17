"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  /** 0..1 speed multiplier. Default 0.21 (Framer default). */
  speed?: number;
  /** Scale of the gradient pattern. Default 0.15. */
  scale?: number;
  /** 0..1 amplitude of the flow. Default 0.6. */
  amplitude?: number;
  /** Frequency of the noise bands. Default 0.51. */
  frequency?: number;
  /** Band definition / contrast. Default 6. */
  definition?: number;
  /** Number of color bands. Default 5. */
  bands?: number;
  /** Grain amount 0..1. Default 0.05. */
  noise?: number;
  /** Colors. Default Framer hologram preset. */
  colors?: [string, string, string, string, string];
  /** Seed offset. Default 0. */
  seed?: number;
};

const DEFAULT_COLORS: [string, string, string, string, string] = [
  "#dce4f8",
  "#f8dce4",
  "#e4f8dc",
  "#f0ece0",
  "#dce4f8",
];

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const num = parseInt(h, 16);
  return [(num >> 16) / 255, ((num >> 8) & 0xff) / 255, (num & 0xff) / 255];
}

const VERT = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_scale;
uniform float u_amp;
uniform float u_freq;
uniform float u_def;
uniform float u_bands;
uniform float u_noise;
uniform float u_seed;
uniform vec3 u_c0;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform vec3 u_c4;

// 2D noise
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise2(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise2(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

vec3 pickColor(float t) {
  t = mod(t, 1.0);
  float seg = t * 4.0;
  if (seg < 1.0) return mix(u_c0, u_c1, seg);
  if (seg < 2.0) return mix(u_c1, u_c2, seg - 1.0);
  if (seg < 3.0) return mix(u_c2, u_c3, seg - 2.0);
  return mix(u_c3, u_c4, seg - 3.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 aspect = vec2(u_res.x / u_res.y, 1.0);
  vec2 p = (uv - 0.5) * aspect;

  float t = (u_time + u_seed) * 0.3;

  // Distort sample position with fbm for the liquid feel
  vec2 q = p / max(u_scale, 0.01) * 1.5;
  float n1 = fbm(q + vec2(t * 0.7, 0.0));
  float n2 = fbm(q + vec2(0.0, t * 0.5) + 5.2);
  vec2 flow = vec2(n1, n2) * u_amp;
  q += flow * u_freq * 2.0;

  // Band value
  float band = fbm(q + t * 0.2);
  band = pow(band, max(u_def, 0.01) * 0.25);
  band *= u_bands;

  vec3 col = pickColor(band);

  // Film grain
  float grain = hash(gl_FragCoord.xy + t);
  col += (grain - 0.5) * u_noise;

  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * Liquid Gradient shader — hologram chrome look, same settings as
 * Framer's preset. Fills its parent. Put it inside a mask or with
 * overflow-hidden + border-radius to bleed nicely into the layout.
 */
export default function LiquidGradient({
  className,
  speed = 0.21,
  scale = 0.15,
  amplitude = 0.6,
  frequency = 0.51,
  definition = 6,
  bands = 5,
  noise = 0.05,
  colors = DEFAULT_COLORS,
  seed = 0,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl =
      (canvas.getContext("webgl") as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const posLoc = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const u = {
      res: gl.getUniformLocation(prog, "u_res"),
      time: gl.getUniformLocation(prog, "u_time"),
      scale: gl.getUniformLocation(prog, "u_scale"),
      amp: gl.getUniformLocation(prog, "u_amp"),
      freq: gl.getUniformLocation(prog, "u_freq"),
      def: gl.getUniformLocation(prog, "u_def"),
      bands: gl.getUniformLocation(prog, "u_bands"),
      noise: gl.getUniformLocation(prog, "u_noise"),
      seed: gl.getUniformLocation(prog, "u_seed"),
      c0: gl.getUniformLocation(prog, "u_c0"),
      c1: gl.getUniformLocation(prog, "u_c1"),
      c2: gl.getUniformLocation(prog, "u_c2"),
      c3: gl.getUniformLocation(prog, "u_c3"),
      c4: gl.getUniformLocation(prog, "u_c4"),
    };

    const [c0, c1, c2, c3, c4] = colors.map(hexToRgb);
    gl.uniform3f(u.c0, c0[0], c0[1], c0[2]);
    gl.uniform3f(u.c1, c1[0], c1[1], c1[2]);
    gl.uniform3f(u.c2, c2[0], c2[1], c2[2]);
    gl.uniform3f(u.c3, c3[0], c3[1], c3[2]);
    gl.uniform3f(u.c4, c4[0], c4[1], c4[2]);
    gl.uniform1f(u.scale, scale);
    gl.uniform1f(u.amp, amplitude);
    gl.uniform1f(u.freq, frequency);
    gl.uniform1f(u.def, definition);
    gl.uniform1f(u.bands, bands);
    gl.uniform1f(u.noise, noise);
    gl.uniform1f(u.seed, seed);

    let raf = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(u.res, w, h);
    };

    const render = () => {
      resize();
      const t = ((performance.now() - start) / 1000) * speed;
      gl.uniform1f(u.time, t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    render();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [speed, scale, amplitude, frequency, definition, bands, noise, colors, seed]);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
