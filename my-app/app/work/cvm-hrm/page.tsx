import type { Metadata } from "next";
import ProjectCaseStudy from "@/components/project-case-study";
import { cvmHrmProject } from "@/lib/phone-projects";

export const metadata: Metadata = {
  title: "Core Volt Matrix — Project case study",
  description:
    "Explore Core Volt Matrix desktop HRMS portal screens for employee onboarding, asset tracking, attendance, and leave management.",
};

export default function CvmHrmCaseStudyPage() {
  return <ProjectCaseStudy project={cvmHrmProject} />;
}
