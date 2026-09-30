import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/types/portfolio";
import { ProjectWorkflow } from "@/components/visuals/ProjectWorkflow";
import { Reveal } from "@/components/ui/Reveal";

export function ProjectPreview({ project, reverse }: { project: CaseStudy; reverse: boolean }) {
  return <article className={`project-preview ${reverse ? "project-preview-reverse" : ""}`} aria-labelledby={`project-${project.number}`}>
    <Reveal className="project-preview-copy"><div className="project-kicker"><span>{project.number}</span><p>{project.category}</p></div>
      <h3 id={`project-${project.number}`}>{project.title}</h3><p className="project-problem">{project.problem}</p>
      <ul className="project-technologies" aria-label="Core technologies">{project.technologies.slice(0, 4).map((tech) => <li key={tech}>{tech}</li>)}</ul>
      <Link className="case-study-link" href={`/projects/${project.slug}`} aria-label={`View Case Study: ${project.title}`}>View Case Study<ArrowUpRight size={19} aria-hidden="true" /></Link>
    </Reveal>
    <Reveal className="project-preview-visual"><ProjectWorkflow project={project} /></Reveal>
  </article>;
}
