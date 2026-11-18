"use client";

import { BrandFolderPreview } from "@/components/ui/BrandFolderPreview";
import { DesktopCarousel } from "@/components/ui/DesktopCarousel";
import InfiniteGraphicGallery from "@/components/infinite-graphic-gallery";
import {
  LiveAppLogoPreview,
  MARK_KARYOTICA,
} from "@/components/ui/LiveAppLogoPreview";
import { PhoneCarousel } from "@/components/ui/PhoneCarousel";
import PortfolioTicket from "@/components/portfolio/PortfolioTicket";
import {
  credBuddhaProject,
  cvmHrmProject,
  turboPaisaProject,
} from "@/lib/phone-projects";

export type Category = "design" | "development";

export type PreviewKind =
  | "liquid-carousel"
  | "turbopaisa"
  | "credbuddha"
  | "live-logo"
  | "brand"
  | "ticket"
  | "hrms"
  | "inventory"
  | "market";

export type ProjectItem = {
  slug?: string;
  liveUrl?: string;
  title: string;
  tags: string[];
  categories: Category[];
  preview: PreviewKind;
  logo?: string;
  logoColor?: string;
};

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
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
    slug: cvmHrmProject.slug,
    title: "Core Volt Matrix — enterprise HRMS platform",
    tags: ["Product design", "React.js", "Tailwind CSS"],
    categories: ["design", "development"],
    preview: "hrms",
  },
  {
    title: "Brand identity systems & design archives",
    tags: ["Brand archive", "Design systems", "macOS gallery"],
    categories: ["design"],
    preview: "brand",
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
    slug: "game-campaigns",
    title: "Game landing pages & campaign experiences",
    tags: ["Interactive", "Creative dev", "WebGL shader"],
    categories: ["design", "development"],
    preview: "ticket",
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

export function ProjectPreview({
  project,
  disableInnerLinks = false,
}: {
  project: ProjectItem;
  disableInnerLinks?: boolean;
}) {
  const { preview: kind } = project;
  if (kind === "liquid-carousel") {
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
        href={disableInnerLinks ? undefined : "/work/game-campaigns"}
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
