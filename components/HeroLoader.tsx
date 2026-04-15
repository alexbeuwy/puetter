"use client";

import { motion } from "framer-motion";
import Logo from "./Logo";

type Props = {
  loaded: number;
  total: number;
};

/**
 * Opening sequence for the hero. Wood-full-bleed with centered
 * logo and a frame-load counter. On exit, two halves slide apart
 * like a gate opening — revealing the scroll sequence underneath.
 *
 * Mount/unmount is handled by the parent via AnimatePresence.
 */
export default function HeroLoader({ loaded, total }: Props) {
  const pct = total > 0 ? Math.min(100, Math.round((loaded / total) * 100)) : 0;

  const gateEase = [0.76, 0, 0.24, 1] as const;

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      {/* Top half of the gate */}
      <motion.div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "50%",
          background: "var(--wood)",
          borderBottom: "1px solid rgba(245, 237, 216, 0.14)",
        }}
        initial={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 1.2, ease: gateEase }}
      />

      {/* Bottom half of the gate */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "50%",
          background: "var(--wood)",
          borderTop: "1px solid rgba(245, 237, 216, 0.14)",
        }}
        initial={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 1.2, ease: gateEase }}
      />

      {/* Logo + progress centered, exits before the gates open */}
      <motion.div
        className="relative z-10 h-full w-full flex flex-col items-center justify-center gap-10 px-6"
        style={{ color: "var(--cream)" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.08 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo pulse */}
        <motion.div
          animate={{ scale: [1, 1.035, 1] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex items-center justify-center"
        >
          <Logo className="h-8 md:h-11 w-auto" />
        </motion.div>

        {/* Progress strip */}
        <div className="w-48 md:w-64">
          <div
            className="relative h-[2px] w-full overflow-hidden rounded-full"
            style={{ background: "rgba(245,237,216,0.14)" }}
          >
            <motion.div
              className="absolute left-0 top-0 h-full"
              style={{ background: "var(--cream)" }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.25, ease: "linear" }}
            />
          </div>
          <div
            className="mt-3 flex items-center justify-between text-[10px] tracking-[0.22em] uppercase"
            style={{ color: "rgba(245,237,216,0.55)" }}
          >
            <span>Vorbereitung</span>
            <span className="font-mono">
              {String(pct).padStart(3, "0")}%
            </span>
          </div>
        </div>

        {/* Subtle tagline */}
        <motion.div
          className="absolute bottom-10 left-0 right-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase font-mono"
            style={{ color: "rgba(245,237,216,0.35)" }}
          >
            Operator · nicht Berater
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
