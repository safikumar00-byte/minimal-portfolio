"use client";

import Image from "next/image";
import {
  useState,
  useEffect,
  useCallback,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

export type DesktopImageItem = {
  src: string;
  alt: string;
  title: string;
  urlPath?: string;
};

type DesktopCarouselProps = {
  images: DesktopImageItem[];
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

function getSlug(title: string, urlPath?: string): string {
  if (urlPath) return urlPath;
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function DesktopCarousel({
  images,
  label,
  compact = false,
  autoPlayInterval = 3400,
}: DesktopCarouselProps) {
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

  // Auto transition for compact carousels (slides rotate automatically on a delay)
  useEffect(() => {
    if (!compact || images.length <= 1 || isPaused) return;

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

  // Pause when page or tab is hidden
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

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      move(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      move(1);
    }
  };

  if (images.length === 0) return null;

  return (
    <section
      aria-label={`${label} desktop screens`}
      className={`desktop-carousel${compact ? " desktop-carousel--compact" : ""}`}
      onBlurCapture={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchEnd={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      tabIndex={0}
    >
      {compact && <div className="overlay" aria-hidden="true" />}
      <div className="desktop-carousel-stage">
        <div className="overlay"></div>
        {images.map((image, index) => {
          const offset = getCircularOffset(index, activeIndex, images.length);
          const isActive = offset === 0;
          const isSide = Math.abs(offset) === 1;
          const slug = getSlug(image.title, image.urlPath);

          return (
            <button
              aria-label={`${isActive ? "Selected" : "Show"} desktop screen: ${image.title}`}
              aria-pressed={isActive}
              className={`desktop-device${isActive ? " is-active" : isSide ? " is-side" : " is-hidden"
                }`}
              key={image.src}
              onClick={() => {
                if (!isActive) move(offset > 0 ? 1 : -1);
              }}
              style={{ "--desktop-offset": offset } as CSSProperties}
              tabIndex={isActive ? 0 : -1}
              type="button"
            >
              <div className="desktop-window-bar">
                <div className="desktop-window-dots" aria-hidden="true">
                  <span className="dot dot--red" />
                  <span className="dot dot--yellow" />
                  <span className="dot dot--green" />
                </div>
                <div className="desktop-window-address">
                  <svg
                    aria-hidden="true"
                    className="desktop-window-lock"
                    fill="currentColor"
                    height="10"
                    viewBox="0 0 16 16"
                    width="10"
                  >
                    <path d="M4 6V4a4 4 0 0 1 8 0v2h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2zm2-2a2 2 0 1 0 4 0v2H6V4z" />
                  </svg>
                  <span className="desktop-window-domain">cvm-hrm.portal</span>
                  <span className="desktop-window-path">/{slug}</span>
                </div>
              </div>
              <span className="desktop-device-screen shine">
                <Image
                  alt={isActive ? image.alt : ""}
                  fill
                  priority={!compact && activeIndex === 0 && isActive}
                  sizes={
                    compact
                      ? "(max-width: 768px) 300px, 420px"
                      : "(max-width: 900px) 90vw, 860px"
                  }
                  src={image.src}
                />
              </span>
            </button>
          );
        })}
      </div>

      {!compact && (
        <>
          <div className="desktop-carousel-footer">
            <button
              aria-label="Previous desktop screen"
              className="desktop-carousel-arrow"
              onClick={() => move(-1)}
              type="button"
            >
              ←
            </button>
            <div className="desktop-carousel-status">
              <span>{images[activeIndex]?.title}</span>
              <small>
                {activeIndex + 1} of {images.length}
              </small>
            </div>
            <button
              aria-label="Next desktop screen"
              className="desktop-carousel-arrow"
              onClick={() => move(1)}
              type="button"
            >
              →
            </button>
          </div>

          <div
            aria-label="Choose a desktop screen"
            className="desktop-carousel-dots"
          >
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
        </>
      )}
    </section>
  );
}
