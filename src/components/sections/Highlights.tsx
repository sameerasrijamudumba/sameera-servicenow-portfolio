import { BriefcaseBusiness, Braces, Layers, Workflow } from "lucide-react";
import { home } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const icons = { experience: BriefcaseBusiness, platform: Layers, itsm: Workflow, code: Braces };

export function Highlights() {
  return <section className="highlights" aria-label="Professional highlights"><Container><Reveal>
    <dl className="highlight-grid">{home.highlights.map((item) => {
      const Icon = icons[item.icon];
      return <div className="highlight-card" key={item.label}><Icon size={19} strokeWidth={1.5} aria-hidden="true" /><dt>{item.label}</dt><dd>{item.value}</dd></div>;
    })}</dl>
  </Reveal></Container></section>;
}
