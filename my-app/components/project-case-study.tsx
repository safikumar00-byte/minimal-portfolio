import Image from "next/image";
import CaseStudyLayout, {
  type CaseStudySection,
  type RelatedProject,
} from "@/components/case-study-layout";
import PortfolioTicket from "@/components/portfolio/PortfolioTicket";
import type { PhoneProject } from "@/lib/phone-projects";

const RELATED_PROJECTS: RelatedProject[] = [
  {
    title: "TurboPaisa",
    href: "/work/turbopaisa",
    thumbnailSrc: "/work/turbopaisa/home.jpg",
    thumbnailAlt: "TurboPaisa mobile app home screen",
  },
  {
    title: "CredBuddha",
    href: "/work/credbuddha",
    thumbnailSrc: "/work/credbuddha/home.jpg",
    thumbnailAlt: "CredBuddha mobile app home screen",
  },
  {
    title: "Core Volt Matrix",
    href: "/work/cvm-hrm",
    thumbnailSrc: "/work/cvm-hrm/dashboard.jpg",
    thumbnailAlt: "Core Volt Matrix HRMS dashboard",
  },
  {
    title: "Game & Campaign Landing Pages",
    href: "/work/game-campaigns",
    artwork: (
      <PortfolioTicket
        dates="DIGITAL EXPERIENCES"
        href=""
        name={"GAME & CAMPAIGN\nLANDING PAGES"}
        presenter="INTERACTIVE EXPERIENCES PRESENT"
        stubText="EXPLORE"
        tilt={false}
        venue="CREATIVE DEVELOPMENT"
        watermark="PLAY"
        width={150}
      />
    ),
  },
];

export default function ProjectCaseStudy({
  project,
}: {
  project: PhoneProject;
}) {
  const sections: CaseStudySection[] = [
    {
      id: "overview",
      title: "Overview",
      content: (
        <>
          <p>{project.overview}</p>
          <dl className="case-study-metadata">
            <div>
              <dt>Project type</dt>
              <dd>{project.platform}</dd>
            </div>
            <div>
              <dt>Screen examples</dt>
              <dd>{project.images.length}</dd>
            </div>
          </dl>
        </>
      ),
    },
    {
      id: "exploration",
      title: "Exploration",
      content: (
        <div className="case-study-gallery">
          {project.images.map((image) => (
            <figure className="case-study-gallery-item" key={image.src}>
              <div className="case-study-gallery-image">
                <Image
                  alt={image.alt}
                  fill
                  sizes="(max-width: 760px) 80vw, (max-width: 1180px) 55vw, 42vw"
                  src={image.src}
                />
              </div>
              <figcaption>{image.title}</figcaption>
            </figure>
          ))}
        </div>
      ),
    },
    {
      id: "what-i-created",
      title: "What I created",
      content: (
        <ul className="case-study-focus-list">
          {project.focusAreas.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "behind-the-exploration",
      title: "Behind the exploration",
      content: (
        <p className="case-study-source-note">
          Screens shown are from the supplied design files. Product behavior
          and flow descriptions are based on those screens.
        </p>
      ),
    },
  ];

  const relatedProjects = RELATED_PROJECTS.filter(
    (relatedProject) => relatedProject.href !== `/work/${project.slug}`,
  );
  const heroImage = project.images[0];

  return (
    <CaseStudyLayout
      title={project.title}
      summary={project.summary}
      tags={[project.platform, ...project.focusAreas.slice(0, 2)]}
      hero={
        heroImage ? (
          <Image
            alt={heroImage.alt}
            fill
            priority
            sizes="(max-width: 760px) 100vw, (max-width: 1180px) 65vw, 70vw"
            src={heroImage.src}
          />
        ) : null
      }
      sections={sections}
      relatedProjects={relatedProjects}
    />
  );
}
