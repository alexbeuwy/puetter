"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  city: string;
};

export default function TestimonialCarousel({
  items,
}: {
  items: Testimonial[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true })],
  );

  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollTo = (i: number) => emblaApi?.scrollTo(i);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((t, i) => (
            <div
              key={i}
              className="min-w-0 flex-[0_0_100%] md:flex-[0_0_72%] pr-10"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 32 32"
                fill="none"
                stroke="var(--rope)"
                strokeWidth="1.5"
                className="mb-5"
              >
                <path d="M10 22 C6 22 4 19 4 15 C4 10 8 6 14 6" />
                <path d="M24 22 C20 22 18 19 18 15 C18 10 22 6 28 6" />
              </svg>
              <p
                className="font-serif-italic max-w-[44ch]"
                style={{
                  fontSize: "clamp(22px, 2.4vw, 32px)",
                  lineHeight: 1.35,
                  color: "var(--cream)",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div
                className="mt-8 flex items-center gap-3 text-sm"
                style={{ color: "var(--rope)" }}
              >
                <span style={{ color: "var(--cream)" }}>{t.name}</span>
                <span
                  className="w-6 h-[1px]"
                  style={{ background: "var(--rope)" }}
                />
                <span>
                  {t.role} · {t.city}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between">
        <div className="flex gap-3">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Zeige Testimonial ${i + 1}`}
              className="h-[2px] rounded-full transition-all"
              style={{
                width: i === selected ? 44 : 16,
                background:
                  i === selected ? "var(--cream)" : "rgba(140,146,160,0.4)",
              }}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Vorheriges Testimonial"
            className="w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:-translate-y-[1px]"
            style={{ border: "1px solid rgba(140,146,160,0.4)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--cream)" strokeWidth="1.5">
              <path d="M9 2 L3 7 L9 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Nächstes Testimonial"
            className="w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:-translate-y-[1px]"
            style={{ background: "var(--cream)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--wood)" strokeWidth="1.5">
              <path d="M5 2 L11 7 L5 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
