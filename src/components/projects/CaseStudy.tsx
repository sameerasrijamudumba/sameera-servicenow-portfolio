import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import type { CaseStudy as CaseStudyData, TechnicalNote } from "@/types/portfolio";
import { caseStudySections } from "@/data/projects";
import { walkthroughs } from "@/data/project-details";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectWorkflow } from "@/components/visuals/ProjectWorkflow";

function StudySection({ index, children }: { index: number; children: ReactNode }) {
  const section = caseStudySections[index];
  return <section id={section.id} tabIndex={-1} className="study-section" aria-labelledby={`${section.id}-heading`}><Reveal><div className="study-section-heading"><span>{section.number}</span><h2 id={`${section.id}-heading`}>{section.title}</h2></div>{children}</Reveal></section>;
}
function Notes({ items }: { items: readonly TechnicalNote[] }) {
  return <div className="technical-considerations">{items.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.description}</p></div>)}</div>;
}
export function CaseStudy({ project, previous, next }: { project: CaseStudyData; previous?: CaseStudyData; next?: CaseStudyData }) {
  const detail = walkthroughs[project.slug];
  return <>
    <header className="case-header"><Container><Link className="wordmark" href="/">{profile.name}<span aria-hidden="true">.</span></Link><Link href="/#projects" className="case-back"><ArrowLeft size={16} aria-hidden="true" />Back to Projects</Link></Container></header>
    <main id="main-content" tabIndex={-1} className="case-main"><Container>
      <div className="case-hero"><p className="eyebrow">CASE STUDY {project.number}<span className="case-category">{project.category}</span></p><h1>{detail.title}</h1><p className="case-lead">{project.solution}</p><div className="case-hero-meta"><span>Portfolio solution scenario</span><span>ServiceNow / Technical walkthrough</span></div></div>
      <div className="case-body"><aside className="case-toc"><nav aria-label="Case study contents"><p>IN THIS CASE STUDY</p>{caseStudySections.map(section => <a key={section.id} href={`#${section.id}`}><span>{section.number}</span>{section.title}</a>)}</nav></aside>
        <div className="case-content">
          <StudySection index={0}><p>{project.overview}</p></StudySection>
          <StudySection index={1}><p>{project.problem}</p></StudySection>
          <StudySection index={2}><ul className="study-requirements">{project.requirements.map(item => <li key={item}>{item}</li>)}</ul></StudySection>
          <StudySection index={3}><div className="study-role"><p className="study-caption">ROLE SCOPE FOR THIS PORTFOLIO SCENARIO</p><h3>ServiceNow Developer</h3><p>Responsibilities</p><ul className="project-technologies study-technologies">{detail.role.map(item => <li key={item}>{item}</li>)}</ul></div></StudySection>
          <StudySection index={4}><p>{project.solution}</p></StudySection>
          <StudySection index={5}><ProjectWorkflow project={{ ...project, workflow: detail.workflow, workflowTitle: detail.title }} detailed /><p className="workflow-note">{detail.workflowNote}</p>
            {detail.lifecycle && <div className="study-lifecycle"><h3>REQ → RITM → SCTASK</h3><ol>{detail.lifecycle.map(item => <li key={item.label}><strong>{item.label}</strong><code>{item.table}</code><p>{item.description}</p></li>)}</ol></div>}
            {project.mappings.length > 0 && <div className="routing-mappings"><h3>Synthetic routing examples</h3><dl>{project.mappings.map(mapping => <div key={mapping.input}><dt>{mapping.input}</dt><ArrowRight size={16} aria-hidden="true" /><dd>{mapping.output}</dd></div>)}</dl></div>}
          </StudySection>
          <StudySection index={6}><ul className="project-technologies study-technologies">{detail.components.map(tech => <li key={tech}>{tech}</li>)}</ul></StudySection>
          <StudySection index={7}><ol className="implementation-steps">{detail.implementation.map((step, index) => <li key={step.title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol></StudySection>
          <StudySection index={8}><Notes items={detail.logic} />
            {detail.statuses && <dl className="http-statuses">{detail.statuses.map(status => <div key={status.code}><dt>{status.code}</dt><dd>{status.meaning}</dd></div>)}</dl>}
            {detail.samples.map(sample => <details className="study-code" key={sample.title}><summary>{sample.title}<span>{sample.language}</span></summary><div><p>{sample.note}</p><pre tabIndex={0} aria-label={sample.title}><code>{sample.code}</code></pre></div></details>)}
          </StudySection>
          <StudySection index={9}><Notes items={detail.decisions} /></StudySection>
          <StudySection index={10}><p className="study-test-intro">Proposed validation scenarios and expected results for an isolated ServiceNow test environment.</p><dl className="study-tests">{detail.tests.map(test => <div key={test.scenario}><dt>{test.scenario}</dt><dd>{test.expected}</dd></div>)}</dl></StudySection>
          <StudySection index={11}><div className="study-outcome"><ArrowUpRight size={24} aria-hidden="true" /><div><p className="outcome-label">DESIGNED OUTCOME</p><p>{project.outcome}</p></div></div></StudySection>
        </div>
      </div>
      <nav className="project-pagination" aria-label="Project navigation">
        {previous ? <Link href={`/projects/${previous.slug}`} rel="prev"><span><ArrowLeft size={16} aria-hidden="true" />Previous Project</span><strong>{walkthroughs[previous.slug].title}</strong></Link> : <div className="pagination-boundary">Previous Project<span>First case study</span></div>}
        <Link className="pagination-back" href="/#projects"><ArrowLeft size={18} aria-hidden="true" />Back to Projects</Link>
        {next ? <Link href={`/projects/${next.slug}`} rel="next"><span>Next Project<ArrowRight size={16} aria-hidden="true" /></span><strong>{walkthroughs[next.slug].title}</strong></Link> : <div className="pagination-boundary">Next Project<span>Last case study</span></div>}
      </nav>
    </Container></main>
  </>;
}
