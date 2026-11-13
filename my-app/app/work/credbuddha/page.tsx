import type { Metadata } from "next";
import ProjectCaseStudy from "@/components/project-case-study";
import { credBuddhaProject } from "@/lib/phone-projects";

export const metadata: Metadata = {
  title: "CredBuddha — Project case study",
  description:
    "Explore CredBuddha mobile app screens for loan discovery, applications, and status tracking.",
};

export default function CredBuddhaCaseStudyPage() {
  return <ProjectCaseStudy project={credBuddhaProject} />;
}
