"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import FadeIn from "./FadeIn";

export default function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/.+@.+\..+/.test(email)) {
      toast.error("Das sieht nach keiner gültigen Email aus.", {
        description: "Versuch es nochmal.",
      });
      return;
    }
    setLoading(true);
    // Placeholder handoff — replace with real endpoint later.
    // Simulate a short network round-trip so the toast feels earned.
    await new Promise((r) => setTimeout(r, 600));
    toast.success("PDF unterwegs.", {
      description: `Check ${email} in den nächsten Minuten.`,
      duration: 6000,
    });
    setEmail("");
    setLoading(false);
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@email.de"
              disabled={loading}
              className="flex-1 bg-transparent outline-none px-5 py-3 text-base"
              style={{ color: "var(--text)" }}
              aria-label="Email-Adresse"
            />
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className="px-5 md:px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap disabled:opacity-60"
              style={{
                background: "var(--wood)",
                color: "var(--white)",
              }}
            >
              <span className="hidden sm:inline">
                {loading ? "Sende…" : "Floß-Analyse herunterladen "}
              </span>
              <span className="sm:hidden">
                {loading ? "Sende…" : "Herunterladen "}
              </span>
              {!loading && "→"}
            </motion.button>
          </form>
        </FadeIn>

        <FadeIn delay={0.28}>
          <p className="mt-5 text-sm" style={{ color: "var(--text-muted)" }}>
            Kein Spam. Kein Opt-in-Bullshit. Nur das PDF.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
