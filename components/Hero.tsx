"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import useMeasure from "react-use-measure";
import HeroHeadline from "./HeroHeadline";
import VoiceNote from "./VoiceNote";

const ease = [0.16, 1, 0.3, 1] as const;
const spring = { type: "spring", stiffness: 100, damping: 20 } as const;

export default function Hero() {
  // Magnetic image parallax from cursor (no useState, pure motion values)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-200, 200], [6, -6]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-200, 200], [-6, 6]), {
    stiffness: 120,
    damping: 18,
  });

  // react-use-measure — pixel-perfect bounds that update on resize/zoom
  const [measureRef, bounds] = useMeasure({ scroll: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bounds.width) return;
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    mx.set(x - bounds.width / 2);
    my.set(y - bounds.height / 2);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] overflow-hidden px-6 md:px-10 pt-36 md:pt-28 pb-20"
      style={{
        background:
          "linear-gradient(180deg, var(--sky) 0%, var(--cream) 100%)",
      }}
    >
      {/* Grain overlay — fixed, pointer-events-none, no scroll repaint */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Kinetic marquee at top */}
      <motion.div
        aria-hidden
        className="absolute top-24 md:top-28 left-0 right-0 overflow-hidden pointer-events-none select-none"
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          className="flex whitespace-nowrap font-serif-italic opacity-[0.08]"
          style={{ fontSize: "clamp(120px, 20vw, 280px)", color: "var(--wood)" }}
        >
          <span className="pr-16">Pütter · Floß bauen · Pütter · Floß bauen ·&nbsp;</span>
          <span className="pr-16">Pütter · Floß bauen · Pütter · Floß bauen ·&nbsp;</span>
        </motion.div>
      </motion.div>

      {/* Asymmetric 12-col grid: 7/5 split on desktop */}
      <div className="relative z-10 mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end min-h-[calc(100dvh-8rem)]">
        {/* Left: Copy block */}
        <div className="md:col-span-7 md:pt-24 md:pl-[4vw] flex flex-col items-start">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease }}
            className="eyebrow"
          >
            Für Selbstständige & Unternehmer
          </motion.span>

          {/* GSAP + Splitting.js powered headline — isolated client component */}
          <HeroHeadline />

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="mt-10 max-w-[52ch]"
            style={{ color: "var(--text-muted)", fontSize: 18, lineHeight: 1.7 }}
          >
            Planbar Kunden gewinnen, klare Richtung, und ein System das
            funktioniert — auch wenn du schläfst, auch wenn sich die Welt
            gerade wieder neu erfindet.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="mt-5 flex flex-wrap items-center gap-3"
            style={{ fontSize: 14, color: "var(--text-muted)" }}
          >
            <span>Seit 2017 · Operator, nicht Berater</span>
            <span className="w-1 h-1 rounded-full" style={{ background: "var(--rope)" }} />
            <span>Nur auf Empfehlung</span>
            <span className="w-1 h-1 rounded-full" style={{ background: "var(--rope)" }} />
            <span>Keine Cold Outreach, keine Ads</span>
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-10"
          >
            <MagneticButton href="#kontakt" variant="primary">
              Gespräch anfragen →
            </MagneticButton>
            <a href="#story" className="btn-ghost group">
              Die Geschichte dahinter
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
              >
                ↓
              </motion.span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="mt-8"
          >
            <VoiceNote label="30 Sek. von mir" />
          </motion.div>
        </div>

        {/* Right: Image, offset down, with parallax tilt */}
        <motion.div
          ref={measureRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          initial={{ y: 60, opacity: 0, scale: 0.94 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ...spring }}
          className="md:col-span-5 md:-mt-10 md:translate-y-16 relative"
          style={{
            perspective: 1200,
          }}
        >
          <motion.div
            style={{
              rotateX: rx,
              rotateY: ry,
              transformStyle: "preserve-3d",
            }}
            className="relative overflow-hidden"
          >
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: 32,
                boxShadow:
                  "0 50px 100px -40px rgba(92, 61, 46, 0.35), inset 0 1px 0 rgba(245,237,216,0.4)",
              }}
            >
              <Image
                src="/raft/bild1.jpg"
                alt="Bretter am Ufer"
                width={1400}
                height={1700}
                priority
                sizes="(max-width: 768px) 100vw, 42vw"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>

            {/* Floating status chip */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, ...spring }}
              className="absolute -left-6 bottom-10 flex items-center gap-3 px-4 py-3 rounded-full backdrop-blur-md"
              style={{
                background: "rgba(245,237,216,0.9)",
                border: "1px solid rgba(196,168,130,0.35)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--water)" }}
              />
              <span className="text-xs font-medium" style={{ color: "var(--wood)" }}>
                Arbeit auf Empfehlung, seit 2017
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10"
          style={{ background: "var(--rope)" }}
        />
      </motion.div>
    </section>
  );
}

function MagneticButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={variant === "primary" ? "btn-primary" : "btn-ghost"}
    >
      {children}
    </motion.a>
  );
}
