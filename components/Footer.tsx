"use client";

import Logo from "./Logo";

export default function Footer() {
  return (
    <footer
      className="relative px-6 md:px-10 py-20"
      style={{ background: "var(--wood)", color: "var(--cream)" }}
    >
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <a
            href="#top"
            aria-label="Pütter — zur Startseite"
            className="inline-flex items-center transition-opacity hover:opacity-80"
            style={{ color: "var(--cream)" }}
          >
            <Logo className="h-9 w-auto" />
          </a>
          <p
            className="mt-6 max-w-[36ch] text-sm"
            style={{ color: "var(--rope)", lineHeight: 1.7 }}
          >
            Planbar Kunden gewinnen. Klare Richtung. Ein System, das trägt.
            Seit 2017.
          </p>
        </div>

        <div className="md:col-span-3">
          <div
            className="text-[11px] tracking-[0.2em] uppercase mb-5"
            style={{ color: "var(--rope)" }}
          >
            Navigation
          </div>
          <ul className="space-y-3 text-sm">
            {[
              ["#ueber-mich", "Über mich"],
              ["#system", "Das System"],
              ["#referenzen", "Referenzen"],
              ["#kontakt", "Gespräch anfragen"],
            ].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="transition-opacity hover:opacity-70"
                  style={{ color: "var(--cream)" }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <div
            className="text-[11px] tracking-[0.2em] uppercase mb-5"
            style={{ color: "var(--rope)" }}
          >
            Rechtliches
          </div>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="/impressum"
                className="transition-opacity hover:opacity-70"
                style={{ color: "var(--cream)" }}
              >
                Impressum
              </a>
            </li>
            <li>
              <a
                href="/datenschutz"
                className="transition-opacity hover:opacity-70"
                style={{ color: "var(--cream)" }}
              >
                Datenschutz
              </a>
            </li>
            <li>
              <a
                href="mailto:hallo@puetter.de"
                className="transition-opacity hover:opacity-70"
                style={{ color: "var(--cream)" }}
              >
                hallo@puetter.de
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="mx-auto max-w-[1400px] mt-20 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
        style={{
          borderTop: "1px solid rgba(196,168,130,0.2)",
          color: "var(--rope)",
        }}
      >
        <span>© 2025 Pütter.de — Alle Rechte vorbehalten.</span>
        <span className="font-serif-italic">Mit ruhiger Hand gebaut.</span>
      </div>
    </footer>
  );
}
