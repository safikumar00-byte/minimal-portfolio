import type { Metadata } from "next";
import ProjectCaseStudy from "@/components/project-case-study";
import { turboPaisaProject } from "@/lib/phone-projects";

export const metadata: Metadata = {
  title: "TurboPaisa — Project case study",
  description:
    "Explore TurboPaisa mobile app screens for earning activities, rewards, wallet, and referrals.",
};

export default function TurboPaisaCaseStudyPage() {
  return <ProjectCaseStudy project={turboPaisaProject} />;
}
