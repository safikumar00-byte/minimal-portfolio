"use client";

import * as React from "react";
import Image from "next/image";
import TransitionLink from "@/components/transition-link";
import {
  PhoneMockup,
  DesktopMockup,
  ThreeUpImagePresentation,
  TwoUpImagePresentation,
  SingleImagePresentation,
} from "@/components/ProjectImagePresentation";
import type {
  CaseStudyHighlight,
  CaseStudySolutionBlock,
  CaseStudyOverview,
  ImageItem,
} from "@/lib/phone-projects";
import {
  PORTFOLIO_PROJECTS,
  ProjectPreview,
  type PreviewKind,
} from "@/lib/projects-catalog";
import ProjectFlowsSection from "@/components/case-study/ProjectFlowsSection";
import type { UserFlow } from "@/components/case-study/UserFlowDiagram";
import type { StateFlow } from "@/components/case-study/StateFlowGallery";
import FigmaDesignEmbed from "@/components/case-study/FigmaDesignEmbed";
import ApplicationScreenGallery, {
  type ScreenCategoryGroup,
} from "@/components/case-study/ApplicationScreenGallery";

export type RelatedProjectItem = {
  title: string;
  href: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  artwork?: React.ReactNode;
  preview?: PreviewKind;
};

export type ProjectCaseStudyContentProps = {
  title?: string;
  deviceType?: "phone" | "desktop";
  heroCustom?: React.ReactNode;
  heroImage?: ImageItem;
  figmaEmbedUrl?: string;
  figmaSourceUrl?: string;
  screenCategories?: ScreenCategoryGroup[];
  overview?: CaseStudyOverview | string;
  highlights?: CaseStudyHighlight[];
  userFlows?: UserFlow[];
  stateFlows?: StateFlow[];
  figmaUrl?: string;
  solution?: {
    lead?: string;
    blocks: CaseStudySolutionBlock[];
  };
  behindTheBuild?: {
    lead?: string;
    paragraphs: string[];
    note?: string;
  };
  reflection?: {
    lead?: string;
    paragraphs: string[];
  };
  relatedProjects?: RelatedProjectItem[];
  fallbackImages?: ImageItem[];
};

export default function ProjectCaseStudyContent({
  title,
  deviceType = "phone",
  heroCustom,
  heroImage,
  figmaEmbedUrl,
  figmaSourceUrl,
  screenCategories = [],
  overview,
  highlights,
  userFlows,
  stateFlows,
  figmaUrl,
  solution,
  behindTheBuild,
  reflection,
  relatedProjects = [],
  fallbackImages = [],
}: ProjectCaseStudyContentProps) {
  // Normalize overview data
  const normalizedOverview: CaseStudyOverview =
    typeof overview === "string"
      ? { description: [overview] }
      : overview ?? { description: [] };

  const overviewParagraphs = Array.isArray(normalizedOverview.description)
    ? normalizedOverview.description
    : [normalizedOverview.description];

  const hasScreenCategories = screenCategories && screenCategories.length > 0;

  return (
    <article className="project-case-study-content w-full flex flex-col">
      {/* 01 — HERO / INTERACTIVE FIGMA EMBED OR COVER */}
      {figmaEmbedUrl ? (
        <FigmaDesignEmbed
          title={title || "Project"}
          embedUrl={figmaEmbedUrl}
          sourceUrl={figmaSourceUrl || figmaUrl || ""}
        />
      ) : (
        <section
          id="hero"
          aria-label="Project Hero Presentation"
          className="w-full mb-12 sm:mb-16"
        >
          <div className="w-full bg-[#F1F1F1] rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16 flex items-center justify-center overflow-hidden min-h-[380px] sm:min-h-[460px]">
            {heroCustom ? (
              heroCustom
            ) : heroImage ? (
              deviceType === "desktop" ? (
                <DesktopMockup
                  src={heroImage.src}
                  alt={heroImage.alt}
                  title={heroImage.title}
                  priority
                />
              ) : (
                <PhoneMockup
                  src={heroImage.src}
                  alt={heroImage.alt}
                  title={heroImage.title}
                  priority
                />
              )
            ) : null}
          </div>
        </section>
      )}

      {/* 02 — OVERVIEW */}
      {overviewParagraphs.length > 0 && (
        <section
          id="overview"
          aria-labelledby="heading-overview"
          className="w-full mb-14 sm:mb-18 scroll-mt-24"
        >
          <h2
            id="heading-overview"
            className="text-lg sm:text-xl font-medium tracking-tight text-neutral-900 mb-4"
          >
            Overview
          </h2>

          {normalizedOverview.lead && (
            <p className="text-sm sm:text-base font-medium text-neutral-800 leading-snug mb-3 max-w-[700px]">
              {normalizedOverview.lead}
            </p>
          )}

          <div className="flex flex-col gap-3.5 max-w-[700px] mb-6">
            {overviewParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Metadata Grid (Role, Tools, Timeline, Live URL, Figma Source) */}
          {(normalizedOverview.role ||
            normalizedOverview.tools ||
            normalizedOverview.timeline ||
            normalizedOverview.liveUrl ||
            normalizedOverview.figmaUrl ||
            figmaSourceUrl ||
            figmaUrl) && (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 pt-5 border-t border-neutral-100 max-w-[700px] text-xs">
              {normalizedOverview.role && (
                <div>
                  <dt className="text-neutral-400 font-mono text-[11px] mb-0.5">
                    Role &amp; Contribution
                  </dt>
                  <dd className="text-neutral-700 font-normal">
                    {normalizedOverview.role}
                  </dd>
                </div>
              )}
              {normalizedOverview.tools && (
                <div>
                  <dt className="text-neutral-400 font-mono text-[11px] mb-0.5">
                    Tools &amp; Stack
                  </dt>
                  <dd className="text-neutral-700 font-normal">
                    {normalizedOverview.tools.join(" · ")}
                  </dd>
                </div>
              )}
              {normalizedOverview.timeline && (
                <div>
                  <dt className="text-neutral-400 font-mono text-[11px] mb-0.5">
                    Timeline
                  </dt>
                  <dd className="text-neutral-700 font-normal">
                    {normalizedOverview.timeline}
                  </dd>
                </div>
              )}
              {normalizedOverview.liveUrl && (
                <div>
                  <dt className="text-neutral-400 font-mono text-[11px] mb-0.5">
                    Live Project
                  </dt>
                  <dd>
                    <a
                      href={normalizedOverview.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-900 font-medium hover:underline inline-flex items-center gap-1"
                    >
                      Visit live experience ↗
                    </a>
                  </dd>
                </div>
              )}
              {(figmaSourceUrl || normalizedOverview.figmaUrl || figmaUrl) && (
                <div>
                  <dt className="text-neutral-400 font-mono text-[11px] mb-0.5">
                    Figma Source
                  </dt>
                  <dd>
                    <a
                      href={figmaSourceUrl || normalizedOverview.figmaUrl || figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-900 font-medium hover:underline inline-flex items-center gap-1"
                    >
                      View in Figma ↗
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          )}
        </section>
      )}

      {/* 03 — HIGHLIGHTS */}
      {highlights && highlights.length > 0 && (
        <section
          id="highlights"
          aria-labelledby="heading-highlights"
          className="w-full mb-14 sm:mb-18 scroll-mt-24"
        >
          <h2
            id="heading-highlights"
            className="text-lg sm:text-xl font-medium tracking-tight text-neutral-900 mb-6"
          >
            Highlights
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-[720px]">
            {highlights.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-xl sm:text-2xl font-medium tracking-tight text-neutral-900">
                  {item.value}
                </span>
                <span className="text-xs text-neutral-500 leading-normal mt-1.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 04 — APPLICATION SCREENS (Visual-First Minimal Gallery) */}
      {hasScreenCategories ? (
        <section
          id="screens"
          aria-label="Application Screens Showcase"
          className="w-full mb-16 sm:mb-20"
        >
          <div className="mb-8">
            <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-400">
              Curated Screens
            </span>
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-neutral-900 mt-1">
              Application Screen Gallery
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl">
              Curated interface screens designed in Figma, structured by user journey and functional module. Click any screen to view in full resolution.
            </p>
          </div>

          <ApplicationScreenGallery
            categories={screenCategories}
            deviceType={deviceType}
          />
        </section>
      ) : null}

      {/* 05 — USER FLOWS & INTERFACE STATES */}
      {((userFlows && userFlows.length > 0) ||
        (stateFlows && stateFlows.length > 0)) && (
        <section id="flows" className="scroll-mt-24 mb-16">
          <ProjectFlowsSection
            flowsData={{ userFlows, stateFlows }}
            deviceType={deviceType}
          />
        </section>
      )}

      {/* 06 — SOLUTION (Fallback for projects without screenCategories, e.g. Game Campaigns) */}
      {!hasScreenCategories && solution && solution.blocks.length > 0 && (
        <section
          id="solution"
          aria-labelledby="heading-solution"
          className="w-full mb-14 sm:mb-18 scroll-mt-24"
        >
          <h2
            id="heading-solution"
            className="text-lg sm:text-xl font-medium tracking-tight text-neutral-900 mb-5"
          >
            Solution
          </h2>

          {solution.lead && (
            <p className="text-sm sm:text-base font-medium text-neutral-800 leading-snug mb-6 max-w-[700px]">
              {solution.lead}
            </p>
          )}

          <div className="flex flex-col gap-10">
            {solution.blocks.map((block, idx) => {
              const bodyParagraphs = Array.isArray(block.body)
                ? block.body
                : [block.body];

              return (
                <div key={idx} className="flex flex-col">
                  {block.subheading && (
                    <h3 className="text-sm sm:text-base font-medium text-neutral-900 mb-2">
                      {block.subheading}
                    </h3>
                  )}

                  {block.lead && (
                    <p className="text-xs sm:text-[13.5px] font-medium text-neutral-700 leading-normal mb-2 max-w-[700px]">
                      {block.lead}
                    </p>
                  )}

                  <div className="flex flex-col gap-2.5 max-w-[700px] mb-4">
                    {bodyParagraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Image Presentation Block */}
                  {block.imageGroup && (
                    <div>
                      {block.imageGroup.layout === "three-up" ? (
                        <ThreeUpImagePresentation
                          images={block.imageGroup.images}
                          caption={block.imageGroup.caption}
                          deviceType={deviceType}
                        />
                      ) : block.imageGroup.layout === "two-up" ? (
                        <TwoUpImagePresentation
                          images={block.imageGroup.images}
                          caption={block.imageGroup.caption}
                          deviceType={deviceType}
                        />
                      ) : (
                        <SingleImagePresentation
                          image={block.imageGroup.images[0]}
                          caption={block.imageGroup.caption}
                          deviceType={deviceType}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Fallback image gallery if neither categories nor solution blocks are provided */}
      {!hasScreenCategories && !solution && fallbackImages.length > 0 && (
        <section
          id="solution"
          aria-labelledby="heading-solution"
          className="w-full mb-14 sm:mb-18 scroll-mt-24"
        >
          <h2
            id="heading-solution"
            className="text-lg sm:text-xl font-medium tracking-tight text-neutral-900 mb-5"
          >
            Exploration &amp; Screens
          </h2>

          <div className="w-full my-6 bg-[#F1F1F1] rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col items-center gap-8">
            {fallbackImages.map((img) => (
              <div key={img.src} className="w-full flex justify-center">
                {deviceType === "desktop" ? (
                  <DesktopMockup src={img.src} alt={img.alt} title={img.title} />
                ) : (
                  <PhoneMockup src={img.src} alt={img.alt} title={img.title} />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 07 — BEHIND THE BUILD */}
      {behindTheBuild && behindTheBuild.paragraphs.length > 0 && (
        <section
          id="behind-the-build"
          aria-labelledby="heading-behind-build"
          className="w-full mb-14 sm:mb-18 scroll-mt-24"
        >
          <h2
            id="heading-behind-build"
            className="text-lg sm:text-xl font-medium tracking-tight text-neutral-900 mb-4"
          >
            Behind the build
          </h2>

          {behindTheBuild.lead && (
            <p className="text-sm sm:text-base font-medium text-neutral-800 leading-snug mb-3 max-w-[700px]">
              {behindTheBuild.lead}
            </p>
          )}

          <div className="flex flex-col gap-3 max-w-[700px] mb-4">
            {behindTheBuild.paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>

          {behindTheBuild.note && (
            <p className="text-[11px] text-neutral-400 font-mono mt-3">
              {behindTheBuild.note}
            </p>
          )}
        </section>
      )}

      {/* 08 — REFLECTION */}
      {reflection && reflection.paragraphs.length > 0 && (
        <section
          id="reflection"
          aria-labelledby="heading-reflection"
          className="w-full mb-14 sm:mb-18 scroll-mt-24"
        >
          <h2
            id="heading-reflection"
            className="text-lg sm:text-xl font-medium tracking-tight text-neutral-900 mb-4"
          >
            Reflection
          </h2>

          {reflection.lead && (
            <p className="text-sm sm:text-base font-medium text-neutral-800 leading-snug mb-3 max-w-[700px]">
              {reflection.lead}
            </p>
          )}

          <div className="flex flex-col gap-3 max-w-[700px]">
            {reflection.paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* 09 — OTHER PROJECTS */}
      {relatedProjects.length > 0 && (
        <section
          id="other-projects"
          aria-labelledby="heading-other-projects"
          className="w-full pt-10 border-t border-neutral-100 scroll-mt-24 mb-16"
        >
          <h2
            id="heading-other-projects"
            className="text-base sm:text-lg font-medium tracking-tight text-neutral-900 mb-6"
          >
            Other projects
          </h2>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.map((project) => {
              const catalogMatch =
                PORTFOLIO_PROJECTS.find(
                  (item) => project.preview && item.preview === project.preview,
                ) ??
                PORTFOLIO_PROJECTS.find(
                  (item) =>
                    item.slug === project.href.replace(/^\/work\//, ""),
                ) ??
                PORTFOLIO_PROJECTS.find(
                  (item) => item.liveUrl === project.href,
                );

              return (
                <article
                  key={project.href}
                  className="project-card group flex flex-col"
                >
                  {catalogMatch ? (
                    <div
                      className={`project-art art-${catalogMatch.preview}`}
                      aria-hidden={
                        catalogMatch.preview === "inventory" ||
                        catalogMatch.preview === "market"
                      }
                    >
                      <ProjectPreview
                        disableInnerLinks
                        project={catalogMatch}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[4/3] rounded-lg bg-[#F1F1F1] overflow-hidden flex items-center justify-center p-2">
                      {project.thumbnailSrc ? (
                        <Image
                          src={project.thumbnailSrc}
                          alt={project.thumbnailAlt ?? project.title}
                          fill
                          sizes="180px"
                          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        project.artwork
                      )}
                    </div>
                  )}
                  <h3 className="text-[12px] font-medium text-neutral-800 group-hover:text-neutral-950 transition-colors truncate px-1">
                    <TransitionLink href={project.href}>
                      {project.title}
                    </TransitionLink>
                  </h3>
                  <TransitionLink
                    className="text-[11px] text-neutral-500 hover:text-neutral-900 px-1"
                    href={project.href}
                  >
                    View case study <span aria-hidden="true">↗</span>
                  </TransitionLink>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}
