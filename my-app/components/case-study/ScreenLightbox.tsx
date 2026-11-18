"use client";

import * as React from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";

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
  const latestState = React.useRef({
    currentIndex,
    screenCount: screens.length,
    onClose,
    onSelectIndex,
  });

  React.useEffect(() => {
    latestState.current = {
      currentIndex,
      screenCount: screens.length,
      onClose,
      onSelectIndex,
    };
  }, [currentIndex, screens.length, onClose, onSelectIndex]);

  useBodyScrollLock(isOpen);

  // Keep the latest navigation handlers available to the keyboard listener.
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const {
        currentIndex: activeIndex,
        screenCount,
        onClose: close,
        onSelectIndex: selectIndex,
      } = latestState.current;

      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowLeft") {
        selectIndex((activeIndex - 1 + screenCount) % screenCount);
      } else if (e.key === "ArrowRight") {
        selectIndex((activeIndex + 1) % screenCount);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen || !currentScreen || typeof document === "undefined") return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex - 1 + screens.length) % screens.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex + 1) % screens.length);
  };

  const isDesktop = currentScreen.device === "desktop";

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${currentScreen.title} preview`}
      onClick={onClose}
      className="fixed inset-0 z-[var(--z-modal)] w-screen h-screen bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none animate-fade-in"
    >
      <div
        className="relative flex h-full w-full max-w-6xl flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center justify-between z-10 pb-3">
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
            <span className="text-sm leading-none">✕</span>
          </button>
        </div>

        <div className="relative flex flex-1 min-h-0 w-full items-center justify-center py-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous screen (Left Arrow)"
            className="absolute left-0 sm:left-2 z-20 w-10 h-10 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/80 flex items-center justify-center transition-all duration-150 shadow-lg hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <Image
            src={currentScreen.src}
            alt={currentScreen.alt || currentScreen.title}
            width={isDesktop ? 1600 : 800}
            height={isDesktop ? 1000 : 1730}
            quality={95}
            priority
            className="h-auto w-full max-w-6xl max-h-[85vh] object-contain rounded-xl shadow-2xl border border-neutral-800"
          />

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next screen (Right Arrow)"
            className="absolute right-0 sm:right-2 z-20 w-10 h-10 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/80 flex items-center justify-center transition-all duration-150 shadow-lg hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="w-full flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800/80">
          <span>{currentScreen.title}</span>
          <span>Use &larr; &rarr; arrows to navigate</span>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
