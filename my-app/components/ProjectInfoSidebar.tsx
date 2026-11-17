"use client";

import * as React from "react";
import TransitionLink from "@/components/transition-link";

export type ProjectInfoSidebarProps = {
  title: string;
  shortDescription: string;
  categoryTags?: string[];
  year?: string;
  status?: string;
  figmaUrl?: string;
  className?: string;
};

export default function ProjectInfoSidebar({
  title,
  shortDescription,
  categoryTags = [],
  year,
  status,
  figmaUrl,
  className = "",
}: ProjectInfoSidebarProps) {
  return (
    <aside
      className={`project-info-sidebar w-full flex flex-col items-start ${className}`}
      aria-label="Project details"
    >
      {/* Back to selected work link */}
      <TransitionLink
        className="group inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-900 transition-colors mb-7"
        href="/"
      >
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:-translate-x-1"
        >
          ←
        </span>
        <span>Back to all selected work</span>
      </TransitionLink>

      {/* Metadata Tags / Eyebrow */}
      {categoryTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono tracking-tight text-neutral-500 mb-3">
          {categoryTags.map((tag, index) => (
            <React.Fragment key={tag}>
              <span>{tag}</span>
              {index < categoryTags.length - 1 && (
                <span className="text-neutral-300 select-none">/</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Project Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-medium tracking-tight text-neutral-900 leading-[1.12] mb-3.5">
        {title}
      </h1>

      {/* Short Description */}
      <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed mb-6 max-w-[280px]">
        {shortDescription}
      </p>

      {/* Optional Status / Year Meta */}
      {(status || year || figmaUrl) && (
        <div className="pt-4 border-t border-neutral-100 w-full flex flex-col gap-2.5 text-[11px] font-mono text-neutral-400">
          {status && (
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>Status: {status}</span>
            </div>
          )}
          {year && <div>Year: {year}</div>}
          {figmaUrl && (
            <div className="pt-2 border-t border-neutral-100">
              <a
                href={figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 font-mono tracking-tight transition-colors group"
              >
                <span>View in Figma</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
