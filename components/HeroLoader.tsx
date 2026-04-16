"use client";

import { motion } from "framer-motion";
import LogoMark from "./LogoMark";

type Props = {
  loaded: number;
  total: number;
};

/**
 * Water-themed opening sequence. Uses the raft metaphor:
 *   - A blurred, frosted-glass ocean surface fills the screen
 *   - The Pütter mark floats at center, reflected below
 *   - A subtle horizontal ripple line shimmers across
 *   - On exit, the surface splits vertically like parting water
 *     (left slides left, right slides right) with a blur-out
 *     revealing the first frame of the hero sequence underneath.
 */
export default function HeroLoader({ loaded, total }: Props) {
  const pct = total > 0 ? Math.min(100, Math.round((loaded / total) * 100)) : 0;

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      {/* ── LEFT CURTAIN (water surface) ── */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 w-1/2 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #2a5c58 0%, #3a7d76 35%, #7DD8D0 65%, #a8e8e2 100%)",
        }}
        initial={{ x: 0 }}
        exit={{ x: "-100%", filter: "blur(20px)" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Animated ripple lines */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(255,255,255,0.07) 48px, rgba(255,255,255,0.07) 49px)",
          }}
          animate={{ y: [0, -48] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        {/* Caustic shimmer */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 200% 100% at 60% 50%, rgba(125,216,208,0.35) 0%, transparent 60%)",
          }}
          animate={{ x: ["-30%", "30%"] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* ── RIGHT CURTAIN (water surface) ── */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 w-1/2 overflow-hidden"
        style={{
          background:
            "linear-gradient(225deg, #2a5c58 0%, #3a7d76 35%, #7DD8D0 65%, #a8e8e2 100%)",
        }}
        initial={{ x: 0 }}
        exit={{ x: "100%", filter: "blur(20px)" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(255,255,255,0.07) 48px, rgba(255,255,255,0.07) 49px)",
          }}
          animate={{ y: [0, -48] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* ── CENTER: frosted glass card with logo ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Glassmorphism card with rotating gradient glow */}
        <motion.div
          className="relative flex flex-col items-center gap-8 px-16 py-14 md:px-24 md:py-20 rounded-[36px] glow-border"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.25), 0 40px 80px -30px rgba(0,50,50,0.5)",
          }}
        >
          {/* Logo mark — large, truly centered */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex items-center justify-center"
            style={{ color: "var(--cream)" }}
          >
            <LogoMark className="h-24 md:h-32 w-auto drop-shadow-lg" />
          </motion.div>

          {/* Reflected mark (mirrored, faded) */}
          <div
            className="opacity-15"
            style={{
              transform: "scaleY(-1) translateY(12px)",
              color: "var(--cream)",
              filter: "blur(3px)",
              maskImage:
                "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 70%)",
              WebkitMaskImage:
                "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 70%)",
            }}
          >
            <LogoMark className="h-24 md:h-32 w-auto" />
          </div>

          {/* Progress */}
          <div className="w-40 md:w-56 mt-1">
            <div
              className="relative h-[1.5px] w-full overflow-hidden rounded-full"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{ background: "rgba(245,237,216,0.7)" }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.2, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.span
          className="mt-8 text-[10px] tracking-[0.35em] uppercase font-mono"
          style={{ color: "rgba(245,237,216,0.55)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Operator · nicht Berater
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
