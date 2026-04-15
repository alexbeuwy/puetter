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
      style={{ height: "400vh", background: "var(--white)" }}
    >
      <div
        className="sticky top-0 h-[100vh] overflow-hidden flex items-center"
        style={{ background: "var(--white)" }}
      >
        {/* Asymmetric grid layout */}
        <div className="relative w-full h-full mx-auto max-w-[1400px] grid grid-cols-12 gap-6 px-10">
          {/* Left side: vertical label + number */}
          <div className="col-span-3 flex flex-col justify-between py-20">
            <div>
              <span className="eyebrow">Vom Brett zum Floß</span>
              <h2 className="h2 font-serif mt-4 leading-[1.05]">
                Vier Stationen.
                <br />
                <span className="font-serif-italic">Eine Richtung.</span>
              </h2>
            </div>

            {/* Progress dots */}
            <div className="flex flex-col gap-4">
              {SLIDES.map((s, i) => (
                <button
                  key={s.src}
                  aria-label={`Slide ${i + 1}`}
                  className="group flex items-center gap-4 text-left"
                >
                  <span
                    className="relative w-8 h-8 flex items-center justify-center"
                    aria-hidden
                  >
                    <span
                      className="absolute inset-0 rounded-full border"
                      style={{
                        borderColor:
                          i === active ? "var(--wood)" : "var(--rope)",
                        background:
                          i === active ? "var(--wood)" : "transparent",
                        transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                    <span
                      className="relative text-[11px] font-medium"
                      style={{
                        color: i === active ? "var(--white)" : "var(--rope)",
                      }}
                    >
                      0{i + 1}
                    </span>
                  </span>
                  <span
                    className="text-sm tracking-wide"
                    style={{
                      color: i === active ? "var(--text)" : "var(--text-muted)",
                      transition: "color 300ms ease",
                    }}
                  >
                    {s.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right side: image stack */}
          <div className="col-span-9 relative h-full flex items-center">
            <div
              className="relative w-full h-[82vh] overflow-hidden"
              style={{
                borderRadius: 40,
                boxShadow:
                  "0 60px 120px -40px rgba(92,61,46,0.4), inset 0 1px 0 rgba(245,237,216,0.4)",
              }}
            >
              {SLIDES.map((s, i) => (
                <motion.div
                  key={s.src}
                  className="absolute inset-0"
                  animate={{
                    opacity: i === active ? 1 : 0,
                    scale: i === active ? 1 : 1.04,
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={s.src}
                    alt={s.title}
                    fill
                    priority={i === 0}
                    sizes="66vw"
                    style={{ objectFit: "cover" }}
                  />
                </motion.div>
              ))}

              {/* Subtle gradient for text legibility */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(44,32,21,0.25) 100%)",
                }}
              />

              {/* Text overlay — bottom right */}
              <div className="absolute right-8 bottom-8 max-w-[420px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="p-7 rounded-3xl backdrop-blur-md"
                    style={{
                      background: "rgba(245,237,216,0.92)",
                      border: "1px solid rgba(196,168,130,0.4)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[11px] tracking-widest uppercase"
                        style={{ color: "var(--wood)" }}
                      >
                        {SLIDES[active].title}
                      </span>
                      <span
                        className="w-8 h-[1px]"
                        style={{ background: "var(--rope)" }}
                      />
                    </div>
                    <p
                      className="font-serif-italic"
                      style={{
                        fontSize: 22,
                        lineHeight: 1.35,
                        color: "var(--text)",
                      }}
                    >
                      {SLIDES[active].body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Top-left progress bar */}
              <div className="absolute top-8 left-8 right-8 flex items-center gap-3">
                <div
                  className="relative h-[2px] flex-1 overflow-hidden rounded-full"
                  style={{ background: "rgba(245,237,216,0.4)" }}
                >
                  <motion.div
                    className="absolute left-0 top-0 h-full"
                    style={{
                      background: "var(--cream)",
                      width: `${progress * 100}%`,
                    }}
                  />
                </div>
                <span
                  className="text-[11px] tracking-widest uppercase"
                  style={{ color: "var(--cream)" }}
                >
                  0{active + 1} / 04
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
