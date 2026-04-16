"use client";

import { motion } from "framer-motion";
import LogoMark from "./LogoMark";

type Props = {
  loaded: number;
  total: number;
};

/**
 * Premium minimal opening. Dark/deep teal background, oversized logo
 * mark, thin progress bar. No glass card, no ripple lines, no noise.
 * On exit: everything blurs and fades, revealing the hero beneath.
 */
export default function HeroLoader({ loaded, total }: Props) {
  const pct = total > 0 ? Math.min(100, Math.round((loaded / total) * 100)) : 0;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "#1a3a38" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(16px)", scale: 1.05 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Subtle radial depth — not flat color, but barely visible */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, rgba(125,216,208,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Center column: logo + progress */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo mark — large, clean, cream on dark */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--cream)" }}
        >
          <LogoMark className="h-20 md:h-28 w-auto" />
        </motion.div>

        {/* Thin progress bar */}
        <div className="w-20 md:w-28 mt-10">
          <div
            className="relative h-[1px] w-full overflow-hidden rounded-full"
            style={{ background: "rgba(245,237,216,0.12)" }}
          >
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ background: "rgba(245,237,216,0.5)" }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.15, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
