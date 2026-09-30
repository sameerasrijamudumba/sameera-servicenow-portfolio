import { ArrowRight } from "lucide-react";
import { approach } from "@/data/approach";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function DevelopmentApproach() {
  return <section className="credibility-section approach-section" aria-labelledby="approach-heading"><Container>
    <Reveal><p className="eyebrow"><span className="section-number">05 /</span> A CONSIDERED PROCESS</p><h2 id="approach-heading">How I Approach<br />ServiceNow Development</h2></Reveal>
    <ol className="approach-flow">{approach.map((step, index) => <li key={step.title}><Reveal className="approach-step"><div className="approach-step-top"><span>0{index + 1}</span>{index < approach.length - 1 && <ArrowRight size={21} strokeWidth={1.5} aria-hidden="true" />}</div><h3>{step.title}</h3><p>{step.description}</p></Reveal></li>)}</ol>
  </Container></section>;
}
