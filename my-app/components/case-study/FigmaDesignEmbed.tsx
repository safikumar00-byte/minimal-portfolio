"use client";

import * as React from "react";

export interface FigmaDesignEmbedProps {
  title: string;
  embedUrl: string;
  sourceUrl: string;
  className?: string;
  initialHeight?: number;
}

export default function FigmaDesignEmbed({
  title,
  embedUrl,
  sourceUrl,
  className = "",
}: FigmaDesignEmbedProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  return (
    <section
      id="figma-embed"
      aria-label={`${title} interactive Figma design file`}
      className={`w-full mb-12 sm:mb-16 scroll-mt-24 ${className}`}
    >
      {/* Top Header Strip: Minimal Editorial Label & Direct Link */}
      <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-neutral-200/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-500">
            Interactive Figma Canvas
          </span>
          <span className="hidden sm:inline-block text-[11px] text-neutral-400 font-mono">
            · Native Zoom &amp; Pan Active
          </span>
        </div>

        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-mono text-neutral-600 hover:text-neutral-900 transition-colors inline-flex items-center gap-1 group"
        >
          <span>Open in Figma</span>
          <span className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </a>
      </div>

      {/* Embed Container Frame */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-200/90 bg-[#1E1E1E] shadow-sm">
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-100/90 backdrop-blur-xs transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full border-2 border-neutral-300 border-t-neutral-800 animate-spin mb-3" />
            <p className="text-xs font-mono text-neutral-500">
              Loading {title} Figma workspace…
            </p>
          </div>
        )}

        {/* Error Fallback */}
        {hasError ? (
          <div className="w-full h-[420px] sm:h-[520px] flex flex-col items-center justify-center p-6 text-center bg-neutral-50">
            <p className="text-sm text-neutral-700 font-medium mb-2">
              Unable to preview Figma canvas directly.
            </p>
            <p className="text-xs text-neutral-500 max-w-md mb-4">
              The Figma embed service might be restricted in your current network environment or browser security settings.
            </p>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-mono bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Open Original File in Figma ↗
            </a>
          </div>
        ) : (
          <div className="w-full h-[380px] sm:h-[500px] md:h-[580px] lg:h-[640px] xl:h-[680px]">
            <iframe
              src={embedUrl}
              title={`${title} — Figma design file`}
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              className="w-full h-full border-0 block"
              style={{
                display: "block",
                backgroundColor: "#2C2C2C",
              }}
            />
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-neutral-400">
        <span>Use trackpad or scroll to zoom · Click-drag to pan</span>
        <span className="hidden sm:inline">Press fullscreen in bottom-right corner</span>
      </div>
    </section>
  );
}
