"use client";

import * as React from "react";
import ProjectInfoSidebar from "@/components/ProjectInfoSidebar";
import ProjectSectionNavigation, {
  type SectionNavItem,
} from "@/components/ProjectSectionNavigation";

export type RelatedProject = {
  title: string;
  href: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  artwork?: React.ReactNode;
};

export type CaseStudyLayoutProps = {
  title: string;
  summary: string;
  categoryTags?: string[];
  year?: string;
  status?: string;
  figmaUrl?: string;
  navItems: SectionNavItem[];
  navTitle?: string;
  children: React.ReactNode;
  className?: string;
};

export default function CaseStudyLayout({
  title,
  summary,
  categoryTags = [],
  year,
  status,
  figmaUrl,
  navItems = [],
  navTitle,
  children,
  className = "",
}: CaseStudyLayoutProps) {
  return (
    <div className="portfolio-shell w-full pb-20 pt-4">
      {/* 
        Three-rail Editorial Layout:
        - Desktop: 
          Col 1 (Left Sidebar): ~240px - 260px (approx 20-22%), sticky
          Col 2 (Center Content): minmax(0, 1fr) (approx 60-65%), max-w-[860px]
          Col 3 (Right Navigation): ~150px - 170px (approx 13-15%), sticky
        - Tablet:
          Sidebar and content adapt, right rail remains or stacks
        - Mobile:
          Single column stack in reading order
      */}
      <div
        className={`editorial-case-study-grid grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_160px] xl:grid-cols-[260px_minmax(0,1fr)_170px] gap-8 xl:gap-12 items-start ${className}`}
      >
        {/* COLUMN 1: Left Project Information Sidebar */}
        <div className="lg:sticky lg:top-28 w-full">
          <ProjectInfoSidebar
            title={title}
            shortDescription={summary}
            categoryTags={categoryTags}
            year={year}
            status={status}
            figmaUrl={figmaUrl}
          />
        </div>

        {/* COLUMN 2: Center Main Storytelling Content */}
        <main className="w-full min-w-0 max-w-[880px] mx-auto flex flex-col">
          {children}
        </main>

        {/* COLUMN 3: Right Sticky Section Navigation Rail */}
        <aside className="lg:sticky lg:top-28 w-full flex justify-end">
          <ProjectSectionNavigation items={navItems} title={navTitle} />
        </aside>
      </div>
    </div>
  );
}
