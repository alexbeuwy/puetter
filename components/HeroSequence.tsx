"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import VoiceNote from "./VoiceNote";

/* ─────────────────────────  CONSTANTS  ───────────────────────── */

const FRAMES_PER_CHAPTER = 73;
const CHAPTER_COUNT = 4;
const TOTAL_FRAMES = FRAMES_PER_CHAPTER * CHAPTER_COUNT; // 292

type Fact = { Icon: () => JSX.Element; label: string };
type Chapter = {
  eyebrow: string;
  headline: string;
  accent?: string;
  sub: string;
  facts: Fact[];
};

const CHAPTERS: Chapter[] = [
  {
    eyebrow: "Bretter",
    headline: "Du hast genug",
    accent: "Bretter.",
    sub: "Skills, Erfahrung, Netzwerk — alles da. Was fehlt, ist die Reihenfolge.",
    facts: [
      { Icon: BoardsIcon, label: "Material vorhanden" },
      { Icon: FragmentIcon, label: "Kein roter Faden" },
      { Icon: WaveIcon, label: "Kein System" },
    ],
  },
  {
    eyebrow: "Floß",
    headline: "Schwimmen ist nicht",
    accent: "steuern.",
    sub: "Du networkst. Du postest. Du hoffst. Bewegung ist noch keine Richtung.",
    facts: [
      { Icon: SwimmerIcon, label: "Viel Aktivität" },
      { Icon: CompassFadeIcon, label: "Keine Richtung" },
      { Icon: HourglassIcon, label: "Energie verloren" },
    ],
  },
  {
    eyebrow: "Ruder",
    headline: "Zuerst die",
    accent: "Richtung.",
    sub: "Positionierung ist nicht was du machst — sondern wohin du gehst und für wen.",
    facts: [
      { Icon: CompassIcon, label: "Klare Position" },
      { Icon: TargetIcon, label: "Eine Zielgruppe" },
      { Icon: AnchorIcon, label: "Stabiler Stand" },
    ],
  },
  {
    eyebrow: "Yacht",
    headline: "Zeit, ein Floß draus zu",
    accent: "bauen.",
    sub: "Wenn Ruder und Fundament stehen, wird aus dem Floß die Yacht.",
    facts: [
      { Icon: BoltIcon, label: "Planbare Akquise" },
      { Icon: ArrowIcon, label: "Konstantes Tempo" },
      { Icon: CheckIcon, label: "Wiederholbar" },
    ],
  },
];

const FRAME_URLS: string[] = (() => {
  const urls: string[] = [];
  for (let c = 1; c <= CHAPTER_COUNT; c++) {
    for (let f = 1; f <= FRAMES_PER_CHAPTER; f++) {
      const cc = String(c).padStart(2, "0");
      const ff = String(f).padStart(3, "0");
      urls.push(`/raft/seq/${cc}/frame-${ff}.jpg`);
    }
  }
  return urls;
})();

/* ─────────────────────────  MATH  ───────────────────────── */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number, a: number, b: number) =>
  clamp01((t - a) / (b - a));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const fadeWin = (s: number, ia: number, ib: number, oa = 0.86, ob = 1) =>
  easeOut(smooth(s, ia, ib)) * (1 - smooth(s, oa, ob));
const flyY = (s: number, ia: number, ib: number, max = 40) =>
  (1 - easeOut(smooth(s, ia, ib))) * max;

/* ─────────────────────────  COMPONENT  ───────────────────────── */

export default function HeroSequence() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const stateRef = useRef({
    target: 0,
    display: 0,
    lastDrawn: -1,
    running: false,
    dpr: 1,
  });
  const [loaded, setLoaded] = useState(0);

  const progress = useScrollProgress(containerRef);

  // Draw the current frame to canvas using object-fit: cover math
  const drawCurrent = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const idx = Math.max(
      0,
      Math.min(TOTAL_FRAMES - 1, Math.round(stateRef.current.display)),
    );
    if (idx === stateRef.current.lastDrawn) return;
    const img = imagesRef.current[idx];
    if (!img || !img.complete || !img.naturalWidth) return;

    const dpr = stateRef.current.dpr;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
    stateRef.current.lastDrawn = idx;
  }, []);

  // LERP animation loop
  const animate = useCallback(() => {
    const s = stateRef.current;
    const diff = s.target - s.display;
    if (Math.abs(diff) < 0.4) {
      s.display = s.target;
      drawCurrent();
      s.running = false;
      return;
    }
    s.display += diff * 0.22;
    drawCurrent();
    requestAnimationFrame(animate);
  }, [drawCurrent]);

  // Mount: preload all frames + setup canvas
  useEffect(() => {
    if (!isDesktop) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mounted = true;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      stateRef.current.dpr = dpr;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stateRef.current.lastDrawn = -1;
      drawCurrent();
    };

    // Preload all frames
    let loadedCount = 0;
    imagesRef.current = FRAME_URLS.map((src, i) => {
      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => {
        if (!mounted) return;
        loadedCount++;
        setLoaded(loadedCount);
        // Force a redraw of the current frame once it's loaded
        if (i === Math.round(stateRef.current.display)) {
          stateRef.current.lastDrawn = -1;
          drawCurrent();
        }
        if (i === 0) {
          stateRef.current.lastDrawn = -1;
          drawCurrent();
        }
      };
      img.src = src;
      return img;
    });

    resize();
    window.addEventListener("resize", resize);

    return () => {
      mounted = false;
      window.removeEventListener("resize", resize);
    };
  }, [isDesktop, drawCurrent]);

  // Drive target from scroll
  useEffect(() => {
    if (!isDesktop) return;
    stateRef.current.target = progress * (TOTAL_FRAMES - 1);
    if (!stateRef.current.running) {
      stateRef.current.running = true;
      requestAnimationFrame(animate);
    }
  }, [progress, isDesktop, animate]);

  const stepFloat = progress * CHAPTER_COUNT;
  const idx = Math.min(
    CHAPTER_COUNT - 1,
    Math.max(0, Math.floor(stepFloat)),
  );
  const sub = clamp01(stepFloat - idx);
  const active = CHAPTERS[idx];

  // CTA reveal in last 18% of overall progress
  const ctaO = easeOut(smooth(progress, 0.78, 0.95));
  const ctaY = (1 - easeOut(smooth(progress, 0.78, 0.95))) * 28;

  // Element choreography windows (per chapter sub-progress)
  const eyebrowO = fadeWin(sub, 0.02, 0.18);
  const eyebrowY = flyY(sub, 0.02, 0.18, 14);
  const headO = fadeWin(sub, 0.06, 0.32);
  const headY = flyY(sub, 0.06, 0.32, 60);
  const subO = fadeWin(sub, 0.2, 0.44);
  const subY = flyY(sub, 0.2, 0.44, 32);
  const f1O = fadeWin(sub, 0.32, 0.5);
  const f1Y = flyY(sub, 0.32, 0.5, 24);
  const f2O = fadeWin(sub, 0.38, 0.56);
  const f2Y = flyY(sub, 0.38, 0.56, 24);
  const f3O = fadeWin(sub, 0.44, 0.62);
  const f3Y = flyY(sub, 0.44, 0.62, 24);

  /* ── MOBILE FALLBACK ── */
  if (!isDesktop) {
    return (
      <section
        id="top"
        className="relative min-h-[100dvh] flex flex-col justify-center px-6 pt-32 pb-16"
        style={{
          background:
            "linear-gradient(180deg, var(--sky) 0%, var(--cream) 100%)",
        }}
      >
        <span className="eyebrow">Für Selbstständige & Unternehmer</span>
        <h1 className="h1 font-serif max-w-[14ch]">
          <span className="block font-serif-italic">Du hast genug Bretter.</span>
          <span className="block" style={{ color: "var(--wood)" }}>
            Zeit, ein Floß draus zu bauen.
          </span>
        </h1>
        <p
          className="mt-8 max-w-[50ch]"
          style={{ color: "var(--text-muted)", fontSize: 17, lineHeight: 1.65 }}
        >
          Planbar Kunden gewinnen, klare Richtung, und ein System das
          funktioniert — auch wenn du schläfst, auch wenn sich die Welt gerade
          wieder neu erfindet.
        </p>
        <div className="mt-8">
          <Image
            src="/raft/seq/01/frame-001.jpg"
            alt="Bretter"
            width={1280}
            height={714}
            priority
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 24,
              boxShadow: "0 40px 80px -30px rgba(92,61,46,0.4)",
            }}
          />
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <a href="#kontakt" className="btn-primary">
            Gespräch anfragen →
          </a>
          <a href="#story" className="btn-ghost">
            Die Geschichte dahinter ↓
          </a>
        </div>
      </section>
    );
  }

  /* ── DESKTOP: CANVAS SCROLL SEQUENCE ── */
  return (
    <section
      id="top"
      ref={containerRef}
      className="relative"
      style={{ height: "500vh", background: "var(--wood)" }}
    >
      <div
        className="sticky top-0 w-screen h-[100dvh] overflow-hidden"
        style={{ background: "var(--wood)" }}
      >
        {/* Static first frame — shows instantly before canvas takes over */}
        <div className="absolute inset-0">
          <Image
            src="/raft/seq/01/frame-001.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Canvas overlay — draws current frame */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Legibility gradients */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(44,32,21,0.55) 0%, rgba(44,32,21,0.05) 18%, rgba(44,32,21,0.05) 42%, rgba(44,32,21,0.82) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-1/2 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(44,32,21,0.42) 0%, rgba(44,32,21,0) 100%)",
          }}
        />

        {/* Top bar: eyebrow + progress + counter */}
        <div className="absolute top-0 left-0 right-0 px-8 md:px-14 pt-24 md:pt-28 flex items-center gap-6 z-30">
          <span
            className="text-[11px] tracking-[0.22em] uppercase flex-shrink-0"
            style={{ color: "rgba(245,237,216,0.75)" }}
          >
            Für Selbstständige & Unternehmer
          </span>
          <div
            className="relative h-[2px] flex-1 overflow-hidden rounded-full"
            style={{ background: "rgba(245,237,216,0.18)" }}
          >
            <div
              className="absolute left-0 top-0 h-full"
              style={{
                background: "var(--cream)",
                width: `${progress * 100}%`,
                transition: "width 80ms linear",
              }}
            />
          </div>
          <span
            className="font-mono text-[11px] tracking-[0.15em] flex-shrink-0"
            style={{ color: "var(--cream)" }}
          >
            0{idx + 1} / 0{CHAPTER_COUNT}
          </span>
        </div>

        {/* Left vertical chapter rail */}
        <div className="absolute left-8 md:left-14 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-30">
          {CHAPTERS.map((c, i) => {
            const isActive = i === idx;
            return (
              <div key={c.eyebrow} className="flex items-center gap-4">
                <span className="relative w-9 h-9 flex items-center justify-center flex-shrink-0">
                  <span
                    className="absolute inset-0 rounded-full backdrop-blur-md"
                    style={{
                      background: isActive
                        ? "var(--cream)"
                        : "rgba(44,32,21,0.45)",
                      border: `1px solid ${
                        isActive ? "var(--cream)" : "rgba(245,237,216,0.35)"
                      }`,
                      transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                  <span
                    className="relative font-mono text-[11px]"
                    style={{
                      color: isActive
                        ? "var(--wood)"
                        : "rgba(245,237,216,0.85)",
                      transition: "color 400ms ease",
                    }}
                  >
                    0{i + 1}
                  </span>
                </span>
                <span
                  className="hidden xl:inline font-serif-italic text-sm"
                  style={{
                    color: isActive
                      ? "var(--cream)"
                      : "rgba(245,237,216,0.4)",
                    transition: "color 400ms ease",
                  }}
                >
                  {c.eyebrow}
                </span>
              </div>
            );
          })}
        </div>

        {/* Chapter content — bottom area */}
        <div
          className="absolute inset-0 z-20 grid grid-cols-12 gap-6 px-8 md:px-14 pb-24 md:pb-24 pt-44 pointer-events-none"
          style={{ alignContent: "end" }}
        >
          {/* Left: eyebrow + headline + sub */}
          <div className="col-span-12 md:col-span-7 md:col-start-2 flex flex-col justify-end">
            <div
              className="flex items-center gap-3 mb-5"
              style={{
                opacity: eyebrowO,
                transform: `translateY(${eyebrowY}px)`,
                willChange: "opacity, transform",
              }}
            >
              <span
                className="font-mono text-[11px] tracking-[0.2em]"
                style={{ color: "var(--cream)" }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span
                className="w-12 h-[1px]"
                style={{ background: "rgba(245,237,216,0.6)" }}
              />
              <span
                className="text-[11px] tracking-[0.22em] uppercase"
                style={{ color: "rgba(245,237,216,0.85)" }}
              >
                {active.eyebrow}
              </span>
            </div>

            <h1
              className="font-serif leading-[1.02] tracking-tight max-w-[18ch]"
              style={{
                fontSize: "clamp(48px, 7vw, 104px)",
                color: "var(--cream)",
                opacity: headO,
                transform: `translateY(${headY}px)`,
                willChange: "opacity, transform",
                textShadow: "0 30px 80px rgba(0,0,0,0.45)",
              }}
            >
              <span className="block">{active.headline}</span>
              {active.accent && (
                <span className="block font-serif-italic">
                  {active.accent}
                </span>
              )}
            </h1>

            <p
              className="mt-6 max-w-[48ch]"
              style={{
                fontSize: "clamp(16px, 1.3vw, 20px)",
                lineHeight: 1.55,
                color: "rgba(245,237,216,0.85)",
                opacity: subO,
                transform: `translateY(${subY}px)`,
                willChange: "opacity, transform",
              }}
            >
              {active.sub}
            </p>

            {/* CTA group — reveals only at end */}
            <div
              className="mt-8 flex flex-wrap items-center gap-3 pointer-events-auto"
              style={{
                opacity: ctaO,
                transform: `translateY(${ctaY}px)`,
                willChange: "opacity, transform",
              }}
            >
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium"
                style={{
                  background: "var(--cream)",
                  color: "var(--wood)",
                  boxShadow: "0 20px 50px -20px rgba(0,0,0,0.5)",
                }}
              >
                Gespräch anfragen →
              </a>
              <a
                href="#story"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium"
                style={{
                  background: "rgba(245,237,216,0.08)",
                  color: "var(--cream)",
                  border: "1px solid rgba(245,237,216,0.3)",
                  backdropFilter: "blur(10px)",
                }}
              >
                Die Geschichte dahinter ↓
              </a>
              <div className="ml-2">
                <VoiceNote label="30 Sek. von mir" />
              </div>
            </div>
          </div>

          {/* Right: 3 fact pills, stacked */}
          <div className="col-span-12 md:col-span-3 md:col-start-10 flex flex-col justify-end gap-3">
            {[
              { fact: active.facts[0], O: f1O, Y: f1Y },
              { fact: active.facts[1], O: f2O, Y: f2Y },
              { fact: active.facts[2], O: f3O, Y: f3Y },
            ].map((row, i) => {
              const F = row.fact;
              return (
                <div
                  key={`${idx}-${i}`}
                  className="flex items-center gap-4 px-5 py-4 rounded-2xl backdrop-blur-md"
                  style={{
                    background: "rgba(245,237,216,0.12)",
                    border: "1px solid rgba(245,237,216,0.22)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
                    opacity: row.O,
                    transform: `translateY(${row.Y}px)`,
                    willChange: "opacity, transform",
                  }}
                >
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: "var(--cream)",
                      color: "var(--wood)",
                    }}
                  >
                    <F.Icon />
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--cream)" }}
                  >
                    {F.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Persistent micro social-proof at absolute bottom */}
        <div
          className="absolute bottom-6 left-0 right-0 flex justify-center z-30 pointer-events-none"
          style={{ opacity: 1 - ctaO * 0.3 }}
        >
          <div
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2 rounded-full backdrop-blur-md"
            style={{
              background: "rgba(44,32,21,0.45)",
              border: "1px solid rgba(245,237,216,0.2)",
            }}
          >
            <span
              className="text-[11px] tracking-[0.1em]"
              style={{ color: "var(--cream)" }}
            >
              Seit 2017
            </span>
            <span
              className="w-0.5 h-0.5 rounded-full"
              style={{ background: "var(--rope)" }}
            />
            <span
              className="text-[11px] tracking-[0.1em]"
              style={{ color: "var(--cream)" }}
            >
              Operator, nicht Berater
            </span>
            <span
              className="w-0.5 h-0.5 rounded-full"
              style={{ background: "var(--rope)" }}
            />
            <span
              className="text-[11px] tracking-[0.1em]"
              style={{ color: "var(--cream)" }}
            >
              Nur auf Empfehlung
            </span>
          </div>
        </div>

        {/* Loading indicator (top-right, fades out as frames arrive) */}
        {loaded < TOTAL_FRAMES && (
          <div
            className="absolute top-24 right-14 z-40 text-[10px] font-mono tracking-widest"
            style={{
              color: "rgba(245,237,216,0.5)",
              opacity: loaded / TOTAL_FRAMES < 0.9 ? 1 : 0,
              transition: "opacity 400ms ease",
            }}
          >
            {String(Math.round((loaded / TOTAL_FRAMES) * 100)).padStart(3, "0")}
            %
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────  ICONS  ───────────────────────── */

const IP = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function BoardsIcon() {
  return (
    <svg {...IP}>
      <path d="M4 7 L20 7" />
      <path d="M3 12 L21 12" />
      <path d="M5 17 L19 17" />
    </svg>
  );
}
function FragmentIcon() {
  return (
    <svg {...IP}>
      <path d="M5 5 L9 9" />
      <path d="M15 5 L19 9" />
      <path d="M5 19 L9 15" />
      <path d="M15 19 L19 15" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}
function WaveIcon() {
  return (
    <svg {...IP}>
      <path d="M3 12 Q6 8 9 12 T15 12 T21 12" />
      <path d="M3 17 Q6 13 9 17 T15 17 T21 17" />
    </svg>
  );
}
function SwimmerIcon() {
  return (
    <svg {...IP}>
      <circle cx="17" cy="6" r="1.5" />
      <path d="M3 14 Q6 11 9 14 T15 14 T21 14" />
      <path d="M9 11 L13 9 L16 11 L13 12 Z" />
    </svg>
  );
}
function CompassFadeIcon() {
  return (
    <svg {...IP}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7 L13 12 L12 17" strokeOpacity="0.4" />
    </svg>
  );
}
function HourglassIcon() {
  return (
    <svg {...IP}>
      <path d="M6 3 L18 3" />
      <path d="M6 21 L18 21" />
      <path d="M6 3 L18 21" />
      <path d="M18 3 L6 21" />
    </svg>
  );
}
function CompassIcon() {
  return (
    <svg {...IP}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9 L11 13 L9 15 L13 11 Z" fill="currentColor" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg {...IP}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
function AnchorIcon() {
  return (
    <svg {...IP}>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7 L12 21" />
      <path d="M9 11 L15 11" />
      <path d="M5 16 Q5 21 12 21 Q19 21 19 16" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg {...IP}>
      <path d="M13 3 L5 14 L11 14 L10 21 L19 9 L13 9 Z" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg {...IP}>
      <path d="M4 12 L20 12" />
      <path d="M14 6 L20 12 L14 18" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg {...IP}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12 L11 15 L16 9" />
    </svg>
  );
}
