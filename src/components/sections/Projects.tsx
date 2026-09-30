import { projects, projectsIntroduction } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectPreview } from "@/components/projects/ProjectPreview";

export function Projects() {
  return <section id="projects" tabIndex={-1} className="projects-section" aria-labelledby="projects-heading"><Container>
    <Reveal className="section-intro"><div><p className="eyebrow"><span className="section-number">06 /</span> SELECTED WORK</p><h2 id="projects-heading">{projectsIntroduction.heading}</h2></div><p className="section-description">{projectsIntroduction.description}</p></Reveal>
    <div className="project-previews">{projects.map((project, index) => <ProjectPreview key={project.slug} project={project} reverse={index % 2 !== 0} />)}</div>
  </Container></section>;
}
