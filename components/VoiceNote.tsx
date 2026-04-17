"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  src?: string;
  label?: string;
  duration?: number; // in seconds, for the visual progress ring
};

/**
 * Tiny "voice note" play button. Uses Howler for cross-browser audio,
 * proper fade-in/out, and graceful fallback if the file is missing.
 * Drop an mp3/ogg at /public/voice/intro.mp3 to wire it up.
 */
export default function VoiceNote({
  src = "/voice/intro.mp3",
  label = "30 Sek. von mir",
  duration = 32,
}: Props) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const howlRef = useRef<{
    play: () => void;
    pause: () => void;
    stop: () => void;
    seek: (v?: number) => number;
    fade: (f: number, t: number, d: number) => void;
    on: (e: string, fn: () => void) => void;
    unload: () => void;
    state: () => string;
  } | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { Howl } = await import("howler");
      if (cancelled) return;
      const howl = new Howl({
        src: [src],
        volume: 0,
        html5: true,
        preload: false,
        onend: () => {
          setPlaying(false);
          setProgress(0);
        },
        onloaderror: () => {
          // Silently no-op if the file isn't there yet.
        },
        onplayerror: () => {
          setPlaying(false);
        },
      }) as unknown as typeof howlRef.current;
      howlRef.current = howl;
    })();
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      howlRef.current?.stop();
      howlRef.current?.unload();
    };
  }, [src]);

  const tick = () => {
    const h = howlRef.current;
    if (!h) return;
    const t = typeof h.seek === "function" ? Number(h.seek()) || 0 : 0;
    setProgress(Math.min(1, t / duration));
    rafRef.current = requestAnimationFrame(tick);
  };

  const toggle = () => {
    const h = howlRef.current;
    if (!h) return;
    if (playing) {
      h.fade(1, 0, 300);
      setTimeout(() => h.pause(), 280);
      cancelAnimationFrame(rafRef.current);
      setPlaying(false);
    } else {
      try {
        h.play();
        h.fade(0, 1, 400);
        setPlaying(true);
        rafRef.current = requestAnimationFrame(tick);
      } catch {
        setPlaying(false);
      }
    }
  };

  const R = 18;
  const C = 2 * Math.PI * R;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Stoppen" : "Abspielen"}
      className="group inline-flex items-center gap-3 pl-1.5 pr-5 py-1.5 rounded-full"
      style={{
        background: "rgba(244,245,248,0.7)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(140,146,160,0.4)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
      }}
    >
      <span className="relative w-10 h-10 flex items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 40 40" className="absolute inset-0 -rotate-90">
          <circle
            cx="20"
            cy="20"
            r={R}
            fill="none"
            stroke="rgba(140,146,160,0.35)"
            strokeWidth="1.5"
          />
          <circle
            cx="20"
            cy="20"
            r={R}
            fill="none"
            stroke="var(--wood)"
            strokeWidth="1.5"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 120ms linear" }}
          />
        </svg>
        <motion.span
          animate={playing ? { scale: [1, 1.08, 1] } : { scale: 1 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-6 h-6 flex items-center justify-center rounded-full"
          style={{ background: "var(--wood)", color: "var(--cream)" }}
        >
          {playing ? (
            <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
              <rect x="0" y="0" width="3" height="10" />
              <rect x="5" y="0" width="3" height="10" />
            </svg>
          ) : (
            <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
              <path d="M0 0 L8 5 L0 10 Z" />
            </svg>
          )}
        </motion.span>
      </span>
      <span className="text-xs font-medium" style={{ color: "var(--wood)" }}>
        {label}
      </span>
    </button>
  );
}
