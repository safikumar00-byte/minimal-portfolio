"use client";

import * as React from "react";
import { useState } from "react";
import TransitionLink from "@/components/transition-link";
import { PhoneCarousel } from "@/components/ui/phone-carousel";
import { DesktopCarousel } from "@/components/ui/desktop-carousel";
import { BrandFolderPreview } from "@/components/ui/brand-folder-preview";
import {
  LiveAppLogoPreview,
  MARK_KARYOTICA,
} from "@/components/ui/live-app-logo-preview";
import {
  credBuddhaProject,
  cvmHrmProject,
  turboPaisaProject,
} from "@/lib/phone-projects";
import LiquidGraphicGallery from "@/components/liquid-graphic-gallery";
import InfiniteGraphicGallery from "@/components/infinite-graphic-gallery"
import PortfolioTicket from "@/components/portfolio/PortfolioTicket";
import EditorialRulerGrid from "@/components/portfolio/EditorialRulerGrid";
import PortfolioPreloader from "@/components/portfolio/PortfolioPreloader";

type Category = "design" | "development";
type PreviewKind =
  | "liquid-carousel"
  | "turbopaisa"
  | "credbuddha"
  | "live-logo"
  | "brand"
  | "ticket"
  | "hrms"
  | "inventory"
  | "market";

type ProjectItem = {
  slug?: string;
  liveUrl?: string;
  title: string;
  tags: string[];
  categories: Category[];
  preview: PreviewKind;
  logo?: string;
  logoColor?: string;
};

const projects: ProjectItem[] = [
  {
    title: "Graphic design",
    tags: ["Brand identity", "Campaigns", "Social media"],
    categories: ["design"],
    preview: "liquid-carousel",
  },
  {
    slug: turboPaisaProject.slug,
    title: turboPaisaProject.title,
    tags: ["Product design", "Mobile app", "Rewards"],
    categories: ["design"],
    preview: "turbopaisa",
  },
  {
    slug: credBuddhaProject.slug,
    title: credBuddhaProject.title,
    tags: ["Product design", "Fintech", "Mobile app"],
    categories: ["design"],
    preview: "credbuddha",
  },
  {
    liveUrl: "https://karyotica.ca",
    title: "Karyotica Labs — brand experience & website revamp",
    tags: ["Online", "Branding", "UI/UX", "Next.js"],
    categories: ["design", "development"],
    preview: "live-logo",
    logo: MARK_KARYOTICA,
    logoColor: "#86bb46",
  },
  {
    title: "Brand identity systems & design archives",
    tags: ["Brand archive", "Design systems", "macOS gallery"],
    categories: ["design"],
    preview: "brand",
  },
  {
    slug: "game-campaigns",
    title: "Game landing pages & campaign experiences",
    tags: ["Interactive", "Creative dev", "WebGL shader"],
    categories: ["design", "development"],
    preview: "ticket",
  },
  {
    slug: cvmHrmProject.slug,
    title: "Core Volt Matrix — enterprise HRMS platform",
    tags: ["Product design", "React.js", "Tailwind CSS"],
    categories: ["design", "development"],
    preview: "hrms",
  },
  {
    title: "Visionicx — enterprise mobile application",
    tags: ["React Native", "Expo", "40+ screens"],
    categories: ["development"],
    preview: "inventory",
  },
  {
    title: "Cross-device trade signal application",
    tags: ["Product design", "Firebase", "Supabase"],
    categories: ["design", "development"],
    preview: "market",
  },
];

function ProjectPreview({ project }: { project: ProjectItem }) {
  const { preview: kind } = project;
  if (kind === "liquid-carousel") {
    // return <LiquidGraphicGallery />;
    return <InfiniteGraphicGallery />;
  }

  if (kind === "turbopaisa") {
    return (
      <PhoneCarousel
        images={turboPaisaProject.images}
        label={turboPaisaProject.title}
        compact
      />
    );
  }

  if (kind === "credbuddha") {
    return (
      <PhoneCarousel
        images={credBuddhaProject.images}
        label={credBuddhaProject.title}
        compact
      />
    );
  }

  if (kind === "live-logo") {
    return (
      <LiveAppLogoPreview
        logo={project.logo || MARK_KARYOTICA}
        logoColor={project.logoColor || "#86bb46"}
        label={project.title}
      />
    );
  }

  if (kind === "brand") {
    return <BrandFolderPreview />;
  }

  if (kind === "ticket") {
    return (
      <PortfolioTicket
        presenter="INTERACTIVE EXPERIENCES PRESENT"
        name={"GAME & CAMPAIGN\nLANDING PAGES"}
        venue="CREATIVE DEVELOPMENT"
        dates="DIGITAL EXPERIENCES"
        stubText="EXPLORE"
        watermark="PLAY"
        href="/work/game-campaigns"
      />
    );
  }

  if (kind === "hrms") {
    return (
      <DesktopCarousel
        images={cvmHrmProject.images}
        label={cvmHrmProject.title}
        compact
      />
    );
  }

  if (kind === "market") {
    return (
      <div className="market-preview">
        <div className="market-heading"><strong>Market signals</strong><i /></div>
        <div className="market-summary"><i /><i /><i /></div>
        <div className="market-chart">
          {[30, 48, 39, 68, 51, 76, 62, 90, 72, 100, 79, 94].map((height, index) => (
            <i key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
        <div className="market-footer"><i /><i /><i /><i /></div>
      </div>
    );
  }

  return (
    <div className="inventory-phone">
      <div className="inventory-speaker" />
      <span>VISIONICX</span>
      <strong>Inventory</strong>
      <div className="inventory-search" />
      <div className="inventory-row"><i /><span /><b /></div>
      <div className="inventory-row"><i /><span /><b /></div>
      <div className="inventory-row"><i /><span /><b /></div>
      <div className="inventory-row"><i /><span /><b /></div>
      <div className="inventory-nav"><i /><i /><i /></div>
    </div>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [isPreloaded, setIsPreloaded] = useState(false);

  const handlePreloadComplete = React.useCallback(() => {
    setIsPreloaded(true);
  }, []);

  const visibleProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.categories.includes(filter));

  return (
    <>
      <PortfolioPreloader onComplete={handlePreloadComplete} />
      <div
        className={`portfolio-shell transition-opacity duration-500 ease-out ${isPreloaded ? "opacity-100" : "opacity-95"
          }`}
      >
          <main className="portfolio-layout" id="top">
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
              <div className="filter-control" aria-label="Filter projects">
                {(["all", "design", "development"] as const).map((value) => (
                  <button
                    aria-pressed={filter === value}
                    className={filter === value ? "active" : ""}
                    key={value}
                    onClick={() => setFilter(value)}
                    type="button"
                  >
                    {value === "all" ? "All" : value[0].toUpperCase() + value.slice(1)}
                  </button>
                ))}
              </div>
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
      </div>
    </>
  );
}
