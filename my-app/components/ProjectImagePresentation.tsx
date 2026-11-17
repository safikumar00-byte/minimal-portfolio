"use client";

import * as React from "react";
import Image from "next/image";

export type ImageMockupProps = {
  src: string;
  alt: string;
  title?: string;
  priority?: boolean;
};

/**
 * Mobile Phone Mockup (iPhone Chassis)
 * Crisp, modern frame with subtle bezel, dynamic island, and soft ambient shadow.
 */
export function PhoneMockup({
  src,
  alt,
  title,
  priority = false,
  className = "",
}: ImageMockupProps & { className?: string }) {
  return (
    <figure
      className={`phone-mockup-wrapper relative flex flex-col items-center ${className}`}
    >
      <div className="relative w-full max-w-[240px] sm:max-w-[260px] md:max-w-[280px] aspect-[390/844] rounded-[38px] sm:rounded-[44px] p-2 bg-[#1b1b1f] ring-1 ring-black/30 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.08)_inset] overflow-hidden">
        {/* Dynamic Island / Top sensor pill */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20 pointer-events-none flex items-center justify-end pr-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111116] border border-neutral-800" />
        </div>

        {/* Inner Screen */}
        <div className="relative w-full h-full rounded-[30px] sm:rounded-[36px] overflow-hidden bg-neutral-900">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 280px"
            priority={priority}
            className="object-cover object-top"
          />
        </div>
      </div>

      {title && (
        <figcaption className="sr-only">
          {title}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Desktop Application / Browser Window Mockup
 * Minimalist window frame with traffic lights and soft shadow.
 */
export function DesktopMockup({
  src,
  alt,
  title,
  priority = false,
  className = "",
}: ImageMockupProps & { className?: string }) {
  return (
    <figure
      className={`desktop-mockup-wrapper relative w-full flex flex-col items-center ${className}`}
    >
      <div className="relative w-full max-w-[820px] rounded-xl sm:rounded-2xl overflow-hidden bg-white ring-1 ring-neutral-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.18)]">
        {/* Minimal macOS Titlebar */}
        <div className="h-7 sm:h-8 bg-neutral-100/90 border-b border-neutral-200/80 px-3.5 flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/90 border border-black/10 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/90 border border-black/10 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/90 border border-black/10 inline-block" />
          </div>
          {title && (
            <span className="text-[10px] text-neutral-400 font-mono mx-auto pr-8 truncate">
              {title}
            </span>
          )}
        </div>

        {/* App Screen */}
        <div className="relative w-full aspect-[16/10] bg-neutral-100">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 820px"
            priority={priority}
            className="object-cover object-top"
          />
        </div>
      </div>

      {title && <figcaption className="sr-only">{title}</figcaption>}
    </figure>
  );
}

/**
 * Three-Up Image Presentation
 * Exactly matches the reference image: 3 phones side-by-side inside a #F1F1F1 card.
 */
export function ThreeUpImagePresentation({
  images,
  caption,
  deviceType = "phone",
}: {
  images: { src: string; alt: string; title?: string }[];
  caption?: string;
  deviceType?: "phone" | "desktop";
}) {
  return (
    <div className="w-full my-8">
      <div className="w-full bg-[#F1F1F1] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 overflow-hidden flex items-center justify-center">
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-8 items-center justify-items-center">
          {images.slice(0, 3).map((img, idx) => (
            <div key={img.src + idx} className="w-full flex justify-center">
              {deviceType === "desktop" ? (
                <DesktopMockup src={img.src} alt={img.alt} title={img.title} />
              ) : (
                <PhoneMockup src={img.src} alt={img.alt} title={img.title} />
              )}
            </div>
          ))}
        </div>
      </div>
      {caption && (
        <p className="text-[11px] text-neutral-400 mt-2.5 text-center leading-normal">
          {caption}
        </p>
      )}
    </div>
  );
}

/**
 * Two-Up Image Presentation
 * Exactly matches the reference image: 2 phones side-by-side inside a #F1F1F1 card.
 */
export function TwoUpImagePresentation({
  images,
  caption,
  deviceType = "phone",
}: {
  images: { src: string; alt: string; title?: string }[];
  caption?: string;
  deviceType?: "phone" | "desktop";
}) {
  return (
    <div className="w-full my-8">
      <div className="w-full bg-[#F1F1F1] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 overflow-hidden flex items-center justify-center">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-6 md:gap-10 items-center justify-items-center">
          {images.slice(0, 2).map((img, idx) => (
            <div key={img.src + idx} className="w-full flex justify-center">
              {deviceType === "desktop" ? (
                <DesktopMockup src={img.src} alt={img.alt} title={img.title} />
              ) : (
                <PhoneMockup src={img.src} alt={img.alt} title={img.title} />
              )}
            </div>
          ))}
        </div>
      </div>
      {caption && (
        <p className="text-[11px] text-neutral-400 mt-2.5 text-center leading-normal">
          {caption}
        </p>
      )}
    </div>
  );
}

/**
 * Single Image Presentation (or Full-Width)
 */
export function SingleImagePresentation({
  image,
  caption,
  deviceType = "phone",
}: {
  image: { src: string; alt: string; title?: string };
  caption?: string;
  deviceType?: "phone" | "desktop";
}) {
  return (
    <div className="w-full my-8">
      <div className="w-full bg-[#F1F1F1] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 overflow-hidden flex items-center justify-center">
        {deviceType === "desktop" ? (
          <DesktopMockup src={image.src} alt={image.alt} title={image.title} />
        ) : (
          <PhoneMockup src={image.src} alt={image.alt} title={image.title} />
        )}
      </div>
      {caption && (
        <p className="text-[11px] text-neutral-400 mt-2.5 text-center leading-normal">
          {caption}
        </p>
      )}
    </div>
  );
}
