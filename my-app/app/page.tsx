"use client";

import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import LiquidGraphicGallery from "@/components/liquid-graphic-gallery";
import { PhoneCarousel } from "@/components/ui/phone-carousel";
import {
  credBuddhaProject,
  turboPaisaProject,
} from "@/lib/phone-projects";

type Category = "design" | "development";
type PreviewKind =
  | "liquid-carousel"
  | "turbopaisa"
  | "credbuddha"
  | "brand"
  | "hrms"
  | "inventory"
  | "market";

const projects: {
  slug?: string;
  title: string;
  tags: string[];
  categories: Category[];
  preview: PreviewKind;
}[] = [
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
    title: "Karyotica Labs — brand experience & website revamp",
    tags: ["Branding", "UI/UX", "Next.js"],
    categories: ["design", "development"],
    preview: "brand",
  },
  {
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

function ProjectPreview({ kind }: { kind: PreviewKind }) {
  if (kind === "liquid-carousel") {
    return <LiquidGraphicGallery />;
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

  if (kind === "brand") {
    return (
      <div className="brand-preview">
        <div className="browser-bar"><i /><i /><i /></div>
        <span className="brand-kicker">AGRICULTURE · BIOTECH</span>
        <strong>Karyotica<br />Labs</strong>
        <div className="brand-shapes"><i /><i /><i /></div>
      </div>
    );
  }

  if (kind === "hrms") {
    return (
      <div className="hrms-preview">
        <div className="dashboard-sidebar"><i /><i /><i /><i /></div>
        <div className="dashboard-main">
          <div className="dashboard-heading"><strong>People dashboard</strong><i /></div>
          <div className="dashboard-metrics"><i /><i /><i /></div>
          <div className="dashboard-chart"><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="dashboard-footer"><i /><i /><i /></div>
        </div>
      </div>
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
  const visibleProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.categories.includes(filter));

  return (
    <div className="portfolio-shell">
      <SiteHeader />
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

          <div className="project-grid">
            {visibleProjects.map((project) => (
              <article className="project-card" key={project.title}>
                <div
                  className={`project-art art-${project.preview}`}
                  aria-hidden={
                    project.preview === "brand" ||
                    project.preview === "hrms" ||
                    project.preview === "inventory" ||
                    project.preview === "market"
                  }
                >
                  <ProjectPreview kind={project.preview} />
                </div>
                <h2>
                  {project.slug ? (
                    <Link className="project-title-link" href={`/work/${project.slug}`}>
                      {project.title}
                    </Link>
                  ) : (
                    project.title
                  )}
                </h2>
                <ul className="project-tags" aria-label="Project categories">
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                {project.slug && (
                  <Link className="project-case-link" href={`/work/${project.slug}`}>
                    View case study <span aria-hidden="true">↗</span>
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
