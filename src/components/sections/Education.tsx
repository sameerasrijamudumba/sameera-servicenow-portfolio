import { GraduationCap } from "lucide-react";
import { education } from "@/data/education";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Education() {
  return <section id="education" tabIndex={-1} className="education-section" aria-labelledby="education-heading"><Container>
    <Reveal className="section-intro"><div><p className="eyebrow"><span className="section-number">08 /</span> EDUCATION</p><h2 id="education-heading">Education</h2></div><p className="section-description">Academic foundations in embedded systems and engineering.</p></Reveal>
    <div className="education-timeline">{education.map((item) => <Reveal className="education-card" key={item.qualification}><div className="education-year">{item.year}</div><GraduationCap size={23} aria-hidden="true" /><div><h3>{item.qualification}</h3><p>{item.institution}</p><strong>{item.result}</strong></div></Reveal>)}</div>
  </Container></section>;
}
