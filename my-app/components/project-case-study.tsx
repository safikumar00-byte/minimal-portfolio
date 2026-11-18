"use client";

import * as React from "react";
import CaseStudyLayout from "@/components/case-study-layout";
import ProjectCaseStudyContent from "@/components/ProjectCaseStudyContent";
import type { PhoneProject } from "@/lib/phone-projects";
import type { SectionNavItem } from "@/components/ProjectSectionNavigation";
import { getProjectScreenCategories } from "@/lib/case-study-screens";
import RELATED_PROJECTS from "@/lib/related-projects";

export default function ProjectCaseStudy({
  project,
}: {
  project: PhoneProject;
}) {
  const relatedProjects = RELATED_PROJECTS.filter(
    (p) => p.href !== `/work/${project.slug}`,
  );

  const screenCategories = getProjectScreenCategories(project.slug);
  const hasCategories = screenCategories.length > 0;

  // Dynamically assemble right-rail navigation items
  const navItems: SectionNavItem[] = [];

  if (project.figmaEmbedUrl) {
    navItems.push({ id: "figma-embed", label: "Figma Canvas" });
  }

  if (project.overviewData || project.overview) {
    navItems.push({ id: "overview", label: "Overview" });
  }

  if (hasCategories) {
    // Add screen folders as primary index
    screenCategories.forEach((cat) => {
      navItems.push({
        id: cat.id,
        label: cat.label,
        count: cat.screens.length,
      });
    });
  } else {
    // Fallback for non-screen projects (e.g. game campaigns)
    if (project.highlights && project.highlights.length > 0) {
      navItems.push({ id: "highlights", label: "Highlights" });
    }
    if (project.solution && project.solution.blocks.length > 0) {
      navItems.push({ id: "solution", label: "Solution" });
    }
  }

  if (
    (project.userFlows && project.userFlows.length > 0) ||
    (project.stateFlows && project.stateFlows.length > 0)
  ) {
    navItems.push({ id: "flows", label: "User & State Flows" });
  }

  if (!hasCategories && project.behindTheBuild && project.behindTheBuild.paragraphs.length > 0) {
    navItems.push({ id: "behind-the-build", label: "Behind the build" });
  }

  if (!hasCategories && project.reflection && project.reflection.paragraphs.length > 0) {
    navItems.push({ id: "reflection", label: "Reflection" });
  }

  if (relatedProjects.length > 0) {
    navItems.push({ id: "other-projects", label: "Other projects" });
  }

  return (
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
        figmaUrl={project.figmaSourceUrl || project.figmaUrl}
        navItems={navItems}
        navTitle={hasCategories ? "APPLICATION SCREENS" : "ON THIS PAGE"}
      >
        <ProjectCaseStudyContent
          title={project.title}
          deviceType={project.deviceType ?? "phone"}
          heroImage={project.images[0]}
          figmaEmbedUrl={project.figmaEmbedUrl}
          figmaSourceUrl={project.figmaSourceUrl || project.figmaUrl}
          screenCategories={screenCategories}
          overview={project.overviewData ?? project.overview}
          highlights={project.highlights}
          userFlows={project.userFlows}
          stateFlows={project.stateFlows}
          figmaUrl={project.figmaSourceUrl || project.figmaUrl}
          solution={project.solution}
          behindTheBuild={project.behindTheBuild}
          reflection={project.reflection}
          relatedProjects={relatedProjects}
          fallbackImages={project.images}
        />
      </CaseStudyLayout>
  );
}
