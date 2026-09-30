import { Layers, Braces, GitBranch, Cable, Network } from "lucide-react";
import { journey } from "@/data/journey";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Layers, Braces, GitBranch, Cable, Network];

export function Journey() {
  return <section className="credibility-section journey-section" aria-labelledby="journey-heading"><Container>
    <Reveal className="section-intro"><div><p className="eyebrow"><span className="section-number">04 /</span> CONNECTING CAPABILITIES</p><h2 id="journey-heading">The ServiceNow Journey</h2></div><p className="section-description">From platform foundations to connected enterprise solutions.</p></Reveal>
    <Reveal><ol className="journey-flow">{journey.data.map((stage, index) => {
      const Icon = icons[index];
      return <li className="journey-stage" key={stage.title}><div className="journey-marker"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></div><div className="journey-stage-copy"><p className="journey-step" aria-hidden="true">0{index + 1}</p><h3>{stage.title}</h3><ul>{stage.capabilities.map((item) => <li key={item}>{item}</li>)}</ul></div></li>;
    })}</ol></Reveal>
  </Container></section>;
}
