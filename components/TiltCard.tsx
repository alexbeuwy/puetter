"use client";

import { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
};

/**
 * Physical 3D tilt wrapper using VanillaTilt.
 * Loads lazily client-side, cleans up on unmount.
 */
export default function TiltCard({
  children,
  className,
  max = 6,
  scale = 1.01,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let destroyed = false;
    let instance: { destroy: () => void } | null = null;

    import("vanilla-tilt").then((mod) => {
      if (destroyed || !el) return;
      const VanillaTilt = (mod as unknown as { default: { init: (el: HTMLElement, opts: object) => void } }).default;
      VanillaTilt.init(el, {
        max,
        speed: 600,
        glare: true,
        "max-glare": 0.15,
        scale,
        perspective: 1200,
        "full-page-listening": false,
        reset: true,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
      instance = (el as unknown as { vanillaTilt: { destroy: () => void } }).vanillaTilt;
    });

    return () => {
      destroyed = true;
      instance?.destroy();
    };
  }, [max, scale]);

  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}
