import { BriefcaseBusiness, ArrowUpRight } from "lucide-react";
import { experience } from "@/data/experience";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  const entry = experience.data;
  return <section id="experience" tabIndex={-1} className="credibility-section experience-section" aria-labelledby="experience-heading"><Container>
    <Reveal className="section-intro"><div><p className="eyebrow"><span className="section-number">03 /</span> PROFESSIONAL PRACTICE</p><h2 id="experience-heading">Professional Experience</h2></div><p className="section-description">Bringing platform development, automation, and enterprise support together.</p></Reveal>
    <Reveal><article className="experience-entry" aria-labelledby="employer-heading">
      <div className="experience-identity"><span className="experience-icon"><BriefcaseBusiness size={26} strokeWidth={1.5} aria-hidden="true" /></span><p className="experience-duration">{entry.durationLabel}<span>Professional experience</span></p><h3 id="employer-heading">{entry.company}</h3><p className="experience-role">{entry.role}</p><div className="experience-platform"><span className="status-dot" aria-hidden="true" />ServiceNow / Enterprise environments</div></div>
      <div className="experience-detail"><div className="experience-areas">{entry.areas.map((area) => <div className="experience-area" key={area.title}><p className="area-indicator"><ArrowUpRight size={14} aria-hidden="true" />{area.indicator}</p><h4>{area.title}</h4><ul>{area.responsibilities.map((text) => <li key={text}>{text}</li>)}</ul></div>)}</div></div>
    </article></Reveal>
  </Container></section>;
}
