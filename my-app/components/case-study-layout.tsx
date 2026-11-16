import Image from "next/image";
import TransitionLink from "@/components/transition-link";
import CaseStudySidebar, {
  type CaseStudyNavigationItem,
} from "@/components/case-study-sidebar";

export type CaseStudySection = CaseStudyNavigationItem & {
  content: React.ReactNode;
};

export type RelatedProject = {
  title: string;
  href: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  artwork?: React.ReactNode;
};

export default function CaseStudyLayout({
  title,
  summary,
  tags,
  hero,
  sections,
  relatedProjects,
}: {
  title: string;
  summary: string;
  tags: string[];
  hero: React.ReactNode;
  sections: CaseStudySection[];
  relatedProjects: RelatedProject[];
}) {
  return (
    <div className="portfolio-shell">
      <main className="case-study-page">
        <aside className="case-study-sidebar">
          <CaseStudySidebar
            title={title}
            summary={summary}
            tags={tags}
            sections={sections}
          />
        </aside>

        <div className="case-study-content">
          <div className="case-study-hero">{hero}</div>

          <div className="case-study-sections">
            {sections.map((section) => (
              <section
                className="case-study-section"
                id={section.id}
                key={section.id}
              >
                <h2>{section.title}</h2>
                <div className="case-study-section-content">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          <section className="case-study-other-projects">
            <h2>Other projects</h2>
            <div className="case-study-project-list">
              {relatedProjects.map((project) => (
                <TransitionLink
                  aria-label={`View ${project.title}`}
                  className="case-study-project-link"
                  href={project.href}
                  key={project.href}
                >
                  <span className="case-study-project-thumbnail">
                    {project.thumbnailSrc ? (
                      <Image
                        alt={project.thumbnailAlt ?? ""}
                        fill
                        sizes="(max-width: 760px) 140px, 112px"
                        src={project.thumbnailSrc}
                      />
                    ) : (
                      project.artwork
                    )}
                  </span>
                  <span className="case-study-project-title">{project.title}</span>
                </TransitionLink>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
