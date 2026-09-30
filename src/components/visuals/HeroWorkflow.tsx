import { ArrowDown, Braces, Check, CircleCheck, FileInput, GitBranch, Layers, ShieldCheck, Workflow, Zap } from "lucide-react";
import { home } from "@/data/home";

const icons = { request: FileInput, platform: Layers, approval: ShieldCheck, automation: Zap, fulfillment: CircleCheck };

export function HeroWorkflow() {
  return (
    <figure className="workflow-visual" aria-labelledby="workflow-caption">
      <figcaption id="workflow-caption" className="workflow-caption"><span className="status-dot" />FROM REQUEST TO RESOLUTION<span className="diagram-label">WORKFLOW / 01</span></figcaption>
      <div className="workflow-canvas">
        <svg className="branch-connections" viewBox="0 0 500 500" fill="none" aria-hidden="true">
          <path d="M83 137H130Q145 137 145 157V172H250M417 137H370Q355 137 355 157V172H250M83 351H132Q146 351 146 330V320H250M417 351H368Q354 351 354 330V320H250" />
        </svg>
        <div className="satellite satellite-incident"><CircleCheck size={15} /><span>Incident</span></div>
        <div className="satellite satellite-catalog"><Layers size={15} /><span>Catalog</span></div>
        <div className="satellite satellite-flow"><GitBranch size={15} /><span>Flow</span></div>
        <div className="satellite satellite-api"><Braces size={15} /><span>API</span></div>
        <ol className="workflow-steps">
          {home.workflow.map((step, index) => {
            const Icon = icons[step.icon];
            return <li key={step.label}>
              <div className={`workflow-node ${index === 1 ? "platform-node" : ""}`}>
                <span className="node-icon"><Icon size={18} aria-hidden="true" /></span>
                <div><span className="node-label">{step.label}</span><span className="node-detail">{step.detail}</span></div>
                {index === 4 ? <Check size={15} className="node-check" aria-hidden="true" /> : <span className="node-port" aria-hidden="true" />}
              </div>
              {index < home.workflow.length - 1 && <div className="workflow-connector" aria-hidden="true"><span /><ArrowDown size={11} /></div>}
            </li>;
          })}
        </ol>
      </div>
      <div className="workflow-footer"><Workflow size={14} aria-hidden="true" /><span>Connected processes. Purposeful automation.</span><span className="sample-label">CONCEPT</span></div>
    </figure>
  );
}
