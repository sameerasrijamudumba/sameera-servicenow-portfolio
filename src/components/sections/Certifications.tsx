import { BadgeCheck } from "lucide-react";
import { certifications } from "@/data/certifications";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Certifications() {
  return <section id="certifications" tabIndex={-1} className="certifications-section" aria-labelledby="certifications-heading"><Container>
    <Reveal className="section-intro"><div><p className="eyebrow"><span className="section-number">09 /</span> CERTIFICATION</p><h2 id="certifications-heading">Professional Certification</h2></div><p className="section-description">A platform credential supporting ServiceNow development practice.</p></Reveal>
    <div className="certification-card">{certifications.map((item) => <div key={item.name}><BadgeCheck size={31} aria-hidden="true" /><div><p className="certification-issuer">{item.issuer}</p><h3>{item.name}</h3></div></div>)}</div>
  </Container></section>;
}
