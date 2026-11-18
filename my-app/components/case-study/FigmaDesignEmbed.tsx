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
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#1E1E1E]">
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-100/90 backdrop-blur-xs transition-opacity duration-300">
            <style>{`
      .figma-boxes {
        --size: 28px;
        --duration: 800ms;
        height: calc(var(--size) * 2);
        width: calc(var(--size) * 3);
        position: relative;
        transform-style: preserve-3d;
        transform-origin: 50% 50%;
        margin-top: calc(var(--size) * 1.5 * -1);
        transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
      }

      .figma-boxes .box {
        width: var(--size);
        height: var(--size);
        top: 0;
        left: 0;
        position: absolute;
        transform-style: preserve-3d;
      }

      .figma-boxes .box:nth-child(1) {
        transform: translate(100%, 0);
        animation: figmaBox1 var(--duration) linear infinite;
      }

      .figma-boxes .box:nth-child(2) {
        transform: translate(0, 100%);
        animation: figmaBox2 var(--duration) linear infinite;
      }

      .figma-boxes .box:nth-child(3) {
        transform: translate(100%, 100%);
        animation: figmaBox3 var(--duration) linear infinite;
      }

      .figma-boxes .box:nth-child(4) {
        transform: translate(200%, 0);
        animation: figmaBox4 var(--duration) linear infinite;
      }

      .figma-boxes .box > div {
        --background: #5C8DF6;
        --top: auto;
        --right: auto;
        --bottom: auto;
        --left: auto;
        --translateZ: calc(var(--size) / 2);
        --rotateY: 0deg;
        --rotateX: 0deg;
        position: absolute;
        width: 100%;
        height: 100%;
        background: var(--background);
        top: var(--top);
        right: var(--right);
        bottom: var(--bottom);
        left: var(--left);
        transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
      }

      .figma-boxes .box > div:nth-child(1) {
        --top: 0;
        --left: 0;
      }

      .figma-boxes .box > div:nth-child(2) {
        --background: #145af2;
        --right: 0;
        --rotateY: 90deg;
      }

      .figma-boxes .box > div:nth-child(3) {
        --background: #447cf5;
        --rotateX: -90deg;
      }

      .figma-boxes .box > div:nth-child(4) {
        --background: #DBE3F4;
        --top: 0;
        --left: 0;
        --translateZ: calc(var(--size) * 3 * -1);
      }

      @keyframes figmaBox1 {
        0%, 50% { transform: translate(100%, 0); }
        100% { transform: translate(200%, 0); }
      }

      @keyframes figmaBox2 {
        0% { transform: translate(0, 100%); }
        50% { transform: translate(0, 0); }
        100% { transform: translate(100%, 0); }
      }

      @keyframes figmaBox3 {
        0%, 50% { transform: translate(100%, 100%); }
        100% { transform: translate(0, 100%); }
      }

      @keyframes figmaBox4 {
        0% { transform: translate(200%, 0); }
        50% { transform: translate(200%, 100%); }
        100% { transform: translate(100%, 100%); }
      }
    `}</style>

            <div className="figma-boxes mb-12" aria-hidden="true">
              <div className="box">
                <div />
                <div />
                <div />
                <div />
              </div>
              <div className="box">
                <div />
                <div />
                <div />
                <div />
              </div>
              <div className="box">
                <div />
                <div />
                <div />
                <div />
              </div>
              <div className="box">
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>

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
          <div className="w-full h-[380px] sm:h-[500px] md:h-[480px] lg:h-[480px] xl:h-[560px]">
            <iframe
              src={embedUrl}
              title={`${title} — Figma design file`}
              width="64%"
              height="36%"
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
