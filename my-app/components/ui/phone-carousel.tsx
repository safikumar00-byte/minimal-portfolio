"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

export type ImageItem = {
  src: string;
  alt: string;
  title: string;
};

type PhoneCarouselProps = {
  images: ImageItem[];
  label: string;
  compact?: boolean;
};

export function PhoneCarousel({
  images,
  label,
  compact = false,
}: PhoneCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  const activeImage = images[activeIndex];
  const getImageAt = (offset: number) =>
    images[(activeIndex + offset + images.length) % images.length];
  const move = (offset: number) => {
    setActiveIndex((index) => (index + offset + images.length) % images.length);
  };

  return (
    <section
      className={`phone-carousel${compact ? " phone-carousel--compact" : ""}`}
      aria-label={`${label} mobile app screens`}
    >
      <div className="phone-carousel-stage">
        {[-1, 0, 1].map((offset) => {
          const image = getImageAt(offset);
          const isActive = offset === 0;
          return (
            <button
              aria-label={`${isActive ? "Selected" : "Show"} screen: ${image.title}`}
              aria-pressed={isActive}
              className={`phone-device${isActive ? " is-active" : " is-side"}`}
              key={`${offset}-${image.src}`}
              onClick={() => {
                if (!isActive) move(offset);
              }}
              style={{ "--phone-offset": offset } as CSSProperties}
              tabIndex={isActive ? 0 : -1}
              type="button"
            >
              <span className="phone-device-screen">
                <Image
                  src={image.src}
                  alt={isActive ? image.alt : ""}
                  fill
                  sizes={compact ? "120px" : "(max-width: 760px) 42vw, 220px"}
                  priority={!compact && activeIndex === 0 && isActive}
                />
              </span>
            </button>
          );
        })}
      </div>

      <div className="phone-carousel-footer">
        <button
          aria-label="Previous app screen"
          className="phone-carousel-arrow"
          onClick={() => move(-1)}
          type="button"
        >
          <span aria-hidden="true">←</span>
        </button>
        <div className="phone-carousel-status" aria-live="polite">
          <span>{activeImage.title}</span>
          <small>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </small>
        </div>
        <button
          aria-label="Next app screen"
          className="phone-carousel-arrow"
          onClick={() => move(1)}
          type="button"
        >
          <span aria-hidden="true">→</span>
        </button>
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
