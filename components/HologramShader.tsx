"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  speed?: number;
  scale?: number;
  amplitude?: number;
  frequency?: number;
  definition?: number;
  bands?: number;
  noiseAmount?: number;
  seed?: number;
};

const VERT = `attribute vec2 a_pos;void main(){gl_Position=vec4(a_pos,0,1);}`;

const FRAG = `
precision highp float;
uniform float u_time,u_seed,u_scale,u_amp,u_freq,u_def,u_bands,u_noise;
uniform vec2 u_res;
uniform vec3 u_c[5];

// Simple 2D hash
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}

// Value noise
float vnoise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}

// FBM with octaves controlled by definition
float fbm(vec2 p,float def){
  float v=0.,a=.5;
  for(int i=0;i<8;i++){
    if(float(i)>=def)break;
    v+=a*vnoise(p);
    p*=2.;a*=.5;
  }
  return v;
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  float t=u_time*u_speed_mult+u_seed;

  // Scale the UV
  vec2 p=uv*10.*u_scale;

  // Flow distortion via FBM
  float n1=fbm(p+vec2(t*.7,.0),u_def);
  float n2=fbm(p+vec2(.0,t*.5)+5.2,u_def);
  p+=vec2(n1,n2)*u_amp*u_freq*2.;

  // Band value
  float band=fbm(p+t*.15,u_def);
  band=band*u_bands;
  float idx=mod(band+t*.1,4.);

  // Color interpolation across 5 colors (looping)
  vec3 col;
  if(idx<1.)col=mix(u_c[0],u_c[1],idx);
  else if(idx<2.)col=mix(u_c[1],u_c[2],idx-1.);
  else if(idx<3.)col=mix(u_c[2],u_c[3],idx-2.);
  else col=mix(u_c[3],u_c[4],idx-3.);

  // Add holographic sheen — lighten toward white for that foil look
  float sheen=smoothstep(.3,.7,fbm(p*2.+t*.3,3.));
  col=mix(col,vec3(1.),sheen*.55);

  // Film grain
  float grain=hash(gl_FragCoord.xy+fract(t)*100.);
  col+=(grain-.5)*u_noise;

  gl_FragColor=vec4(col,1.);
}
`;

// We inject u_speed_mult as a define so the shader compiles cleanly
const buildFrag = (speed: number) =>
  FRAG.replace("u_speed_mult", String(speed.toFixed(4)));

function hexToRgb(h: string): [number, number, number] {
  const n = parseInt(h.replace("#", ""), 16);
  return [(n >> 16) / 255, ((n >> 8) & 0xff) / 255, (n & 0xff) / 255];
}

/**
 * Holographic Liquid Gradient — the exact Framer preset settings:
 *   Colors #0051FF · #4DFF00 · #FFE500 · #FF6F00 · #0051FF
 *   Speed 0.21, Scale 0.15, Amplitude 0.6, Frequency 0.51,
 *   Definition 6, Bands 5, Noise (Grain) 0.05, Seed 0
 *
 * Plus a holographic "sheen" pass that lightens toward white,
 * mimicking the chrome-foil refraction from the reference.
 */
export default function HologramShader({
  className,
  style,
  colors = ["#0051FF", "#4DFF00", "#FFE500", "#FF6F00", "#0051FF"],
  speed = 0.21,
  scale = 0.15,
  amplitude = 0.6,
  frequency = 0.51,
  definition = 6,
  bands = 5,
  noiseAmount = 0.05,
  seed = 0,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(s));
      }
      return s;
    };

    const fragSrc = buildFrag(speed);
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(prog));
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const posLoc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uSeed = gl.getUniformLocation(prog, "u_seed");
    const uScale = gl.getUniformLocation(prog, "u_scale");
    const uAmp = gl.getUniformLocation(prog, "u_amp");
    const uFreq = gl.getUniformLocation(prog, "u_freq");
    const uDef = gl.getUniformLocation(prog, "u_def");
    const uBands = gl.getUniformLocation(prog, "u_bands");
    const uNoise = gl.getUniformLocation(prog, "u_noise");

    gl.uniform1f(uSeed, seed);
    gl.uniform1f(uScale, scale);
    gl.uniform1f(uAmp, amplitude);
    gl.uniform1f(uFreq, frequency);
    gl.uniform1f(uDef, definition);
    gl.uniform1f(uBands, bands);
    gl.uniform1f(uNoise, noiseAmount);

    const rgbs = colors.map(hexToRgb);
    for (let i = 0; i < 5; i++) {
      const loc = gl.getUniformLocation(prog, `u_c[${i}]`);
      const c = rgbs[i] || rgbs[0];
      gl.uniform3f(loc, c[0], c[1], c[2]);
    }

    let raf = 0;
    const t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      const r = canvas.getBoundingClientRect();
      const w = Math.round(r.width * dpr);
      const h = Math.round(r.height * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };

    const render = () => {
      resize();
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [speed, scale, amplitude, frequency, definition, bands, noiseAmount, seed, colors]);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
    />
  );
}
