import { Check } from "lucide-react";
import { codeSamples, developmentPractices } from "@/data/code-samples";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CodeLabExplorer } from "@/components/code-lab/CodeLabExplorer";

export function CodeLab() {
  return <section id="code-lab" tabIndex={-1} className="code-lab-section" aria-labelledby="code-lab-heading"><Container>
    <Reveal className="section-intro"><div><p className="eyebrow"><span className="section-number">07 /</span> CODE LAB</p><h2 id="code-lab-heading">ServiceNow Code Lab</h2></div><p className="section-description">Practical examples of ServiceNow scripting, client-server communication, automation, and integration patterns.</p></Reveal>
    <p className="lab-demonstration-label"><span aria-hidden="true" />Portfolio demonstration examples</p>
    <CodeLabExplorer examples={codeSamples} />
    <div className="lab-practices"><h3>GOOD SERVICENOW DEVELOPMENT PRACTICES</h3><p>Guidelines to adapt to the application, security model, and implementation requirements.</p><ul>{developmentPractices.map(practice => <li key={practice}><Check size={15} aria-hidden="true" />{practice}</li>)}</ul></div>
  </Container></section>;
}
