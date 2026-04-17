"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import HeroLoader from "./HeroLoader";
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
    eyebrow: "Für Unternehmer & Geschäftsführer",
    headline: "Du hast alle Bretter.",
    accent: "Nur noch kein Floß.",
    sub: "Skills, Team, Tools, Daten — alles da. Aber einzeln. Ein ChatGPT-Tab neben einem Trello-Board neben einem LinkedIn-Profil ist kein System. Es ist ein Haufen Bretter.",
    facts: [
      { Icon: BoardsIcon, label: "Skills & Tools da" },
      { Icon: FragmentIcon, label: "Nichts greift ineinander" },
      { Icon: WaveIcon, label: "Jeden Monat von vorn" },
    ],
  },
  {
    eyebrow: "Im Wasser, aber",
    headline: "Dein Floß schwimmt.",
    accent: "Nur wohin?",
    sub: "Du postest, du promptest, du automatisierst. Es bewegt sich. Aber ohne Strategie entscheidet der Algorithmus, wo du landest — und der Algorithmus ist ein mieser Navigator.",
    facts: [
      { Icon: SwimmerIcon, label: "Viel Aktivität" },
      { Icon: CompassFadeIcon, label: "Kein Kurs" },
      { Icon: HourglassIcon, label: "Algorithmus entscheidet" },
    ],
  },
  {
    eyebrow: "Richtung vor Tempo",
    headline: "Zuerst das Ruder.",
    accent: "Dann der Motor.",
    sub: "Positionierung gibt die Richtung. Systeme geben den Hebel. Zusammen: Sichtbarkeit und Akquise, die laufen — ohne dass du alles selbst machen musst.",
    facts: [
      { Icon: CompassIcon, label: "Klarer Kurs" },
      { Icon: TargetIcon, label: "Ein Idealkunde" },
      { Icon: AnchorIcon, label: "Systeme mit Richtung" },
    ],
  },
  {
    eyebrow: "Volle Fahrt",
    headline: "Jetzt kommt der Motor.",
    accent: "Und aus dem Floß die Yacht.",
    sub: "Positionierung, Brand und Akquise als ein System. Qualifizierte Anfragen, die ankommen — auch wenn du nicht am Schreibtisch sitzt. Kein Zufall. Infrastruktur.",
    facts: [
      { Icon: BoltIcon, label: "Planbar statt Hoffnung" },
      { Icon: ArrowIcon, label: "Systeme, die arbeiten" },
      { Icon: CheckIcon, label: "Auch ohne dich" },
    ],
  },
];

const FRAME_URLS_LG: string[] = (() => {
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

const FRAME_URLS_SM: string[] = (() => {
  const urls: string[] = [];
  for (let c = 1; c <= CHAPTER_COUNT; c++) {
    for (let f = 1; f <= FRAMES_PER_CHAPTER; f++) {
      const cc = String(c).padStart(2, "0");
      const ff = String(f).padStart(3, "0");
      urls.push(`/raft/seq-sm/${cc}/frame-${ff}.jpg`);
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
  const [minTimePassed, setMinTimePassed] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);

  const progress = useScrollProgress(containerRef);

  // Loader hand-off: short minimum (700 ms) + wait for ~10 % frames
  useEffect(() => {
    const t = setTimeout(() => setMinTimePassed(true), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (minTimePassed && loaded >= Math.min(25, TOTAL_FRAMES)) {
      setLoaderDone(true);
    }
  }, [minTimePassed, loaded]);

  // Draw the current frame with plain object-fit: cover. On mobile
  // the media zone is aspect-[16/9] which matches the source video
  // aspect (1928 × 1076 ≈ 1.79), so cover ≈ contain in practice and
  // there's no visible crop. On desktop cover fills the full-screen
  // sticky. The canvas always paints edge-to-edge so the gradients
  // on top can fade smoothly into the wood content zone.
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

  // Mount: preload all frames + setup canvas.
  // Pick the small set on narrow viewports, the large set otherwise —
  // iOS Safari has a ~384 MB decoded-bitmap ceiling, so the 1280w set
  // would blow the budget (~1 GB decoded) on phones.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mounted = true;

    const urls =
      typeof window !== "undefined" && window.innerWidth < 768
        ? FRAME_URLS_SM
        : FRAME_URLS_LG;

    const resize = () => {
      // Use the canvas's parent as the size source — on mobile the
      // media zone is only 62vh (not the full viewport).
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      stateRef.current.dpr = dpr;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;
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
    imagesRef.current = urls.map((src, i) => {
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
  }, [drawCurrent]);

  // Drive target from scroll
  useEffect(() => {
    stateRef.current.target = progress * (TOTAL_FRAMES - 1);
    if (!stateRef.current.running) {
      stateRef.current.running = true;
      requestAnimationFrame(animate);
    }
  }, [progress, animate]);

  const stepFloat = progress * CHAPTER_COUNT;
  const idx = Math.min(
    CHAPTER_COUNT - 1,
    Math.max(0, Math.floor(stepFloat)),
  );
  const sub = clamp01(stepFloat - idx);
  const active = CHAPTERS[idx];

  // CTA reveal in last 20% of overall progress
  const ctaO = easeOut(smooth(progress, 0.78, 0.95));
  const ctaY = (1 - easeOut(smooth(progress, 0.78, 0.95))) * 22;

  // Choreography: content is ALWAYS fully visible at chapter start
  // (sub=0). Only fades out + flies up during the chapter handover
  // (sub 0.84 → 0.99). That way the hero is legible from page load.
  const staticO = (oS: number, oE: number) => 1 - smooth(sub, oS, oE);
  const staticY = (oS: number, oE: number, max: number) =>
    -easeOut(smooth(sub, oS, oE)) * max;

  const eyebrowO = staticO(0.82, 0.92);
  const eyebrowY = staticY(0.82, 0.92, 14);
  const headO = staticO(0.85, 0.96);
  const headY = staticY(0.85, 0.96, 30);
  const subO = staticO(0.87, 0.98);
  const subY = staticY(0.87, 0.98, 22);
  const f1O = staticO(0.83, 0.93);
  const f1Y = staticY(0.83, 0.93, 16);
  const f2O = staticO(0.85, 0.95);
  const f2Y = staticY(0.85, 0.95, 16);
  const f3O = staticO(0.87, 0.97);
  const f3Y = staticY(0.87, 0.97, 16);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative"
      style={{ height: "500vh", background: "var(--wood)" }}
    >
      {/* Opening gate animation — mounts first, slides out when ready */}
      <AnimatePresence>
        {!loaderDone && (
          <HeroLoader key="hero-loader" loaded={loaded} total={TOTAL_FRAMES} />
        )}
      </AnimatePresence>

      <div
        className="sticky top-0 w-screen h-[100dvh] overflow-hidden flex flex-col md:block"
        style={{ background: "var(--wood)" }}
      >
        {/* ═══════════════  MEDIA ZONE  ═══════════════
            Mobile: flex child with aspect-[16/9] — matches the source
            video aspect exactly (1928×1076 ≈ 1.79), so cover fill
            means zero crop and the gradient fades smoothly straight
            into the content-zone wood with no visible edge.
            Desktop: absolute fill of the sticky. */}
        <div className="relative w-full aspect-[16/9] flex-shrink-0 md:aspect-auto md:h-full md:flex-none md:absolute md:inset-0">
          {/* Static first frame — shows instantly before canvas takes over */}
          <div className="absolute inset-0">
            <Image
              src="/raft/seq/01/frame-001.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Canvas overlay — draws current frame */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
            style={{ width: "100%", height: "100%" }}
          />

          {/* Top darkening — masks the nav pill + top bar */}
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-[30%] pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,12,20,0.75) 0%, rgba(10,12,20,0.25) 55%, rgba(10,12,20,0) 100%)",
            }}
          />

          {/* Bottom fade → full wood — smooth hand-off into the content zone.
              Starts transparent mid-media and ramps to full wood at the edge. */}
          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-[55%] pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,12,20,0) 0%, rgba(10,12,20,0.25) 40%, rgba(10,12,20,0.75) 75%, rgba(10,12,20,1) 100%)",
            }}
          />

          {/* Desktop-only left fade for text legibility */}
          <div
            aria-hidden
            className="hidden md:block absolute inset-y-0 left-0 w-1/2 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,12,20,0.42) 0%, rgba(10,12,20,0) 100%)",
            }}
          />

          {/* Top bar: eyebrow + progress + counter */}
          <div className="absolute top-0 left-0 right-0 px-5 md:px-14 pt-24 md:pt-28 flex items-center gap-3 md:gap-6 z-30">
            <span
              className="hidden sm:inline text-[11px] tracking-[0.22em] uppercase flex-shrink-0"
              style={{ color: "rgba(244,245,248,0.75)" }}
            >
              Für Unternehmer & Geschäftsführer
            </span>
            <div
              className="relative h-[2px] flex-1 overflow-hidden rounded-full"
              style={{ background: "rgba(244,245,248,0.18)" }}
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

          {/* Left vertical chapter rail — desktop only */}
          <div className="hidden md:flex absolute left-14 top-1/2 -translate-y-1/2 flex-col gap-5 z-30">
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
                          : "rgba(10,12,20,0.45)",
                        border: `1px solid ${
                          isActive ? "var(--cream)" : "rgba(244,245,248,0.35)"
                        }`,
                        transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                    <span
                      className="relative font-mono text-[11px]"
                      style={{
                        color: isActive
                          ? "var(--wood)"
                          : "rgba(244,245,248,0.85)",
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
                        : "rgba(244,245,248,0.4)",
                      transition: "color 400ms ease",
                    }}
                  >
                    {c.eyebrow}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Loading indicator — inside media zone top-right */}
          {loaded < TOTAL_FRAMES && (
            <div
              className="absolute top-24 md:top-28 right-5 md:right-14 z-40 text-[10px] font-mono tracking-widest"
              style={{
                color: "rgba(244,245,248,0.5)",
                opacity: loaded / TOTAL_FRAMES < 0.9 ? 1 : 0,
                transition: "opacity 400ms ease",
              }}
            >
              {String(Math.round((loaded / TOTAL_FRAMES) * 100)).padStart(3, "0")}
              %
            </div>
          )}
        </div>

        {/* ═══════════════  CONTENT ZONE  ═══════════════
            Desktop: headline + sub at TOP ("im Himmel" — above the
            water, in the sky part of the image). Facts stay at the
            bottom near the water line via self-end.
            Mobile: flows top-down below the media zone. */}
        <div
          className="relative flex-1 min-h-0 z-20 md:absolute md:inset-0 md:flex-none grid grid-cols-12 gap-3 md:gap-6 px-5 md:px-14 pt-8 md:pt-36 pb-16 md:pb-10 pointer-events-none"
        >
          {/* Left: eyebrow + headline + sub — desktop: at the TOP (sky) */}
          <div className="col-span-12 md:col-span-7 md:col-start-2 flex flex-col justify-start md:self-start">
            <div
              className="flex items-center gap-3 mb-4 md:mb-5"
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
                className="w-10 h-[1px]"
                style={{ background: "rgba(244,245,248,0.6)" }}
              />
              <span
                className="text-[11px] tracking-[0.22em] uppercase"
                style={{ color: "rgba(244,245,248,0.85)" }}
              >
                {active.eyebrow}
              </span>
            </div>

            <h1
              className="font-serif leading-[1.02] tracking-tight max-w-[14ch] md:max-w-[18ch]"
              style={{
                fontSize: "clamp(38px, 9vw, 104px)",
                color: "var(--cream)",
                opacity: headO,
                transform: `translateY(${headY}px)`,
                willChange: "opacity, transform",
                textShadow: "0 30px 80px rgba(0,0,0,0.45)",
              }}
            >
              <SplitLine
                text={active.headline}
                resetKey={`h-${idx}`}
                delayStart={0.05}
              />
              {active.accent && (
                <span className="block font-serif-italic">
                  <SplitLine
                    text={active.accent}
                    resetKey={`a-${idx}`}
                    delayStart={0.28}
                  />
                </span>
              )}
            </h1>

            <p
              className="mt-4 md:mt-6 max-w-[44ch]"
              style={{
                fontSize: "clamp(14px, 1.3vw, 20px)",
                lineHeight: 1.55,
                color: "rgba(244,245,248,0.85)",
                opacity: subO,
                transform: `translateY(${subY}px)`,
                willChange: "opacity, transform",
              }}
            >
              {active.sub}
            </p>

            {/* CTA group — reveals only at end */}
            <div
              className="mt-6 md:mt-8 flex flex-wrap items-center gap-3 md:gap-4 pointer-events-auto"
              style={{
                opacity: ctaO,
                transform: `translateY(${ctaY}px)`,
                willChange: "opacity, transform",
                pointerEvents: ctaO > 0.3 ? "auto" : "none",
              }}
            >
              <MagneticCTA href="#kontakt" primary>
                <span className="relative z-10">Gespräch anfragen</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
                {/* Shimmer sweep */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 pointer-events-none rounded-full"
                  style={{
                    background:
                      "linear-gradient(100deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)",
                  }}
                  animate={{ x: ["-120%", "120%"] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />
              </MagneticCTA>
              <MagneticCTA href="#story" className="hidden sm:inline-flex">
                Die Geschichte dahinter ↓
              </MagneticCTA>
              <div className="hidden md:block ml-1">
                <VoiceNote label="30 Sek. von mir" />
              </div>
            </div>
          </div>

          {/* Right: 3 fact pills — desktop only, pinned to bottom
              (self-end) so they sit at the water line while the
              headline is in the sky. */}
          <div className="hidden md:flex col-span-3 col-start-10 flex-col gap-3 md:self-end md:pb-8">
            {[
              { fact: active.facts[0], O: f1O, Y: f1Y },
              { fact: active.facts[1], O: f2O, Y: f2Y },
              { fact: active.facts[2], O: f3O, Y: f3Y },
            ].map((row, i) => {
              const F = row.fact;
              return (
                <motion.div
                  key={`${idx}-${i}`}
                  initial={{ scale: 0.85, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 18,
                    delay: 0.35 + i * 0.07,
                  }}
                  className="flex-shrink-0 md:flex-shrink flex items-center gap-2 md:gap-4 px-3 md:px-5 py-2.5 md:py-4 rounded-full md:rounded-2xl backdrop-blur-md"
                  style={{
                    background: "rgba(244,245,248,0.12)",
                    border: "1px solid rgba(244,245,248,0.22)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
                    // fade-out on chapter exit multiplies with the mount opacity
                    filter: `opacity(${row.O})`,
                    transform: `translateY(${row.Y}px)`,
                    willChange: "opacity, transform",
                  }}
                >
                  <span
                    className="flex-shrink-0 w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: "var(--cream)",
                      color: "var(--wood)",
                    }}
                  >
                    <F.Icon />
                  </span>
                  <span
                    className="text-[11px] md:text-sm font-medium whitespace-nowrap"
                    style={{ color: "var(--cream)" }}
                  >
                    {F.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Persistent micro social-proof at absolute bottom */}
        <div
          className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center z-30 pointer-events-none px-4"
          style={{ opacity: 1 - ctaO * 0.3 }}
        >
          <div
            className="flex flex-wrap items-center justify-center gap-x-2 md:gap-x-3 gap-y-1 px-4 md:px-5 py-2 rounded-full backdrop-blur-md"
            style={{
              background: "rgba(10,12,20,0.45)",
              border: "1px solid rgba(244,245,248,0.2)",
            }}
          >
            <span
              className="text-[10px] md:text-[11px] tracking-[0.1em]"
              style={{ color: "var(--cream)" }}
            >
              Seit 2017
            </span>
            <span
              className="w-0.5 h-0.5 rounded-full"
              style={{ background: "var(--rope)" }}
            />
            <span
              className="text-[10px] md:text-[11px] tracking-[0.1em]"
              style={{ color: "var(--cream)" }}
            >
              Operator, nicht Berater
            </span>
            <span
              className="hidden sm:inline w-0.5 h-0.5 rounded-full"
              style={{ background: "var(--rope)" }}
            />
            <span
              className="hidden sm:inline text-[10px] md:text-[11px] tracking-[0.1em]"
              style={{ color: "var(--cream)" }}
            >
              Nur auf Empfehlung
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  MAGNETIC CTA  ───────────────────────── */

function MagneticCTA({
  href,
  children,
  primary,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  className?: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 16 });
  const sy = useSpring(my, { stiffness: 220, damping: 16 });
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.28);
    my.set((e.clientY - r.top - r.height / 2) * 0.28);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      style={{ x: sx, y: sy }}
      className={`relative inline-flex items-center gap-2 rounded-full overflow-hidden text-sm font-medium ${
        primary
          ? "px-6 md:px-8 py-3.5 md:py-4 glow-border glow-border-sm"
          : "px-5 md:px-6 py-3 md:py-3.5"
      } ${className}`}
    >
      {/* Background fill */}
      <span
        className="absolute inset-0 rounded-full -z-0"
        style={
          primary
            ? {
                background: "var(--cream)",
                boxShadow:
                  "0 20px 50px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)",
              }
            : {
                background: "rgba(244,245,248,0.08)",
                border: "1px solid rgba(244,245,248,0.3)",
                backdropFilter: "blur(10px)",
              }
        }
      />
      <span
        className="relative z-10 flex items-center gap-2"
        style={{ color: primary ? "var(--wood)" : "var(--cream)" }}
      >
        {children}
      </span>
    </motion.a>
  );
}

/* ─────────────────────────  SPLIT LINE  ───────────────────────── */

/**
 * Char-by-char reveal for a line of text. Re-triggers on resetKey
 * change (e.g. chapter swap). Wraps each word in a non-breaking
 * inline-block so the line can only break at word boundaries —
 * otherwise the browser happily breaks a word mid-character because
 * every char is its own inline-block span.
 */
function SplitLine({
  text,
  resetKey,
  delayStart = 0,
}: {
  text: string;
  resetKey: string;
  delayStart?: number;
}) {
  const words = text.split(" ");
  let charIndex = 0;
  return (
    <span className="block" key={resetKey}>
      {words.map((word, wi) => {
        const chars = Array.from(word);
        return (
          <span
            key={wi}
            className="inline-block whitespace-nowrap"
            style={{ marginRight: wi < words.length - 1 ? "0.24em" : 0 }}
          >
            {chars.map((ch, ci) => {
              const idx = charIndex++;
              return (
                <span
                  key={ci}
                  className="char-reveal"
                  style={{
                    animationDelay: `${delayStart + idx * 0.024}s`,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
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
