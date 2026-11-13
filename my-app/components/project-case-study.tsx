import Link from "next/link";
import SiteHeader from "@/components/site-header";
import { PhoneCarousel } from "@/components/ui/phone-carousel";
import type { PhoneProject } from "@/lib/phone-projects";

export default function ProjectCaseStudy({
  project,
}: {
  project: PhoneProject;
}) {
  return (
    <div className="portfolio-shell">
      <SiteHeader />
      <main className="case-study-page">
        <Link className="case-study-back" href="/">
          <span aria-hidden="true">←</span> All selected work
        </Link>

        <section className="case-study-hero">
          <div className="case-study-intro">
            <p className="case-study-eyebrow">{project.platform}</p>
            <h1>{project.title}</h1>
            <p className="case-study-summary">{project.summary}</p>
            <ul className="case-study-tags">
              {project.focusAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
          <PhoneCarousel images={project.images} label={project.title} />
        </section>

        <section className="case-study-overview">
          <p className="case-study-eyebrow">PROJECT OVERVIEW</p>
          <h2>Designed around the complete product journey.</h2>
          <p>{project.overview}</p>
          <p className="case-study-source-note">
            Screens shown are from the supplied design files. Product behavior
            and flow descriptions are based on those screens.
          </p>
        </section>
      </main>
    </div>
  );
}
