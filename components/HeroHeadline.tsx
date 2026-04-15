"use client";

import { useEffect, useRef } from "react";

/**
 * GSAP + Splitting.js powered headline reveal.
 * ISOLATED client component — no Framer Motion inside.
 * Char-by-char cascade with scroll-safe cleanup.
 */
export default function HeroHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    let mounted = true;

    (async () => {
      const [{ default: gsap }, { default: Splitting }] = await Promise.all([
        import("gsap"),
        import("splitting"),
      ]);

      if (!mounted || !ref.current) return;

      // Splitting.js tags each word/char with data-attrs
      Splitting({ target: ref.current, by: "chars" });

      const chars = ref.current.querySelectorAll(".char");
      if (!chars.length) return;

      ctx = gsap.context(() => {
        gsap.set(chars, { y: "0.6em", opacity: 0, rotateZ: -2 });
        gsap.to(chars, {
          y: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 1.1,
          stagger: 0.018,
          ease: "expo.out",
          delay: 0.15,
        });
      }, ref);
    })();

    return () => {
      mounted = false;
      ctx?.revert();
    };
  }, []);

  return (
    <h1
      ref={ref}
      className="h1 font-serif text-left max-w-[14ch]"
      style={{ perspective: 800 }}
    >
      <span className="block font-serif-italic">Du hast genug Bretter.</span>
      <span className="block" style={{ color: "var(--wood)" }}>
        Zeit, ein Floß draus zu bauen.
      </span>
    </h1>
  );
}
