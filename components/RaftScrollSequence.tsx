"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollProgress } from "@/hooks/useScrollProgress";

type Slide = {
  src: string;
  title: string;
  body: string;
};

const SLIDES: Slide[] = [
  {
    src: "/raft/bild1.jpg",
    title: "Ausgangspunkt",
    body: "Skills ohne System. Talent ohne Richtung. Du kennst das Gefühl.",
  },
  {
    src: "/raft/bild2.jpg",
    title: "Bewegung",
    body: "Du bist schon weiter als die meisten. Du schwimmst. Aber irgendwie treibst du noch.",
  },
  {
    src: "/raft/bild3.jpg",
    title: "Richtung",
    body: "Positionierung ist nicht was du machst. Es ist wohin du willst — und für wen du unersetzbar bist.",
  },
  {
    src: "/raft/bild4.jpg",
    title: "Geschwindigkeit",
    body: "Wenn die Richtung stimmt, macht Geschwindigkeit Sinn. Vorher ist es nur schneller verloren.",
  },
];

function slideIndexFromProgress(p: number) {
  if (p < 0.2) return 0;
  if (p < 0.45) return 1;
  if (p < 0.7) return 2;
  return 3;
}

export default function RaftScrollSequence() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(containerRef);
  const active = slideIndexFromProgress(progress);

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

        <div className="flex flex-col gap-12 max-w-[680px] mx-auto">
          {SLIDES.map((s, i) => (
            <motion.div
              key={s.src}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div
                className="relative overflow-hidden"
                style={{ borderRadius: 20 }}
              >
                <Image
                  src={s.src}
                  alt={s.title}
                  width={1200}
                  height={1400}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span
                  className="font-serif-italic text-2xl"
                  style={{ color: "var(--wood)" }}
                >
                  0{i + 1}
                </span>
                <h3 className="font-serif text-2xl">{s.title}</h3>
              </div>
              <p
                className="mt-2 text-base"
                style={{ color: "var(--text-muted)" }}
              >
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="system"
      ref={containerRef}
      className="relative"
      style={{ height: "400vh", background: "var(--wood)" }}
    >
      <div
        className="sticky top-0 w-screen h-[100dvh] overflow-hidden"
        style={{ background: "var(--wood)" }}
      >
        {/* Image stack — edge to edge, fullframe */}
        {SLIDES.map((s, i) => (
          <motion.div
            key={s.src}
            className="absolute inset-0"
            animate={{
              opacity: i === active ? 1 : 0,
              scale: i === active ? 1 : 1.06,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={s.src}
              alt={s.title}
              fill
              priority={i === 0}
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        ))}

        {/* Legibility gradient — stronger, covers top and bottom edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(44,32,21,0.55) 0%, rgba(44,32,21,0.05) 25%, rgba(44,32,21,0.05) 55%, rgba(44,32,21,0.65) 100%)",
          }}
        />

        {/* Top bar: eyebrow + progress + counter */}
        <div className="absolute top-0 left-0 right-0 px-8 md:px-14 pt-10 flex items-center gap-6">
          <span
            className="text-[11px] tracking-[0.2em] uppercase flex-shrink-0"
            style={{ color: "rgba(245,237,216,0.75)" }}
          >
            Vom Brett zum Floß
          </span>
          <div
            className="relative h-[2px] flex-1 overflow-hidden rounded-full"
            style={{ background: "rgba(245,237,216,0.2)" }}
          >
            <motion.div
              className="absolute left-0 top-0 h-full"
              style={{
                background: "var(--cream)",
                width: `${progress * 100}%`,
              }}
              transition={{ ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <span
            className="font-mono text-[11px] tracking-[0.15em] flex-shrink-0"
            style={{ color: "var(--cream)" }}
          >
            0{active + 1} / 04
          </span>
        </div>

        {/* Left: vertical progress dots — absolute, vertically centered */}
        <div className="absolute left-8 md:left-14 top-1/2 -translate-y-1/2 flex flex-col gap-5">
          {SLIDES.map((s, i) => (
            <div
              key={s.src}
              className="group flex items-center gap-4"
              aria-label={`Slide ${i + 1}: ${s.title}`}
            >
              <span
                className="relative w-9 h-9 flex items-center justify-center flex-shrink-0"
                aria-hidden
              >
                <span
                  className="absolute inset-0 rounded-full border backdrop-blur-sm"
                  style={{
                    borderColor:
                      i === active
                        ? "var(--cream)"
                        : "rgba(245,237,216,0.4)",
                    background:
                      i === active ? "var(--cream)" : "rgba(44,32,21,0.35)",
                    transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
                <span
                  className="relative text-[11px] font-medium"
                  style={{
                    color:
                      i === active ? "var(--wood)" : "rgba(245,237,216,0.85)",
                    transition: "color 400ms ease",
                  }}
                >
                  0{i + 1}
                </span>
              </span>
              <span
                className="text-sm tracking-wide hidden lg:inline"
                style={{
                  color:
                    i === active
                      ? "var(--cream)"
                      : "rgba(245,237,216,0.45)",
                  transition: "color 400ms ease",
                }}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Headline — top-left area, large editorial */}
        <div className="absolute top-28 md:top-32 left-8 md:left-32 max-w-[520px] pr-8">
          <h2
            className="h2 font-serif leading-[1.02]"
            style={{ color: "var(--cream)" }}
          >
            Vier Stationen.
            <br />
            <span className="font-serif-italic">Eine Richtung.</span>
          </h2>
        </div>

        {/* Caption overlay — bottom-right, generous */}
        <div className="absolute right-8 md:right-14 bottom-14 md:bottom-16 max-w-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 md:p-10 rounded-[28px] backdrop-blur-xl"
              style={{
                background: "rgba(245,237,216,0.92)",
                border: "1px solid rgba(196,168,130,0.4)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.5), 0 50px 100px -40px rgba(0,0,0,0.5)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-[11px] tracking-[0.2em] uppercase"
                  style={{ color: "var(--wood)" }}
                >
                  {SLIDES[active].title}
                </span>
                <span
                  className="w-10 h-[1px]"
                  style={{ background: "var(--rope)" }}
                />
                <span
                  className="font-mono text-[11px]"
                  style={{ color: "var(--rope)" }}
                >
                  0{active + 1}
                </span>
              </div>
              <p
                className="font-serif-italic"
                style={{
                  fontSize: "clamp(22px, 2.2vw, 28px)",
                  lineHeight: 1.35,
                  color: "var(--text)",
                }}
              >
                {SLIDES[active].body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll hint — bottom-left, subtle */}
        <div className="absolute bottom-10 left-8 md:left-14 hidden md:flex items-center gap-3">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8"
            style={{ background: "rgba(245,237,216,0.5)" }}
          />
          <span
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "rgba(245,237,216,0.5)" }}
          >
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
