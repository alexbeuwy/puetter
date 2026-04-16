"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import TiltCard from "./TiltCard";

const NOT_FOR = [
  "Du suchst Abkürzung ohne Arbeit",
  "Du glaubst ein besseres Logo reicht",
  "Du kannst keine Entscheidungen treffen",
];

const FOR = [
  "Du weißt, dass du mehr draufhast",
  "Du stellst Klarheit über Komfort",
  "Du willst planbar wachsen — nicht viral",
];

export default function Disqualifier() {
  return (
    <section
      className="relative py-28 md:py-40 px-6 md:px-10"
      style={{ background: "var(--cream)" }}
    >
      <div className="relative mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="md:col-start-2 md:col-span-8">
            <FadeIn>
              <span className="eyebrow">Bevor du anfragst</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="h2 font-serif max-w-[24ch]">
                Ich nehme maximal{" "}
                <span className="font-serif-italic">vier</span> neue Kunden pro
                Quartal.
                <br />
                <span
                  className="font-serif-italic"
                  style={{ color: "var(--wood)" }}
                >
                  Und ich sage regelmäßig Nein.
                </span>
              </h2>
            </FadeIn>
          </div>
        </div>

        {/* Two glass cards side by side — tilt on hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 md:px-8">
          {/* NOT FOR YOU — muted, dark accent */}
          <TiltCard max={4} scale={1.005} className="rounded-3xl">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 md:p-10 rounded-3xl h-full"
              style={{
                background: "var(--white)",
                border: "1px solid rgba(196,168,130,0.3)",
                boxShadow:
                  "0 30px 60px -20px rgba(92,61,46,0.12)",
              }}
            >
              {/* Red accent glow */}
              <div
                aria-hidden
                className="absolute top-0 left-0 w-40 h-40 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(196,120,100,0.12) 0%, transparent 70%)",
                  transform: "translate(-30%, -30%)",
                }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <span
                    className="w-8 h-[1px]"
                    style={{ background: "var(--rope)" }}
                  />
                  <span
                    className="text-[11px] tracking-widest uppercase font-medium"
                    style={{ color: "var(--rope)" }}
                  >
                    Nicht für dich
                  </span>
                </div>

                <ul className="space-y-6">
                  {NOT_FOR.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: 0.15 + i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-start gap-4"
                    >
                      <span
                        className="mt-[10px] w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: "var(--rope)" }}
                      />
                      <span
                        className="font-serif text-lg md:text-xl leading-snug"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </TiltCard>

          {/* FOR YOU — bright, accent glow */}
          <TiltCard max={4} scale={1.005} className="rounded-3xl">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative p-8 md:p-10 rounded-3xl h-full"
              style={{
                background: "var(--wood)",
                border: "1px solid rgba(196,168,130,0.2)",
                boxShadow:
                  "0 30px 60px -20px rgba(92,61,46,0.25)",
              }}
            >
              {/* Teal accent glow */}
              <div
                aria-hidden
                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(125,216,208,0.15) 0%, transparent 70%)",
                  transform: "translate(25%, -25%)",
                }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <span
                    className="w-8 h-[1px]"
                    style={{ background: "var(--water)" }}
                  />
                  <span
                    className="text-[11px] tracking-widest uppercase font-medium"
                    style={{ color: "var(--water)" }}
                  >
                    Für dich
                  </span>
                </div>

                <ul className="space-y-6">
                  {FOR.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ x: 20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: 0.2 + i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-start gap-4"
                    >
                      <span
                        className="mt-[10px] w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: "var(--water)" }}
                      />
                      <span
                        className="font-serif text-lg md:text-xl leading-snug"
                        style={{ color: "var(--cream)" }}
                      >
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
