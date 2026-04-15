"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

export default function DreamState() {
  return (
    <section
      className="relative py-40 md:py-48 px-6 md:px-10 overflow-hidden"
      style={{ background: "var(--sky)" }}
    >
      {/* Soft sun blob top-right */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(245,237,216,0.7) 0%, rgba(197,232,229,0) 65%)",
          filter: "blur(20px)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-start-4 md:col-span-8">
          <FadeIn>
            <span
              className="eyebrow"
              style={{ background: "var(--cream)", color: "var(--wood)" }}
            >
              So sieht die andere Seite aus
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="h2 font-serif mb-14 max-w-[22ch]">
              Montag, 9 Uhr.
              <br />
              <span className="font-serif-italic">
                Kein Wecker. Kein Pitch. Keine Hoffnung.
              </span>
            </h2>
          </FadeIn>

          <div className="max-w-[58ch] space-y-8" style={{ lineHeight: 1.8 }}>
            <FadeIn delay={0.15}>
              <p>
                Du öffnest dein Laptop.
                <br />
                <strong>Drei Anfragen seit Freitag.</strong> Alle qualifiziert.
              </p>
            </FadeIn>

            <FadeIn delay={0.22}>
              <p>Eine davon genau das Projekt, für das du brennst.</p>
            </FadeIn>

            <FadeIn delay={0.28}>
              <p>
                Du buchst das Gespräch. Nicht weil du musst — sondern weil du
                willst.
              </p>
            </FadeIn>

            <FadeIn delay={0.34}>
              <p>
                Der Kunde hat dich gefunden. Hat sich vorbereitet. Kommt mit
                Entscheidungsmacht. Kein Ghosting, kein{" "}
                <em>ich muss das noch mit jemandem besprechen</em>, kein
                Preisdumping.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p>
                Das ist nicht Glück.
                <br />
                Das ist ein System.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.5}>
            <p className="pull-quote mt-16 max-w-[22ch]">
              Ein System, das für dich arbeitet.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
