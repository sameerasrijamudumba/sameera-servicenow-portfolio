import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { walkthroughs } from "@/data/project-details";
import { projects } from "@/data/projects";
import { CaseStudy } from "@/components/projects/CaseStudy";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return { title: `${walkthroughs[slug].title} | Sameera Srija`, description: project.overview };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) notFound();
  return <CaseStudy project={projects[index]} previous={projects[index - 1]} next={projects[index + 1]} />;
}

