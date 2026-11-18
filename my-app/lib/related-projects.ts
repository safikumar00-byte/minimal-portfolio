import {
  credBuddhaProject,
  cvmHrmProject,
  turboPaisaProject,
} from "@/lib/phone-projects";

const caseStudyProjects = [
  turboPaisaProject,
  credBuddhaProject,
  cvmHrmProject,
].map(({ title, slug }) => ({ title, slug })).concat([
  {
    title: "Game & Campaign Landing Pages",
    slug: "game-campaigns",
  },
]);

const RELATED_PROJECTS = caseStudyProjects.map(({ title, slug }) => ({
  title,
  href: `/work/${slug}`,
}));

export default RELATED_PROJECTS;
