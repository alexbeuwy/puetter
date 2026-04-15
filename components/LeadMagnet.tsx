"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import FadeIn from "./FadeIn";

export default function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/.+@.+\..+/.test(email)) {
      setStatus("error");
      return;
    }
    // Placeholder handoff — replace with real endpoint later
    setStatus("sent");
    setEmail("");
  };

  return (
    <section
      className="relative py-32 px-6 md:px-10 overflow-hidden"
      style={{ background: "var(--sky)" }}
    >
      <div className="relative mx-auto max-w-[720px] text-center">
        <FadeIn>
          <span className="eyebrow" style={{ background: "var(--cream)" }}>
            Noch nicht bereit?
          </span>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="h2 font-serif mb-6">
            Dann fang hier an.
            <br />
            <span className="font-serif-italic">Kostenlos.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p
            className="mb-10 max-w-[52ch] mx-auto"
            style={{ color: "var(--text)", lineHeight: 1.7 }}
          >
            Die Floß-Analyse: ein kurzes PDF, das dir zeigt, wo dein System
            heute steht — und welches Brett als nächstes ins Wasser muss.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <form
            onSubmit={onSubmit}
            className="relative mx-auto max-w-[520px] flex items-center p-1.5"
            style={{
              background: "var(--white)",
              border: "1px solid rgba(196,168,130,0.6)",
              borderRadius: 999,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus("idle");
              }}
              placeholder="deine@email.de"
              className="flex-1 bg-transparent outline-none px-5 py-3 text-base"
              style={{ color: "var(--text)" }}
              aria-label="Email-Adresse"
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              className="px-5 md:px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap"
              style={{
                background: "var(--wood)",
                color: "var(--white)",
              }}
            >
              <span className="hidden sm:inline">Floß-Analyse herunterladen </span>
              <span className="sm:hidden">Herunterladen </span>→
            </motion.button>
          </form>
        </FadeIn>

        <FadeIn delay={0.28}>
          <p
            className="mt-5 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {status === "sent"
              ? "Danke — check dein Postfach in den nächsten Minuten."
              : status === "error"
              ? "Bitte gib eine gültige Email-Adresse ein."
              : "Kein Spam. Kein Opt-in-Bullshit. Nur das PDF."}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
