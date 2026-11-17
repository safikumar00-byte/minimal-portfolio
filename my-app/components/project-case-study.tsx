"use client";

import * as React from "react";
import PageTransition from "@/components/page-transition";
import CaseStudyLayout from "@/components/case-study-layout";
import ProjectCaseStudyContent, {
  type RelatedProjectItem,
} from "@/components/ProjectCaseStudyContent";
import PortfolioTicket from "@/components/portfolio/PortfolioTicket";
import type { PhoneProject } from "@/lib/phone-projects";
import type { SectionNavItem } from "@/components/ProjectSectionNavigation";

const ALL_RELATED_PROJECTS: RelatedProjectItem[] = [
  {
    title: "TurboPaisa",
    href: "/work/turbopaisa",
    thumbnailSrc:
      "/work/turbopaisa/turbopaisa-home-rewards-dashboard-default-01.jpg",
    thumbnailAlt: "TurboPaisa mobile app home screen",
  },
  {
    title: "CredBuddha",
    href: "/work/credbuddha",
    thumbnailSrc:
      "/work/credbuddha/credbuddha-loan-discovery-dashboard-feed-default-01.jpg",
    thumbnailAlt: "CredBuddha mobile app home screen",
  },
  {
    title: "Core Volt Matrix",
    href: "/work/cvm-hrm",
    thumbnailSrc:
      "/work/cvm-hrm/cvm-hrms-dashboard-overview-default-01.jpg",
    thumbnailAlt: "Core Volt Matrix HRMS dashboard",
  },
  {
    title: "Game & Campaign Landing Pages",
    href: "/work/game-campaigns",
    artwork: (
      <PortfolioTicket
        dates="DIGITAL EXPERIENCES"
        href=""
        name={"GAME & CAMPAIGN\nLANDING PAGES"}
        presenter="INTERACTIVE EXPERIENCES PRESENT"
        stubText="EXPLORE"
        tilt={false}
        venue="CREATIVE DEVELOPMENT"
        watermark="PLAY"
        width={130}
      />
    ),
  },
];

export default function ProjectCaseStudy({
  project,
}: {
  project: PhoneProject;
}) {
  const relatedProjects = ALL_RELATED_PROJECTS.filter(
    (p) => p.href !== `/work/${project.slug}`,
  );

  // Dynamically assemble right-rail navigation items based on actual content
  const navItems: SectionNavItem[] = [];

  if (project.overviewData || project.overview) {
    navItems.push({ id: "overview", label: "Overview" });
  }

  if (project.highlights && project.highlights.length > 0) {
    navItems.push({ id: "highlights", label: "Highlights" });
  }

  if (
    (project.userFlows && project.userFlows.length > 0) ||
    (project.stateFlows && project.stateFlows.length > 0)
  ) {
    navItems.push({ id: "flows", label: "User & State Flows" });
  }

  if (
    (project.solution && project.solution.blocks.length > 0) ||
    project.images.length > 0
  ) {
    navItems.push({ id: "solution", label: "Solution" });
  }

  if (project.behindTheBuild && project.behindTheBuild.paragraphs.length > 0) {
    navItems.push({ id: "behind-the-build", label: "Behind the build" });
  }

  if (project.reflection && project.reflection.paragraphs.length > 0) {
    navItems.push({ id: "reflection", label: "Reflection" });
  }

  if (relatedProjects.length > 0) {
    navItems.push({ id: "other-projects", label: "Other projects" });
  }

  return (
    <PageTransition>
      <CaseStudyLayout
        title={project.title}
        summary={project.shortDescription ?? project.summary}
        categoryTags={
          project.categoryTags ?? [
            project.platform,
            ...project.focusAreas.slice(0, 2),
          ]
        }
        year={project.year}
        status={project.status}
        figmaUrl={project.figmaUrl}
        navItems={navItems}
      >
        <ProjectCaseStudyContent
          deviceType={project.deviceType ?? "phone"}
          heroImage={project.images[0]}
          overview={project.overviewData ?? project.overview}
          highlights={project.highlights}
          userFlows={project.userFlows}
          stateFlows={project.stateFlows}
          figmaUrl={project.figmaUrl}
          solution={project.solution}
          behindTheBuild={project.behindTheBuild}
          reflection={project.reflection}
          relatedProjects={relatedProjects}
          fallbackImages={project.images}
        />
      </CaseStudyLayout>
    </PageTransition>
  );
}
