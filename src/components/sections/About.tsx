import { ArrowUpRight, Workflow, GitBranch, Braces, Cable } from "lucide-react";
import { home } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const icons = { service: Workflow, automation: GitBranch, development: Braces, integrations: Cable };
  return <section id="about" tabIndex={-1} className="about-section" aria-labelledby="about-heading"><Container><Reveal className="about-grid">
    <div><p className="eyebrow"><span className="section-number">01 /</span> ABOUT ME</p><h2 id="about-heading">{home.aboutHeading}</h2>
      <div className="about-copy"><p>{home.aboutParagraphs[0]}</p></div>
      <div className="about-note"><ArrowUpRight size={18} aria-hidden="true" /><span>Business requirements → ServiceNow solutions</span></div>
    </div>
    <div className="capability-panel" aria-label="Technical capabilities">
      <div className="capability-panel-heading"><span className="status-dot" aria-hidden="true" />PLATFORM CAPABILITIES<span>SERVICENOW</span></div>
      <div className="capability-grid">{home.capabilities.map((group) => {
        const Icon = icons[group.icon];
        return <div className="capability-group" key={group.title}><Icon size={21} strokeWidth={1.5} aria-hidden="true" /><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
      })}</div>
    </div>
  </Reveal></Container></section>;
}
