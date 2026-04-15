"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";

const LINKS = [
  { href: "#ueber-mich", label: "Über mich" },
  { href: "#system", label: "Das System" },
  { href: "#referenzen", label: "Referenzen" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-6 px-4"
    >
      <motion.div
        animate={{ scale: scrolled ? 0.94 : 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "rgba(245,237,216,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(196,168,130,0.3)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
        className="flex items-center gap-1 md:gap-2 rounded-full pl-5 pr-2 py-2 max-w-fit"
      >
        <a
          href="#top"
          className="font-serif-italic text-text text-lg mr-2 md:mr-4"
        >
          Pütter
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm text-text hover:text-wood transition-colors rounded-full"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="ml-1 px-5 py-2 text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
            style={{
              background: "var(--wood)",
              color: "var(--white)",
            }}
          >
            Gespräch anfragen
          </a>
        </div>

        {/* Mobile: Vaul drawer */}
        <Drawer.Root direction="right">
          <Drawer.Trigger asChild>
            <button
              aria-label="Menu öffnen"
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full"
              style={{ background: "var(--wood)" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--white)"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay
              className="fixed inset-0 z-[59]"
              style={{ background: "rgba(44,32,21,0.45)", backdropFilter: "blur(4px)" }}
            />
            <Drawer.Content
              className="fixed right-0 top-0 bottom-0 z-[60] flex flex-col outline-none w-full sm:w-[420px]"
              style={{ background: "var(--cream)" }}
            >
              <Drawer.Title className="sr-only">Navigation</Drawer.Title>
              <Drawer.Description className="sr-only">
                Hauptnavigation von Pütter
              </Drawer.Description>
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-16">
                  <span
                    className="font-serif-italic text-2xl"
                    style={{ color: "var(--wood)" }}
                  >
                    Pütter
                  </span>
                  <Drawer.Close asChild>
                    <button
                      aria-label="Menu schließen"
                      className="w-11 h-11 flex items-center justify-center rounded-full"
                      style={{ background: "var(--wood)" }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--white)"
                        strokeWidth="2"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </Drawer.Close>
                </div>

                <div className="flex flex-col gap-6">
                  {LINKS.map((l, i) => (
                    <Drawer.Close asChild key={l.href}>
                      <motion.a
                        href={l.href}
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          delay: 0.08 + i * 0.06,
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="font-serif-italic text-5xl leading-[1.1]"
                        style={{ color: "var(--text)" }}
                      >
                        {l.label}
                      </motion.a>
                    </Drawer.Close>
                  ))}
                </div>

                <div className="mt-auto pt-12">
                  <Drawer.Close asChild>
                    <a
                      href="#kontakt"
                      className="block w-full text-center px-6 py-4 rounded-full"
                      style={{
                        background: "var(--wood)",
                        color: "var(--white)",
                      }}
                    >
                      Gespräch anfragen →
                    </a>
                  </Drawer.Close>
                  <div
                    className="mt-4 text-center text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Kostenlos · Unverbindlich · Max. 30 Min
                  </div>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </motion.div>
    </motion.nav>
  );
}
