"use client";

import Image from "next/image";
import {
  useState,
  useEffect,
  useCallback,
  type CSSProperties,
} from "react";

export type ImageItem = {
  src: string;
  alt: string;
  title: string;
};

type PhoneCarouselProps = {
  images: ImageItem[];
  label: string;
  compact?: boolean;
  autoPlayInterval?: number;
};

function getCircularOffset(index: number, activeIndex: number, total: number) {
  let diff = index - activeIndex;
  while (diff > total / 2) diff -= total;
  while (diff < -total / 2) diff += total;
  return diff;
}

export function PhoneCarousel({
  images,
  label,
  compact = false,
  autoPlayInterval = 3200,
}: PhoneCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const move = useCallback(
    (offset: number) => {
      setActiveIndex(
        (index) => (index + offset + images.length) % images.length
      );
    },
    [images.length]
  );

  // Auto transition for compact carousels (each slide becomes active with a delay)
  useEffect(() => {
    if (!compact || images.length <= 1 || isPaused) return;

    // Respect user's motion preferences
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [compact, images.length, isPaused, autoPlayInterval]);

  // Pause when the page or tab is in background
  useEffect(() => {
    if (!compact) return;

    const handleVisibility = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [compact]);

  if (images.length === 0) return null;

  return (
    <section
      className={`phone-carousel${compact ? " phone-carousel--compact" : ""}`}
      aria-label={`${label} mobile app screens`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="overlay"></div>
      <div className="phone-carousel-stage">
        {images.map((image, index) => {
          const offset = getCircularOffset(index, activeIndex, images.length);
          const isActive = offset === 0;
          const isSide = Math.abs(offset) === 1;

          return (
            <button
              aria-label={`${isActive ? "Selected" : "Show"} screen: ${image.title}`}
              aria-pressed={isActive}
              className={`phone-device${isActive ? " is-active" : isSide ? " is-side" : " is-hidden"
                }`}
              key={image.src}
              onClick={() => {
                if (!isActive) move(offset > 0 ? 1 : -1);
              }}
              style={{ "--phone-offset": offset } as CSSProperties}
              tabIndex={isActive ? 0 : -1}
              type="button"
            >
              <span className="phone-device-screen shine">
                <Image
                  src={image.src}
                  alt={isActive ? image.alt : ""}
                  fill
                  sizes={compact ? "140px" : "(max-width: 760px) 42vw, 220px"}
                  priority={!compact && activeIndex === 0 && isActive}
                />
              </span>
            </button>
          );
        })}
      </div>

      {!compact && (
        <div className="phone-carousel-dots" aria-label="Choose a screen">
          {images.map((image, index) => (
            <button
              aria-label={`Show ${image.title}`}
              aria-pressed={index === activeIndex}
              className={index === activeIndex ? "is-active" : ""}
              key={image.src}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>
      )}
    </section>
  );
}
