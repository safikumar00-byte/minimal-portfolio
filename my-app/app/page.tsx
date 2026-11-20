"use client";

import { useState } from "react";
import TransitionLink from "@/components/transition-link";
import EditorialRulerGrid from "@/components/portfolio/EditorialRulerGrid";
import PortfolioPreloader from "@/components/motion/PortfolioPreloader";
import FadeContent from "@/components/motion/FadeContent";
import GooeyNav, { type GooeyNavItem } from "@/components/ui/GooeyNav";
import {
  PORTFOLIO_PROJECTS,
  ProjectPreview,
  type Category,
} from "@/lib/projects-catalog";

const FILTER_VALUES = ["all", "design", "development"] as const;
const FILTER_ITEMS: GooeyNavItem[] = [
  { label: "All" },
  { label: "Design" },
  { label: "Development" },
];

export default function Home() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [isPreloaded, setIsPreloaded] = useState(false);

  const visibleProjects =
    filter === "all"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((project) =>
        project.categories.includes(filter),
      );

  return (
    <>
      <PortfolioPreloader onComplete={() => setIsPreloaded(true)} />
      {isPreloaded && (
          <FadeContent
            trigger="mount"
            effect="mist"
            duration={1.4}
            ease="power2.out"
            stagger={1.08}
          >
            <main className="portfolio-shell portfolio-layout" id="top">
              <aside className="intro-column">
                <section className="intro-copy" id="about">
                  <h1>Making complicated things easier to use.</h1>
                  <p>
                    I&apos;m Sunil, a multidisciplinary UI/UX and graphic designer who
                    also builds for the web. I work across fintech, enterprise products,
                    and digital experiences.
                  </p>
                </section>

                <footer className="contact-block" id="contact">
                  <div className="contact-links">
                    <a href="mailto:vsunilkumarvzg@gmail.com">Email</a>
                    <a href="https://www.linkedin.com/in/sunilkumarvzg/" target="_blank" rel="noreferrer">
                      LinkedIn <span aria-hidden="true">↗</span>
                    </a>
                    <a href="https://www.behance.net/8fc59bee" target="_blank" rel="noreferrer">
                      Behance <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                  <p>Based in Visakhapatnam, India. Working across design and front-end development.</p>
                  <small>Designed and built with care, code, and AI-assisted workflows.</small>
                </footer>
              </aside>

              <section className="work-column" aria-label="Selected projects">
                <div className="work-toolbar">
                  <GooeyNav
                    ariaLabel="Project category filter"
                    items={FILTER_ITEMS}
                    activeIndex={FILTER_VALUES.indexOf(filter)}
                    onChange={(index) => {
                      const nextFilter = FILTER_VALUES[index];
                      if (nextFilter) setFilter(nextFilter);
                    }}
                    theme="light"
                    size="sm"
                    frame
                    color="#18181b"
                    activeTextColor="#ffffff"
                    gooeyness={0.5}
                    wobble={0.5}
                    particleCount={15}
                    spread={56}
                    animationTime={600}
                    className="project-filter-nav"
                  />
                </div>

                {/* Editorial Ruler Grid Header */}
                <EditorialRulerGrid />

                <div className="project-grid">
                  {visibleProjects.map((project) => (
                    <article className="project-card" key={project.title}>
                      <div
                        className={`project-art art-${project.preview}`}
                        aria-hidden={
                          project.preview === "inventory" ||
                          project.preview === "market"
                        }
                      >
                        <ProjectPreview project={project} />
                      </div>
                      <h2>
                        {project.slug ? (
                          <TransitionLink className="project-title-link" href={`/work/${project.slug}`}>
                            {project.title}
                          </TransitionLink>
                        ) : (
                          project.title
                        )}
                      </h2>
                      <ul className="project-tags" aria-label="Project categories">
                        {project.tags.map((tag) => (
                          <li key={tag} className={tag === "Online" ? "tag-online" : ""}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <div className="project-links">
                        {project.slug && (
                          <TransitionLink className="project-case-link" href={`/work/${project.slug}`}>
                            View case study <span aria-hidden="true">↗</span>
                          </TransitionLink>
                        )}
                        {project.liveUrl && (
                          <a
                            className="project-live-link"
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Live site <span aria-hidden="true">↗</span>
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </main>
          </FadeContent>
      )}
    </>
  );
}
