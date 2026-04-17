"use client";

import { motion } from "framer-motion";
import LiquidGradient from "./LiquidGradient";
import LogoMark from "./LogoMark";

type Props = {
  loaded: number;
  total: number;
};

/**
 * Hologram-chrome opening. Full-bleed Liquid Gradient shader behind
 * a radial vignette, clean LogoMark + tiny progress bar centered.
 * Premium, technical, no glass cards.
 */
export default function HeroLoader({ loaded, total }: Props) {
  const pct = total > 0 ? Math.min(100, Math.round((loaded / total) * 100)) : 0;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: "#06080f" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(14px)", scale: 1.04 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Shader — full-bleed, faded through a radial mask so the
          center is brightest and the edges melt into ink */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.55,
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
        }}
      >
        <LiquidGradient
          speed={0.21}
          scale={1.5}
          softness={0.51}
          intensity={0.6}
          noise={0.05}
        />
      </div>

      {/* Deep vignette darken so the logo has contrast */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(6,8,15,0.35) 0%, rgba(6,8,15,0.92) 85%)",
        }}
      />

      {/* Center column */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--cream)" }}
        >
          <LogoMark className="h-20 md:h-28 w-auto drop-shadow-[0_0_30px_rgba(0,81,255,0.25)]" />
        </motion.div>

        <div className="w-24 md:w-32 mt-10">
          <div
            className="relative h-[1px] w-full overflow-hidden rounded-full"
            style={{ background: "rgba(244,245,248,0.1)" }}
          >
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ background: "rgba(244,245,248,0.65)" }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.15, ease: "linear" }}
            />
          </div>
          <div
            className="mt-3 flex justify-center font-mono text-[10px] tracking-[0.22em]"
            style={{ color: "rgba(244,245,248,0.4)" }}
          >
            {String(pct).padStart(3, "0")}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
