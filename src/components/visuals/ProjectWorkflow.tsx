import { ArrowDown, Check, GitBranch, Layers, Cable, Workflow } from "lucide-react";
import type { CaseStudy } from "@/types/portfolio";

const icons = [Layers, GitBranch, Cable, Workflow];

export function ProjectWorkflow({ project, detailed = false }: { project: CaseStudy; detailed?: boolean }) {
  const Icon = icons[Number(project.number) - 1];
  return <figure className={`project-workflow project-workflow-${project.number} ${detailed ? "project-workflow-detailed" : ""}`} aria-label={project.workflowTitle}>
    <figcaption><Icon size={18} strokeWidth={1.5} aria-hidden="true" /><span>{project.workflowTitle}</span><span className="diagram-type">{project.number === "03" ? "ARCHITECTURE" : "WORKFLOW"}</span></figcaption>
    <ol className="project-flow-nodes">{project.workflow.map((step, index) => <li key={step}>
      <div className={`project-flow-node ${index === 2 ? "project-flow-node-accent" : ""}`}><span className="flow-step-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{step}</span>{index === project.workflow.length - 1 && <Check size={15} aria-hidden="true" />}</div>
      {index < project.workflow.length - 1 && <span className="project-flow-connector" aria-hidden="true"><ArrowDown size={13} /></span>}
    </li>)}</ol>
    <div className="project-workflow-caption"><span className="status-dot" aria-hidden="true" />{project.number === "03" ? "Connected systems / controlled exchange" : "Clear ownership / connected steps"}</div>
  </figure>;
}
