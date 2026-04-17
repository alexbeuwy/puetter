"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FadeIn from "./FadeIn";

const DREAM_POINTS = [
  {
    icon: "https://beuwy.com/wp-content/uploads/2025/11/Audit-Lupe-uai-258x258.webp",
    text: "Drei Anfragen seit Freitag. Alle qualifiziert.",
  },
  {
    icon: "https://beuwy.com/wp-content/uploads/2025/11/Audit-Lupe-uai-258x258.webp",
    text: "Der Kunde hat dich gefunden. Hat sich vorbereitet.",
  },
  {
    icon: "https://beuwy.com/wp-content/uploads/2025/11/Audit-Lupe-uai-258x258.webp",
    text: "Kein Ghosting. Kein Preisdumping. Entscheidungsmacht.",
  },
];

export default function DreamState() {
  return (
    <section
      className="relative py-28 md:py-40 px-6 md:px-10 overflow-hidden"
      style={{ background: "var(--sky)" }}
    >
      {/* Soft glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(244,245,248,0.6) 0%, rgba(232,234,240,0) 65%)",
          filter: "blur(20px)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="md:col-start-2 md:col-span-8">
            <FadeIn>
              <span
                className="eyebrow"
                style={{ background: "var(--cream)" }}
              >
                So sieht die andere Seite aus
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="h2 font-serif max-w-[22ch]">
                Montag, 9 Uhr.
                <br />
                <span className="font-serif-italic" style={{ color: "var(--wood)" }}>
                  Kein Wecker. Kein Pitch. Keine Hoffnung.
                </span>
              </h2>
            </FadeIn>
          </div>
        </div>

        {/* Two-column: narrative left, dream points right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Left: short narrative */}
          <div className="md:col-start-2 md:col-span-5">
            <FadeIn delay={0.15}>
              <p
                className="text-lg md:text-xl leading-relaxed mb-6"
                style={{ color: "var(--text)" }}
              >
                Du öffnest dein Laptop. Eine davon genau das Projekt, für das du
                brennst. Du buchst das Gespräch — nicht weil du musst, sondern
                weil du willst.
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p
                className="font-serif-italic"
                style={{
                  fontSize: "clamp(24px, 3vw, 36px)",
                  lineHeight: 1.2,
                  color: "var(--text)",
                  borderLeft: "4px solid var(--wood)",
                  paddingLeft: 20,
                }}
              >
                Das ist nicht Glück.
                <br />
                Das ist Infrastruktur.
              </p>
            </FadeIn>
          </div>

          {/* Right: dream point cards */}
          <div className="md:col-span-5 space-y-4">
            {DREAM_POINTS.map((p, i) => (
              <motion.div
                key={p.text}
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{
                  background: "rgba(244,245,248,0.5)",
                  border: "1px solid rgba(140,146,160,0.3)",
                }}
              >
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ background: "var(--cream)" }}
                >
                  <Image
                    src={p.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="w-8 h-8 object-contain"
                    unoptimized
                  />
                </div>
                <p
                  className="text-sm md:text-base leading-snug pt-1"
                  style={{ color: "var(--text)" }}
                >
                  {p.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
