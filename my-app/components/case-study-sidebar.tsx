"use client";

import * as React from "react";
import TransitionLink from "@/components/transition-link";

export type CaseStudyNavigationItem = {
  id: string;
  title: string;
};

export default function CaseStudySidebar({
  title,
  summary,
  tags,
  sections,
}: {
  title: string;
  summary: string;
  tags: string[];
  sections: CaseStudyNavigationItem[];
}) {
  const [activeSection, setActiveSection] = React.useState(
    sections[0]?.id ?? "",
  );

  React.useEffect(() => {
    const targets = sections
      .map(({ id }) => document.getElementById(id))
      .filter((target): target is HTMLElement => target !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          );
        const firstVisible = visibleSections[0];

        if (firstVisible) setActiveSection(firstVisible.target.id);
      },
      {
        rootMargin: "-18% 0px -68% 0px",
        threshold: 0,
      },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      <div className="case-study-sidebar-intro">
        <TransitionLink className="case-study-back" href="/">
          <span aria-hidden="true">←</span> Back to home
        </TransitionLink>

        <ul className="case-study-tags" aria-label="Project categories">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <h1>{title}</h1>
        <p className="case-study-summary">{summary}</p>
      </div>

      <nav className="case-study-section-nav" aria-label="Case study sections">
        {sections.map((section) => (
          <a
            aria-current={activeSection === section.id ? "location" : undefined}
            className={activeSection === section.id ? "is-active" : ""}
            href={`#${section.id}`}
            key={section.id}
          >
            {section.title}
          </a>
        ))}
      </nav>
    </>
  );
}
