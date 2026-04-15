"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FadeIn from "./FadeIn";

export default function FinalCTA() {
  return (
    <section
      className="relative py-40 md:py-52 px-6 md:px-10 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--cream) 0%, var(--sand) 100%)",
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/raft/Yacht2.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.4 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(245,237,216,0.75)" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-start-2 md:col-span-9">
          <FadeIn>
            <h2
              className="font-serif-italic leading-[1.02] max-w-[18ch]"
              style={{ fontSize: "clamp(52px, 8vw, 104px)" }}
            >
              Die Bretter sind da.
              <br />
              <span className="font-serif" style={{ color: "var(--wood)" }}>
                Wann baust du das Floß?
              </span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p
              className="mt-10 max-w-[52ch]"
              style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.7 }}
            >
              Kein Wecker. Kein Kaltanruf mehr. Kein Hoffen auf den nächsten
              Monat.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <motion.a
                href="mailto:hallo@puetter.de?subject=Gespr%C3%A4chsanfrage"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="inline-flex items-center gap-3 rounded-full"
                style={{
                  background: "var(--wood)",
                  color: "var(--white)",
                  padding: "18px 40px",
                  fontSize: 17,
                  fontWeight: 500,
                  boxShadow: "0 30px 60px -20px rgba(92,61,46,0.5)",
                }}
              >
                Gespräch anfragen
                <span
                  className="inline-flex w-7 h-7 rounded-full items-center justify-center"
                  style={{ background: "rgba(245,237,216,0.2)" }}
                >
                  →
                </span>
              </motion.a>
              <div
                className="text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                kostenlos · unverbindlich · max. 30 Min
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.35}>
            <p
              className="mt-8 max-w-[52ch] text-sm"
              style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
            >
              Kein Sales-Druck. Kein Skript. Wenn's passt, reden wir weiter.
              Wenn nicht, weißt du trotzdem mehr als vorher.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
