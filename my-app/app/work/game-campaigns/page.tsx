import type { Metadata } from "next";
import Link from "next/link";
import PageTransition from "@/components/page-transition";
import PortfolioTicket from "@/components/portfolio/PortfolioTicket";

export const metadata: Metadata = {
  title: "Game Landing Pages & Campaign Experiences — Sunil Kumar Reddy",
  description:
    "Creative development and digital experiences for game landing pages, interactive campaigns, and motion-driven web experiences.",
};

const CAMPAIGN_EXPERIENCES = [
  {
    category: "Game Landing Pages",
    headline: "Immersive narrative teasers & title reveals",
    description:
      "Crafting high-impact landing pages for indie and studio game announcements. Integrating custom 3D viewports, canvas shaders, sound design, and character showcases that build anticipation and drive pre-registrations.",
    skills: ["WebGL / Three.js", "Sound Design", "GLSL Shaders", "Interactive Storytelling"],
  },
  {
    category: "Interactive Campaign Websites",
    headline: "Gamified product launches & interactive microsites",
    description:
      "Engaging promotional websites that transform traditional marketing into interactive experiences. Built with physics-driven UI, scroll-reactive timelines, and gamified mechanics that maximize user engagement.",
    skills: ["Creative Development", "Motion Design", "Scroll Interactions", "React & Canvas"],
  },
  {
    category: "Product Launch Campaigns",
    headline: "High-octane reveal destinations for modern tech brands",
    description:
      "Bridging cinematic 3D models, smooth fluid typography, and dynamic lighting to give flagship hardware and software launches an editorial, tactile stage.",
    skills: ["3D Product Rendering", "Performance Optimization", "Responsive Typography", "Touch Interactions"],
  },
  {
    category: "Motion-Driven Landing Pages",
    headline: "Kinetic typography, micro-interactions & fluid transitions",
    description:
      "Fluid, choreographed web choreography where every scroll, hover, and gesture feels tactile and responsive. Balancing expressive aesthetics with 60fps performance across devices.",
    skills: ["Framed Animations", "Pointer Follow Physics", "Adaptive Sizing", "Reduced Motion Support"],
  },
  {
    category: "Experimental Web Experiences",
    headline: "Dithered shaders, retro-computing aesthetics & generative art",
    description:
      "Explorations into hardware-accelerated shaders, screen-space dithering, raymarched volumetric effects, and custom procedural textures inspired by print ephemera and vintage tech.",
    skills: ["Bayer Matrix Dithering", "Custom Perforation Math", "Generative Textures", "GPU Computing"],
  },
];

export default function GameCampaignsPage() {
  return (
    <PageTransition>
      <div className="portfolio-shell">
        <main className="case-study-page pb-24">
        <Link className="case-study-back" href="/">
          <span aria-hidden="true">←</span> All selected work
        </Link>

        {/* Hero Section */}
        <section className="case-study-hero case-study-hero--desktop">
          <div className="case-study-intro">
            <p className="case-study-eyebrow">CREATIVE DEVELOPMENT • DIGITAL EXPERIENCES</p>
            <h1>Game &amp; Campaign Landing Pages</h1>
            <p className="case-study-summary">
              A dedicated creative development collection exploring high-impact game landing pages,
              interactive promotional microsites, and motion-driven web experiences with custom shaders and 3D interactions.
            </p>
            <ul className="case-study-tags">
              <li>Creative Development</li>
              <li>WebGL &amp; Shaders</li>
              <li>Motion Design</li>
              <li>Game Landing Pages</li>
              <li>Digital Campaigns</li>
            </ul>
          </div>

          <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-[460px]">
              <PortfolioTicket
                presenter="INTERACTIVE EXPERIENCES PRESENT"
                name={"GAME & CAMPAIGN\nLANDING PAGES"}
                venue="CREATIVE DEVELOPMENT"
                dates="DIGITAL EXPERIENCES"
                stubText="EXPLORE"
                watermark="PLAY"
                href="" // on the destination page itself, no outer link needed
              />
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="case-study-overview border-t border-neutral-200 pt-10 mt-10">
          <p className="case-study-eyebrow">DISCIPLINE OVERVIEW</p>
          <h2>Where game aesthetics meet production-grade web craft.</h2>
          <p>
            Modern game and entertainment campaigns demand more than static banners and flat layouts.
            They require immersive worldbuilding, real-time tactile responsiveness, and cinematic pacing.
            This collection encompasses custom WebGL shader development, physics-based mouse interactions,
            responsive typography scaling, and performance-tuned motion engines designed to run smoothly
            across both desktop and mobile devices.
          </p>
        </section>

        {/* Focus Areas Grid */}
        <section className="mt-14">
          <p className="case-study-eyebrow">CORE EXPERIENCES &amp; CAPABILITIES</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {CAMPAIGN_EXPERIENCES.map((exp) => (
              <div
                key={exp.category}
                className="p-6 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-white hover:border-neutral-300 transition-all duration-200"
              >
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                  {exp.category}
                </span>
                <h3 className="text-base font-medium text-neutral-900 mt-2 mb-3">
                  {exp.headline}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-2 py-1 bg-white border border-neutral-200 rounded text-neutral-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        </main>
      </div>
    </PageTransition>
  );
}
