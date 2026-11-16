"use client";

import * as React from "react";

export type PortfolioPreloaderProps = {
  onComplete?: () => void;
  minDuration?: number; // fallback min duration in ms (default 1300ms)
};

const emptySubscribe = () => () => {};

function useShouldSkipPreloader() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const alreadyPreloaded = window.sessionStorage.getItem("portfolio_preloaded") === "true";
      return prefersReduced || alreadyPreloaded;
    },
    () => false
  );
}

const SERVER_DIMENSIONS = { width: 1440, height: 900 };
let cachedClientDimensions = SERVER_DIMENSIONS;

function subscribeResize(onStoreChange: () => void) {
  const handleResize = () => {
    cachedClientDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    onStoreChange();
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}

function getDimensionsSnapshot() {
  if (typeof window !== "undefined") {
    if (
      cachedClientDimensions.width !== window.innerWidth ||
      cachedClientDimensions.height !== window.innerHeight
    ) {
      cachedClientDimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
  }
  return cachedClientDimensions;
}

function getServerDimensionsSnapshot() {
  return SERVER_DIMENSIONS;
}

function useWindowDimensions() {
  return React.useSyncExternalStore(
    subscribeResize,
    getDimensionsSnapshot,
    getServerDimensionsSnapshot
  );
}

export default function PortfolioPreloader({
  onComplete,
  minDuration = 1350,
}: PortfolioPreloaderProps) {
  const shouldSkip = useShouldSkipPreloader();
  const dimensions = useWindowDimensions();
  const [stage, setStage] = React.useState<"init" | "wireframe" | "reveal" | "done">("init");
  const [progress, setProgress] = React.useState(0);

  const onCompleteRef = React.useRef(onComplete);
  React.useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const hasNotifiedRef = React.useRef(false);
  const notifyComplete = React.useCallback(() => {
    if (!hasNotifiedRef.current) {
      hasNotifiedRef.current = true;
      onCompleteRef.current?.();
    }
  }, []);

  React.useEffect(() => {
    if (shouldSkip) {
      notifyComplete();
      return;
    }

    const startTime = performance.now();
    let animationFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, (elapsed / minDuration) * 100);
      setProgress(pct);

      if (elapsed < 300) {
        setStage("init");
      } else if (elapsed < minDuration) {
        setStage("wireframe");
      } else if (elapsed < minDuration + 400) {
        setStage("reveal");
        notifyComplete();
      } else {
        setStage("done");
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem("portfolio_preloaded", "true");
        }
        return;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [minDuration, shouldSkip, notifyComplete]);

  if (shouldSkip || stage === "done") {
    return null;
  }

  const isFadingOut = stage === "reveal";

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#FFFFFF] overflow-y-auto select-none pointer-events-none transition-opacity duration-400 ease-out ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(to right, #ECEDEF 1px, transparent 1px),
          linear-gradient(to bottom, #ECEDEF 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      {/* Top Technical Status Bar */}
      <div className="fixed top-0 left-0 right-0 h-9 bg-white/90 backdrop-blur-xs border-b border-[#ECEDEF] px-6 md:px-12 flex items-center justify-between font-mono text-[10px] text-[#9A9DA3] z-50">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#55585D] animate-ping" />
          <span className="font-semibold text-[#55585D] uppercase tracking-wider">
            SYS.INIT // WIREFRAME BLUEPRINT
          </span>
          <span className="hidden sm:inline text-[#D5D7DB]">|</span>
          <span className="hidden sm:inline">SCALE 1:1</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline">
            VIEWPORT: {dimensions.width}×{dimensions.height}
          </span>
          <span className="text-[#D5D7DB]">|</span>
          <div className="flex items-center gap-1.5 font-semibold text-[#55585D]">
            <span>LOADING</span>
            <span className="w-9 text-right font-mono">[{Math.round(progress)}%]</span>
          </div>
        </div>
      </div>

      {/* Recreated Skeleton Layout matching the exact page structure */}
      <div className="portfolio-shell pt-14 pb-20">
        {/* Header Skeleton */}
        <header className="site-header border-b border-[#ECEDEF]">
          <div className="h-4 w-36 bg-[#F0F1F3] border border-[#D6D8DC] rounded-[2px]" />
          <nav className="top-nav flex items-center gap-4" aria-label="Skeleton navigation">
            <div className="h-3 w-12 bg-[#F0F1F3] border border-[#D6D8DC] rounded-[2px]" />
            <div className="h-3 w-14 bg-[#F0F1F3] border border-[#D6D8DC] rounded-[2px]" />
            <div className="hidden sm:block h-3 w-28 bg-[#F0F1F3] border border-[#D6D8DC] rounded-[2px]" />
          </nav>
        </header>

        {/* Main Content Skeleton */}
        <div className="portfolio-layout">
          {/* Sticky Intro Column Skeleton */}
          <aside className="intro-column">
            <section className="intro-copy">
              {/* Headline Skeletons */}
              <div className="space-y-2 mb-6">
                <div className="h-8 md:h-11 w-full max-w-[340px] bg-[#F7F7F8] border border-[#D6D8DC] rounded-[3px]" />
                <div className="h-8 md:h-11 w-[85%] bg-[#F7F7F8] border border-[#D6D8DC] rounded-[3px]" />
                <div className="h-8 md:h-11 w-[65%] bg-[#F7F7F8] border border-[#D6D8DC] rounded-[3px]" />
              </div>

              {/* Bio Lines Skeleton */}
              <div className="space-y-2 max-w-[340px]">
                <div className="h-3.5 w-full bg-[#F7F7F8] border border-[#D6D8DC] rounded-[2px]" />
                <div className="h-3.5 w-[92%] bg-[#F7F7F8] border border-[#D6D8DC] rounded-[2px]" />
                <div className="h-3.5 w-[75%] bg-[#F7F7F8] border border-[#D6D8DC] rounded-[2px]" />
              </div>
            </section>

            {/* Footer / Contact Skeleton */}
            <div className="contact-block hidden md:flex flex-col gap-3">
              <div className="flex gap-4">
                <div className="h-3 w-10 bg-[#F7F7F8] border border-[#D6D8DC] rounded-[2px]" />
                <div className="h-3 w-14 bg-[#F7F7F8] border border-[#D6D8DC] rounded-[2px]" />
                <div className="h-3 w-14 bg-[#F7F7F8] border border-[#D6D8DC] rounded-[2px]" />
              </div>
              <div className="h-2.5 w-48 bg-[#F7F7F8] border border-[#D6D8DC] rounded-[2px]" />
            </div>
          </aside>

          {/* Work Column Skeleton */}
          <section className="work-column">
            {/* Filter Toolbar Skeleton */}
            <div className="work-toolbar mb-4">
              <div className="inline-flex items-center gap-1.5 p-1 border border-[#D6D8DC] rounded-full bg-white">
                <div className="h-5 w-10 rounded-full bg-[#55585D]/20 border border-[#D6D8DC]" />
                <div className="h-5 w-14 rounded-full bg-[#F7F7F8] border border-[#D6D8DC]" />
                <div className="h-5 w-20 rounded-full bg-[#F7F7F8] border border-[#D6D8DC]" />
              </div>
            </div>

            {/* Ruler Bar Skeleton */}
            <div className="editorial-ruler-bar mb-6 hidden md:block">
              <div className="flex justify-between font-mono text-[9px] text-[#9A9DA3] pb-1 uppercase tracking-wider">
                <span>RULER_GRID // 3-COL [1fr]</span>
                <span>DATUM_X: 00 · 33 · 66</span>
              </div>
              <div className="grid grid-cols-3 gap-6 font-mono text-[9px] text-[#9A9DA3] py-1 border-t border-[#D6D8DC]">
                <div className="flex justify-between pr-2">
                  <span>01 / COL_L</span>
                  <span>+00%</span>
                </div>
                <div className="flex justify-between pr-2">
                  <span>02 / COL_M</span>
                  <span>+33%</span>
                </div>
                <div className="flex justify-between pr-2">
                  <span>03 / COL_R</span>
                  <span>+66%</span>
                </div>
              </div>
              <div className="h-[7px] w-full border-b border-[#D6D8DC] bg-repeat-x" style={{
                backgroundImage: "repeating-linear-gradient(to right, #D6D8DC 0 1px, transparent 1px 16px)"
              }} />
            </div>

            {/* Three-Column Project Grid Skeleton */}
            <div className="project-grid">
              {[
                { col: "01", tag: "GRAPHIC / SYS" },
                { col: "02", tag: "FINTECH / APP" },
                { col: "03", tag: "MOBILE / BANK" },
                { col: "01", tag: "3D WEBGL / LIVE" },
                { col: "02", tag: "BRAND / ARCHIVE" },
                { col: "03", tag: "TICKET / SHADER" },
              ].map((item, idx) => (
                <article key={idx} className="project-card flex flex-col">
                  {/* Image Card Placeholder with Diagonal Cross-Lines */}
                  <div className="relative w-full aspect-[1.33] border border-[#D6D8DC] bg-[#F7F7F8] rounded-[6px] overflow-hidden">
                    {/* Architectural X crosshairs */}
                    <svg
                      className="absolute inset-0 w-full h-full stroke-[#D5D7DB] stroke-[1]"
                      preserveAspectRatio="none"
                    >
                      <line x1="0" y1="0" x2="100%" y2="100%" />
                      <line x1="100%" y1="0" x2="0" y2="100%" />
                    </svg>

                    {/* Corner Framing Brackets */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#A0A3A8]" />
                    <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#A0A3A8]" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#A0A3A8]" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#A0A3A8]" />

                    {/* Center Dimension Label */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#9A9DA3] bg-[#FFFFFF] px-2 py-0.5 border border-[#D6D8DC] rounded-[2px] shadow-2xs">
                        COL_{item.col} · {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Title Skeleton */}
                  <div className="mt-4 mb-2 space-y-1 min-h-[44px]">
                    <div className="h-4 w-[90%] bg-[#F7F7F8] border border-[#D6D8DC] rounded-[2px]" />
                    <div className="h-4 w-[60%] bg-[#F7F7F8] border border-[#D6D8DC] rounded-[2px]" />
                  </div>

                  {/* Tags Skeleton */}
                  <div className="flex gap-1.5 min-h-[26px]">
                    <div className="h-5 w-16 bg-[#F7F7F8] border border-[#D6D8DC] rounded-[3px]" />
                    <div className="h-5 w-20 bg-[#F7F7F8] border border-[#D6D8DC] rounded-[3px]" />
                  </div>

                  {/* Link Skeleton */}
                  <div className="mt-auto pt-3">
                    <div className="h-3 w-24 bg-[#F7F7F8] border border-[#D6D8DC] rounded-[2px]" />
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
