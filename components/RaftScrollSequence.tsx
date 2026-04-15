"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/* ─────────────────────────  CONTENT  ───────────────────────── */

type Fact = { Icon: () => JSX.Element; label: string };
type Slide = {
  poster: string;
  video?: string;
  eyebrow: string;
  headline: string;
  sub: string;
  facts: Fact[];
};

const SLIDES: Slide[] = [
  {
    poster: "/raft/bild1.jpg",
    video: "/raft/video1.mp4",
    eyebrow: "Ausgangspunkt",
    headline: "Skills ohne System.",
    sub: "Talent ist da. Was fehlt, ist die Reihenfolge.",
    facts: [
      { Icon: BoardsIcon, label: "Viele Fähigkeiten" },
      { Icon: FragmentIcon, label: "Kein roter Faden" },
      { Icon: WaveIcon, label: "Kein Tempo" },
    ],
  },
  {
    poster: "/raft/bild2.jpg",
    video: "/raft/video2.mp4",
    eyebrow: "Bewegung",
    headline: "Schon im Wasser. Aber treibend.",
    sub: "Aktivität ist nicht Fortschritt. Schwimmen ist nicht steuern.",
    facts: [
      { Icon: SwimmerIcon, label: "Viel Bewegung" },
      { Icon: CompassFadeIcon, label: "Keine Richtung" },
      { Icon: HourglassIcon, label: "Energie verloren" },
    ],
  },
  {
    poster: "/raft/bild3.jpg",
    video: "/raft/video3.mp4",
    eyebrow: "Richtung",
    headline: "Zuerst die Richtung.",
    sub: "Positionierung ist nicht was du machst — sondern wohin du gehst.",
    facts: [
      { Icon: CompassIcon, label: "Klare Position" },
      { Icon: TargetIcon, label: "Eine Zielgruppe" },
      { Icon: AnchorIcon, label: "Stabiler Stand" },
    ],
  },
  {
    poster: "/raft/bild4.jpg",
    video: "/raft/video4.mp4",
    eyebrow: "Geschwindigkeit",
    headline: "Dann erst der Motor.",
    sub: "Wenn alles trägt, macht Tempo Sinn. Vorher ist es nur schneller verloren.",
    facts: [
      { Icon: BoltIcon, label: "Planbare Akquise" },
      { Icon: ArrowIcon, label: "Konstantes Tempo" },
      { Icon: CheckIcon, label: "Wiederholbar" },
    ],
  },
];

/* ─────────────────────────  MATH HELPERS  ───────────────────────── */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const smooth = (t: number, start: number, end: number) =>
  clamp01((t - start) / (end - start));

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Returns an opacity 0..1 for an element that should fade in within
 * [inStart..inEnd] of the per-step sub-progress, hold, then fade out
 * within [outStart..outEnd]. Easing is applied to the fade-in.
 */
function fadeWindow(
  sub: number,
  inStart: number,
  inEnd: number,
  outStart = 0.86,
  outEnd = 1.0,
) {
  const inP = easeOut(smooth(sub, inStart, inEnd));
  const outP = 1 - smooth(sub, outStart, outEnd);
  return inP * outP;
}

/**
 * Translation Y for a fly-in effect. Starts at maxY, ends at 0.
 * Same window as fadeWindow's fade-in for visual coherence.
 */
function flyY(sub: number, inStart: number, inEnd: number, maxY = 32) {
  return (1 - easeOut(smooth(sub, inStart, inEnd))) * maxY;
}

/* ─────────────────────────  COMPONENT  ───────────────────────── */

export default function RaftScrollSequence() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(containerRef);

  const N = SLIDES.length;
  const stepFloat = progress * N;
  const idx = Math.min(N - 1, Math.max(0, Math.floor(stepFloat)));
  const sub = clamp01(stepFloat - idx);

  // Auto-play active video, pause + reset others
  const videoRefs = useRef<Array<HTMLVideoElement | null>>(
    Array(N).fill(null),
  );
  useEffect(() => {
    if (!isDesktop) return;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === idx) {
        const playPromise = v.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {
            // Autoplay blocked — poster still shows. No-op.
          });
        }
      } else {
        v.pause();
        try {
          v.currentTime = 0;
        } catch {
          /* noop */
        }
      }
    });
  }, [idx, isDesktop]);

  const active = SLIDES[idx];

  /* ── MOBILE FALLBACK ── */
  if (!isDesktop) {
    return (
      <section
        id="system"
        className="py-24 px-6"
        style={{ background: "var(--white)" }}
      >
        <div className="max-w-[680px] mx-auto mb-12">
          <span className="eyebrow">Vom Brett zum Floß</span>
          <h2 className="h2 font-serif">
            Vier Stationen.
            <br />
            <span className="font-serif-italic">Eine Richtung.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-16 max-w-[680px] mx-auto">
          {SLIDES.map((s, i) => (
            <article key={s.poster} className="relative">
              <div
                className="relative overflow-hidden mb-6"
                style={{ borderRadius: 24 }}
              >
                <Image
                  src={s.poster}
                  alt={s.headline}
                  width={1200}
                  height={1500}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--rope)" }}
                >
                  0{i + 1} / 04
                </span>
                <span
                  className="w-8 h-[1px]"
                  style={{ background: "var(--rope)" }}
                />
                <span
                  className="text-[11px] tracking-[0.2em] uppercase"
                  style={{ color: "var(--wood)" }}
                >
                  {s.eyebrow}
                </span>
              </div>

              <h3 className="font-serif text-3xl mb-3">{s.headline}</h3>
              <p
                className="font-serif-italic text-lg mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                {s.sub}
              </p>

              <ul className="grid grid-cols-1 gap-2">
                {s.facts.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 py-3 border-b"
                    style={{ borderColor: "rgba(196,168,130,0.3)" }}
                  >
                    <span style={{ color: "var(--wood)" }}>
                      <f.Icon />
                    </span>
                    <span style={{ color: "var(--text)" }}>{f.label}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    );
  }

  /* ── DESKTOP STICKY ── */
  return (
    <section
      id="system"
      ref={containerRef}
      className="relative"
      style={{ height: `${N * 100}vh`, background: "var(--wood)" }}
    >
      <div
        className="sticky top-0 w-screen h-[100dvh] overflow-hidden"
        style={{ background: "var(--wood)" }}
      >
        {/* ── MEDIA STACK ── */}
        {SLIDES.map((s, i) => {
          // image opacity follows step, but with a smooth crossfade window
          const isActive = i === idx;
          // Image stays at scale 1 when active, slightly zoomed when leaving
          const imgOpacity = isActive ? 1 : 0;
          return (
            <div
              key={s.poster}
              className="absolute inset-0"
              style={{
                opacity: imgOpacity,
                transition:
                  "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
                transform: isActive ? "scale(1)" : "scale(1.05)",
                willChange: "opacity, transform",
              }}
            >
              {/* video first, poster (still) is its fallback */}
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                poster={s.poster}
                muted
                playsInline
                loop
                preload="metadata"
                className="w-full h-full"
                style={{ objectFit: "cover" }}
              >
                {s.video ? <source src={s.video} type="video/mp4" /> : null}
              </video>
            </div>
          );
        })}

        {/* ── LEGIBILITY GRADIENTS ── */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(44,32,21,0.55) 0%, rgba(44,32,21,0.05) 18%, rgba(44,32,21,0.05) 45%, rgba(44,32,21,0.78) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-1/2 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(44,32,21,0.4) 0%, rgba(44,32,21,0) 100%)",
          }}
        />

        {/* ── TOP BAR ── */}
        <div className="absolute top-0 left-0 right-0 px-8 md:px-14 pt-10 flex items-center gap-6 z-30">
          <span
            className="text-[11px] tracking-[0.22em] uppercase flex-shrink-0"
            style={{ color: "rgba(245,237,216,0.75)" }}
          >
            Vom Brett zum Floß
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
            0{idx + 1} / 0{N}
          </span>
        </div>

        {/* ── LEFT VERTICAL STEP RAIL ── */}
        <div className="absolute left-8 md:left-14 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-30">
          {SLIDES.map((s, i) => {
            const isActive = i === idx;
            return (
              <div key={s.poster} className="flex items-center gap-4">
                <span className="relative w-10 h-10 flex items-center justify-center flex-shrink-0">
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
                  className="text-sm tracking-wide hidden xl:inline font-serif-italic"
                  style={{
                    color: isActive
                      ? "var(--cream)"
                      : "rgba(245,237,216,0.4)",
                    transition: "all 400ms ease",
                    transform: isActive ? "translateX(0)" : "translateX(-4px)",
                  }}
                >
                  {s.eyebrow}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── ACTIVE STEP CONTENT — scroll-driven choreography ── */}
        <ActiveStepContent slide={active} sub={sub} />

        {/* ── SCROLL HINT ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-30 pointer-events-none">
          <div
            className="w-[1px] h-8 origin-top"
            style={{
              background:
                "linear-gradient(180deg, rgba(245,237,216,0.6), rgba(245,237,216,0))",
              transform: `scaleY(${1 - sub * 0.5})`,
              transition: "transform 200ms linear",
            }}
          />
          <span
            className="text-[10px] tracking-[0.22em] uppercase"
            style={{ color: "rgba(245,237,216,0.45)" }}
          >
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  ACTIVE STEP CONTENT  ───────────────────────── */

function ActiveStepContent({ slide, sub }: { slide: Slide; sub: number }) {
  // Choreography (sub-progress windows, in order):
  //   eyebrow:   0.02 → 0.18
  //   headline:  0.06 → 0.30
  //   subtext:   0.20 → 0.42
  //   fact 1:    0.34 → 0.50
  //   fact 2:    0.40 → 0.56
  //   fact 3:    0.46 → 0.62
  //   ALL fade out:  0.86 → 1.00

  const eyebrowO = fadeWindow(sub, 0.02, 0.18);
  const eyebrowY = flyY(sub, 0.02, 0.18, 16);

  const headlineO = fadeWindow(sub, 0.06, 0.32);
  const headlineY = flyY(sub, 0.06, 0.32, 56);

  const subO = fadeWindow(sub, 0.2, 0.44);
  const subY = flyY(sub, 0.2, 0.44, 28);

  const fact1O = fadeWindow(sub, 0.34, 0.5);
  const fact1Y = flyY(sub, 0.34, 0.5, 22);
  const fact2O = fadeWindow(sub, 0.4, 0.56);
  const fact2Y = flyY(sub, 0.4, 0.56, 22);
  const fact3O = fadeWindow(sub, 0.46, 0.62);
  const fact3Y = flyY(sub, 0.46, 0.62, 22);

  const factOpacities = [fact1O, fact2O, fact3O];
  const factYs = [fact1Y, fact2Y, fact3Y];

  return (
    <div
      className="absolute inset-0 z-20 grid grid-cols-12 gap-6 px-8 md:px-14 pb-16 md:pb-20 pt-44 pointer-events-none"
      style={{ alignContent: "end" }}
    >
      {/* LEFT: Eyebrow + Headline + Subtext */}
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
            {String(SLIDES.indexOf(slide) + 1).padStart(2, "0")}
          </span>
          <span
            className="w-12 h-[1px]"
            style={{ background: "rgba(245,237,216,0.6)" }}
          />
          <span
            className="text-[11px] tracking-[0.22em] uppercase"
            style={{ color: "rgba(245,237,216,0.85)" }}
          >
            {slide.eyebrow}
          </span>
        </div>

        <h3
          className="font-serif leading-[1.02] tracking-tight max-w-[18ch]"
          style={{
            fontSize: "clamp(48px, 6.5vw, 96px)",
            color: "var(--cream)",
            opacity: headlineO,
            transform: `translateY(${headlineY}px)`,
            willChange: "opacity, transform",
            textShadow: "0 30px 80px rgba(0,0,0,0.45)",
          }}
        >
          {slide.headline.split(" ").map((word, i, arr) =>
            i === arr.length - 1 ? (
              <span key={i} className="font-serif-italic">
                {word}
              </span>
            ) : (
              <span key={i}>{word} </span>
            ),
          )}
        </h3>

        <p
          className="mt-6 max-w-[44ch]"
          style={{
            fontSize: "clamp(17px, 1.4vw, 21px)",
            lineHeight: 1.55,
            color: "rgba(245,237,216,0.85)",
            opacity: subO,
            transform: `translateY(${subY}px)`,
            willChange: "opacity, transform",
          }}
        >
          {slide.sub}
        </p>
      </div>

      {/* RIGHT: Keyfacts with icons */}
      <div className="col-span-12 md:col-span-3 md:col-start-10 flex flex-col justify-end gap-3">
        {slide.facts.map((f, i) => (
          <div
            key={`${slide.poster}-${i}`}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl backdrop-blur-md"
            style={{
              background: "rgba(245,237,216,0.12)",
              border: "1px solid rgba(245,237,216,0.22)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
              opacity: factOpacities[i],
              transform: `translateY(${factYs[i]}px)`,
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
              <f.Icon />
            </span>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--cream)" }}
            >
              {f.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────  ICONS (inline SVG, strokeWidth 1.5)  ───────────────────────── */

const ICON_PROPS = {
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
    <svg {...ICON_PROPS}>
      <path d="M4 7 L20 7" />
      <path d="M3 12 L21 12" />
      <path d="M5 17 L19 17" />
    </svg>
  );
}
function FragmentIcon() {
  return (
    <svg {...ICON_PROPS}>
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
    <svg {...ICON_PROPS}>
      <path d="M3 12 Q6 8 9 12 T15 12 T21 12" />
      <path d="M3 17 Q6 13 9 17 T15 17 T21 17" />
    </svg>
  );
}
function SwimmerIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="17" cy="6" r="1.5" />
      <path d="M3 14 Q6 11 9 14 T15 14 T21 14" />
      <path d="M9 11 L13 9 L16 11 L13 12 Z" />
    </svg>
  );
}
function CompassFadeIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7 L13 12 L12 17" strokeOpacity="0.4" />
    </svg>
  );
}
function HourglassIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M6 3 L18 3" />
      <path d="M6 21 L18 21" />
      <path d="M6 3 L18 21" />
      <path d="M18 3 L6 21" />
    </svg>
  );
}
function CompassIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9 L11 13 L9 15 L13 11 Z" fill="currentColor" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
function AnchorIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7 L12 21" />
      <path d="M9 11 L15 11" />
      <path d="M5 16 Q5 21 12 21 Q19 21 19 16" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M13 3 L5 14 L11 14 L10 21 L19 9 L13 9 Z" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M4 12 L20 12" />
      <path d="M14 6 L20 12 L14 18" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12 L11 15 L16 9" />
    </svg>
  );
}
