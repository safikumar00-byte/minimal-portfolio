import type { Metadata } from "next";
import PageTransition from "@/components/page-transition";
import PortfolioTicket from "@/components/portfolio/PortfolioTicket";
import CaseStudyLayout from "@/components/case-study-layout";
import ProjectCaseStudyContent, {
  type RelatedProjectItem,
} from "@/components/ProjectCaseStudyContent";
import type { SectionNavItem } from "@/components/ProjectSectionNavigation";

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

const RELATED_PROJECTS: RelatedProjectItem[] = [
  {
    title: "TurboPaisa",
    href: "/work/turbopaisa",
    thumbnailSrc:
      "/figma/turbopaisa/screens/home-dashboard/turbopaisa-home-rewards-dashboard-default-01.jpg",
    thumbnailAlt: "TurboPaisa mobile app home screen",
  },
  {
    title: "CredBuddha",
    href: "/work/credbuddha",
    thumbnailSrc:
      "/figma/credbuddha/screens/loan-discovery/credbuddha-loan-discovery-dashboard-feed-default-01.jpg",
    thumbnailAlt: "CredBuddha mobile app home screen",
  },
  {
    title: "Core Volt Matrix",
    href: "/work/cvm-hrm",
    thumbnailSrc:
      "/figma/cvm-hrms/screens/dashboard/cvm-hrms-dashboard-overview-default-01.jpg",
    thumbnailAlt: "Core Volt Matrix HRMS dashboard",
  },
];

const NAV_ITEMS: SectionNavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "highlights", label: "Highlights" },
  { id: "solution", label: "Core experiences" },
  { id: "behind-the-build", label: "Behind the build" },
  { id: "reflection", label: "Reflection" },
  { id: "other-projects", label: "Other projects" },
];

export default function GameCampaignsPage() {
  return (
    <PageTransition>
      <CaseStudyLayout
        title="Game & Campaign Landing Pages"
        summary="A dedicated creative development collection exploring high-impact game landing pages, interactive promotional microsites, and motion-driven web experiences."
        categoryTags={["Creative Dev", "WebGL & Shaders", "2024–2026"]}
        year="2024–2026"
        status="Interactive"
        navItems={NAV_ITEMS}
      >
        <ProjectCaseStudyContent
          heroCustom={
            <div className="w-full max-w-[440px] flex items-center justify-center py-4">
              <PortfolioTicket
                presenter="INTERACTIVE EXPERIENCES PRESENT"
                name={"GAME & CAMPAIGN\nLANDING PAGES"}
                venue="CREATIVE DEVELOPMENT"
                dates="DIGITAL EXPERIENCES"
                stubText="EXPLORE"
                watermark="PLAY"
                href=""
              />
            </div>
          }
          overview={{
            lead: "Where game aesthetics meet production-grade web craft.",
            description: [
              "Modern game and entertainment campaigns demand more than static banners and flat layouts. They require immersive worldbuilding, real-time tactile responsiveness, and cinematic pacing.",
              "This collection encompasses custom WebGL shader development, physics-based mouse interactions, responsive typography scaling, and performance-tuned motion engines designed to run smoothly across both desktop and mobile devices.",
            ],
            role: "Creative Developer & Interactive Designer · 2024–2026",
            timeline: "2024–2026",
            tools: ["Three.js", "WebGL / GLSL", "React", "Canvas API", "Tailwind CSS"],
          }}
          highlights={[
            {
              value: "GLSL Shaders",
              label: "Real-time dithering, grain & screen-space effects",
            },
            {
              value: "60 FPS Motion",
              label: "GPU-accelerated pointer physics and frame timing",
            },
            {
              value: "Adaptive UI",
              label: "Touch gestures, fallback canvas, and fluid typography",
            },
          ]}
          solution={{
            lead: "Five foundational design and engineering disciplines powering high-engagement interactive campaigns.",
            blocks: [
              {
                subheading: "Focus Areas & Interactive Capabilities",
                lead: "Bridging cinematic 3D models, smooth fluid typography, and dynamic lighting to give flagship hardware and software launches an editorial, tactile stage.",
                body: "From announcement teasers to interactive title reveals, each module is engineered to capture attention, communicate lore, and drive user registration.",
              },
            ],
          }}
          behindTheBuild={{
            lead: "Shader mathematics, screen-space dithering, and canvas performance.",
            paragraphs: [
              "Interactive web experiences frequently stumble on low-end hardware. Rather than relying on heavy uncompressed video files, we utilize lightweight procedural GLSL fragment shaders—such as Bayer matrix ordered dithering and perlin noise—that calculate effects per-pixel on the GPU.",
              "Animations are tied directly to requestAnimationFrame with delta-time clamping, ensuring fluid 60fps pacing regardless of display refresh rate.",
            ],
            note: "Built with modern WebGL2 standards and progressive canvas fallbacks for full device compatibility.",
          }}
          reflection={{
            lead: "Spectacle is meaningless without responsiveness.",
            paragraphs: [
              "The most striking visual effects quickly frustrate users if they impede navigation or drain battery. True creative development is the art of achieving maximum aesthetic impact with minimal computational footprint.",
              "Designing touch-first fallbacks and respecting reduced-motion preferences ensures that the magic translates across all screen sizes.",
            ],
          }}
          relatedProjects={RELATED_PROJECTS}
        />

        {/* Extended Cards for the 5 Capabilities inside the Solution area */}
        <div className="w-full -mt-8 mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CAMPAIGN_EXPERIENCES.map((exp) => (
              <div
                key={exp.category}
                className="p-5 rounded-2xl border border-neutral-200/90 bg-[#F9F9F9] hover:bg-white hover:border-neutral-300 hover:shadow-sm transition-all duration-200"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  {exp.category}
                </span>
                <h3 className="text-sm font-medium text-neutral-900 mt-1.5 mb-2">
                  {exp.headline}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-2 py-0.5 bg-white border border-neutral-200 rounded text-neutral-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CaseStudyLayout>
    </PageTransition>
  );
}
