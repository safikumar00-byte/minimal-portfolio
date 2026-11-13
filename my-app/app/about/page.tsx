import Image from "next/image";
import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "About Sunil Kumar Reddy — Product Designer & Developer",
  description:
    "Learn about Sunil Kumar Reddy's experience across UI/UX design, visual communication, frontend development, and healthcare administration.",
};

const experience = [
  {
    company: "TekWissen Software Pvt. Ltd.",
    role: "Graphic Designer",
    dates: "Dec 2025 — Present",
    location: "Visakhapatnam",
    mark: "tekwissen",
    description:
      "Create visual communication and motion content for social and digital platforms, build reusable presentation systems, and partner with teams on brand and digital initiatives.",
  },
  {
    company: "Intexm Media Private Limited",
    role: "UI/UX Designer & Developer",
    dates: "Jun 2023 — Apr 2025",
    location: "Visakhapatnam",
    mark: "IM",
    description:
      "Designed fintech products, conversion-focused landing pages, and gamified experiences, then built responsive interfaces across 10+ web and mobile projects.",
  },
  {
    company: "Sagara Durga Hospital",
    role: "Hospital Administration Assistant · Part-time",
    dates: "Jan 2020 — Jun 2023",
    location: "Visakhapatnam",
    mark: "SDH",
    description:
      "Supported medical administration, insurance documentation, patient records, billing, and accounts operations alongside academic studies.",
  },
];

const projects = [
  {
    name: "Karyotica Labs",
    detail: "Brand experience & website revamp",
    tools: "Branding · UI/UX · Next.js",
    mark: "K",
  },
  {
    name: "Core Volt Matrix",
    detail: "Enterprise HRMS platform",
    tools: "Figma · React.js · Tailwind CSS",
    mark: "CV",
  },
  {
    name: "Visionicx",
    detail: "Enterprise mobile application · 40+ screens in four weeks",
    tools: "React Native · Expo · NativeWind",
    mark: "V",
  },
  {
    name: "Cross-device trade signal application",
    detail: "Data-driven interfaces and real-time market workflows",
    tools: "Product design · Firebase · Supabase",
    mark: "TS",
  },
];

const stack = [
  { name: "Figma", icon: "figma.svg" },
  { name: "Framer", icon: "framer.svg" },
  { name: "React", icon: "react.svg" },
  { name: "Next.js", icon: "nextdotjs.svg" },
  { name: "TypeScript", icon: "typescript.svg" },
  { name: "Tailwind CSS", icon: "tailwindcss.svg" },
  { name: "Supabase", icon: "supabase.svg" },
  { name: "Firebase", icon: "firebase.svg" },
  { name: "MongoDB", icon: "mongodb.svg" },
  { name: "GitHub", icon: "github.svg" },
];

const certifications = [
  "Visual Communication Design for Digital Media · IIT Roorkee, 2024",
  "Introduction to Interaction Design · IIT Roorkee, 2024",
  "Design & Implementation of Human-Computer Interfaces · IIT Guwahati, 2024",
  "JavaScript Algorithms and Data Structures · freeCodeCamp, 2023",
  "Responsive Web Design · freeCodeCamp, 2023",
];

export default function AboutPage() {
  return (
    <div className="portfolio-shell about-shell">
      <SiteHeader />
      <main className="about-layout">
        <aside className="about-sidebar">
          <h1>
            Hi, I&apos;m Sunil
            <br />
            Kumar Reddy.
          </h1>
          <div className="profile-art" aria-hidden="true">
            <span className="profile-orbit" />
            <strong>SR</strong>
            <span className="profile-art-label">DESIGN<br />+ TECHNOLOGY</span>
          </div>
          <p className="profile-place">Visakhapatnam, India</p>
          <div className="about-contact">
            <a href="mailto:vsunilkumarvzg@gmail.com">Email</a>
            <a href="tel:+918790549591">+91 87905 49591</a>
            <a href="https://www.linkedin.com/in/sunilkumarvzg/" target="_blank" rel="noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a href="https://www.behance.net/8fc59bee" target="_blank" rel="noreferrer">
              Behance <span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>

        <div className="about-content">
          <section className="about-intro">
            <p>
              I&apos;m a multidisciplinary design and technology professional with
              3+ years of experience across graphic design, UI/UX, frontend
              development, and digital products. I currently work as a Graphic
              Designer at TekWissen Software, combining visual storytelling with
              practical, reusable design systems.
            </p>
            <p>
              Before that, I designed and built fintech and enterprise
              experiences at Intexm Media. My earlier work in hospital
              administration also gave me a practical understanding of healthcare
              operations, documentation, billing, and patient workflows.
            </p>
          </section>

          <section className="about-section" id="experience">
            <div className="section-heading">
              <h2>Work experience</h2>
              <a className="text-link" href="/Sunil_Kumar_Reddy.pdf" download>
                Download résumé <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="experience-list">
              {experience.map((job) => (
                <article className="experience-row" key={job.company}>
                  <div className="company-mark" aria-hidden="true">
                    {job.mark === "tekwissen" ? (
                      <Image
                        src="/companies/tekwissen.png"
                        alt=""
                        width={800}
                        height={192}
                        className="tekwissen-logo"
                      />
                    ) : (
                      <span>{job.mark}</span>
                    )}
                  </div>
                  <div className="experience-info">
                    <h3>{job.company}</h3>
                    <p className="experience-role">{job.role}</p>
                    <p>{job.description}</p>
                    <small>{job.location}</small>
                  </div>
                  <time className="experience-dates">{job.dates}</time>
                </article>
              ))}
            </div>
          </section>

          <section className="about-section">
            <h2>Selected projects</h2>
            <div className="selected-projects">
              {projects.map((project) => (
                <article className="selected-project" key={project.name}>
                  <span className="project-mark" aria-hidden="true">{project.mark}</span>
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.detail}</p>
                    <small>{project.tools}</small>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="about-section process-section">
            <h2>How I work</h2>
            <p>
              I like getting to the heart of a problem through research, clear
              questions, and fast prototypes. I move between user flows,
              wireframes, interaction details, and working frontends to test
                  ideas early and improve them with feedback.
            </p>
            <p>
              I care about accessible, responsive interfaces, consistent
              components, and handoffs that make sense to the people building
              them. AI-assisted tools and code help me explore more ideas and
              take a concept from specification to something tangible.
            </p>
          </section>

          <section className="about-section">
            <h2>My stack</h2>
            <p className="section-lede">
              A practical mix of design, prototyping, frontend, and AI tools.
            </p>
            <ul className="stack-grid">
              {stack.map((tool) => (
                <li className="stack-item" key={tool.name} aria-label={tool.name}>
                  <span className="stack-icon">
                    <Image
                      src={`/stack/${tool.icon}`}
                      alt=""
                      width={22}
                      height={22}
                    />
                  </span>
                  <span>{tool.name}</span>
                </li>
              ))}
            </ul>
            <p className="more-tools">
              Also: FigJam, Photoshop, Illustrator, After Effects, Adobe XD,
              ProtoPie, Balsamiq, Canva, LottieFiles, JavaScript, React Native,
              Expo, Node.js, Express, REST APIs, MySQL, Git, GSAP, Framer Motion,
              Cursor, Windsurf, and GitHub Copilot.
            </p>
          </section>

          <section className="about-section details-grid">
            <div>
              <h2>Education</h2>
              <h3>B.Tech, Electrical and Electronics Engineering</h3>
              <p>Sanketika Institute of Technology and Management · 2020–2023</p>
            </div>
            <div>
              <h2>Languages</h2>
              <p>English · Telugu · Hindi</p>
            </div>
          </section>

          <section className="about-section certification-section">
            <h2>Certifications</h2>
            <ul>
              {certifications.map((certification) => (
                <li key={certification}>{certification}</li>
              ))}
            </ul>
          </section>

          <section className="about-section beyond-section">
            <h2>Beyond the interface</h2>
            <p>
              Working across design, development, and hospital operations has
              taught me to look at products from more than one angle: how they
              communicate, how they work, and how they fit into real workflows.
              I bring that perspective to every team and project.
            </p>
          </section>
        </div>
      </main>
      <footer className="about-page-footer">
        <span>© 2026 Sunil Kumar Reddy</span>
        <a href="/Sunil_Kumar_Reddy.pdf" download>Download résumé ↗</a>
      </footer>
    </div>
  );
}
