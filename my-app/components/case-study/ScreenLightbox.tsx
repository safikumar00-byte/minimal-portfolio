"use client";

import * as React from "react";
import Image from "next/image";

export interface LightboxScreen {
  id: string;
  src: string;
  alt: string;
  title: string;
  module: string;
  categoryLabel?: string;
  state?: string;
  device?: "mobile" | "desktop";
}

export interface ScreenLightboxProps {
  screens: LightboxScreen[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export default function ScreenLightbox({
  screens,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}: ScreenLightboxProps) {
  const currentScreen = screens[currentIndex];

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onSelectIndex((currentIndex - 1 + screens.length) % screens.length);
      } else if (e.key === "ArrowRight") {
        onSelectIndex((currentIndex + 1) % screens.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, screens.length, onClose, onSelectIndex]);

  if (!isOpen || !currentScreen) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex - 1 + screens.length) % screens.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex + 1) % screens.length);
  };

  const isDesktop = currentScreen.device === "desktop";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${currentScreen.title} preview`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-neutral-950/90 backdrop-blur-md p-4 sm:p-6 transition-all duration-200 select-none animate-in fade-in duration-150"
    >
      {/* Top Bar: Counter, Title, Category Tag, Close Button */}
      <div
        className="w-full max-w-6xl mx-auto flex items-center justify-between z-10 pb-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-neutral-400 bg-neutral-800/80 px-2.5 py-1 rounded-md border border-neutral-700/60">
            {String(currentIndex + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}
          </span>

          <div className="flex flex-col">
            <h3 className="text-sm font-medium text-white tracking-tight">
              {currentScreen.title}
            </h3>
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              {currentScreen.categoryLabel || currentScreen.module}
              {currentScreen.state && currentScreen.state !== "default"
                ? ` · ${currentScreen.state}`
                : ""}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close screen preview (Esc)"
          className="text-neutral-400 hover:text-white p-2 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 transition-colors border border-neutral-700/50 flex items-center gap-1.5 text-xs font-mono"
        >
          <span>ESC</span>
          <span className="text-sm leading-none">&times;</span>
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center p-2 sm:p-4 my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous screen (Left Arrow)"
          className="absolute left-2 sm:left-4 z-20 w-10 h-10 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/80 flex items-center justify-center transition-all duration-150 shadow-lg hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* The Screen Image */}
        <div
          className={`relative max-h-[82vh] transition-all duration-200 flex items-center justify-center ${
            isDesktop
              ? "w-full max-w-5xl aspect-16/10"
              : "w-auto max-w-[420px] aspect-9/19.5"
          }`}
        >
          <Image
            src={currentScreen.src}
            alt={currentScreen.alt || currentScreen.title}
            width={isDesktop ? 1600 : 800}
            height={isDesktop ? 1000 : 1730}
            quality={95}
            priority
            className="w-auto h-auto max-h-[78vh] object-contain rounded-xl shadow-2xl border border-neutral-800"
          />
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next screen (Right Arrow)"
          className="absolute right-2 sm:right-4 z-20 w-10 h-10 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/80 flex items-center justify-center transition-all duration-150 shadow-lg hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Bottom Hint */}
      <div
        className="w-full max-w-6xl mx-auto flex items-center justify-between text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-800/80"
        onClick={(e) => e.stopPropagation()}
      >
        <span>Use &larr; &rarr; arrows to navigate</span>
        <button
          type="button"
          onClick={onClose}
          className="text-neutral-400 hover:text-neutral-200 underline underline-offset-2"
        >
          Click outside to exit
        </button>
      </div>
    </div>
  );
}
