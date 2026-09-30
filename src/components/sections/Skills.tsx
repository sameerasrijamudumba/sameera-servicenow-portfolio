import { Workflow, Braces, GitBranch, Cable, ShieldCheck, Code } from "lucide-react";
import { skills } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Workflow, Braces, GitBranch, Cable, ShieldCheck, Code];

export function Skills() {
  return <section id="skills" tabIndex={-1} className="credibility-section skills-section" aria-labelledby="skills-heading"><Container>
    <Reveal className="section-intro"><div><p className="eyebrow"><span className="section-number">02 /</span> PLATFORM KNOWLEDGE</p><h2 id="skills-heading">Technical Expertise</h2></div><p className="section-description">ServiceNow development capabilities across platform configuration, automation, scripting, integrations, and IT service management.</p></Reveal>
    <div className="skill-matrix">{skills.data.map((category, index) => {
      const Icon = icons[index];
      return <Reveal className="skill-cell" key={category.title}><div className="skill-cell-heading"><span className="capability-icon"><Icon size={21} strokeWidth={1.5} aria-hidden="true" /></span><h3>{category.title}</h3><span className="cell-index" aria-hidden="true">0{index + 1}</span></div><ul className="skill-tags">{category.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></Reveal>;
    })}</div>
  </Container></section>;
}
