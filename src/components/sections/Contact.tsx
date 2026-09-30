import { ArrowUpRight, Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { contact } from "@/data/contact";
import { Container } from "@/components/ui/Container";
import { ResumeButton } from "@/components/ui/ResumeButton";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  return <section id="contact" tabIndex={-1} className="contact-section" aria-labelledby="contact-heading"><Container><Reveal className="contact-grid">
    <div><p className="eyebrow"><span className="section-number">10 /</span> CONTACT</p><h2 id="contact-heading">Let&apos;s build better ServiceNow experiences.</h2><p className="contact-copy">I&apos;m open to ServiceNow Developer opportunities where I can contribute across ITSM development, workflow automation, Service Catalog, integrations, and platform improvement.</p><div className="contact-actions"><a className="button button-primary" href={`mailto:${contact.email}`}>Email Me<ArrowUpRight size={16} aria-hidden="true" /></a>{contact.linkedInUrl && <a className="button button-secondary" href={contact.linkedInUrl} target="_blank" rel="noreferrer noopener">Connect on LinkedIn<ArrowUpRight size={16} aria-hidden="true" /></a>}<ResumeButton /></div></div>
    <div className="contact-details"><a href={`mailto:${contact.email}`}><Mail size={17} aria-hidden="true" /><span>{contact.email}</span></a><a href={`tel:${contact.phone?.replace(/\s/g, "")}`}><Phone size={17} aria-hidden="true" /><span>{contact.phone}</span></a><p><MapPin size={17} aria-hidden="true" /><span>{contact.location}</span></p>{contact.linkedInUrl && <a href={contact.linkedInUrl} target="_blank" rel="noreferrer noopener"><ExternalLink size={17} aria-hidden="true" /><span>LinkedIn profile</span></a>}</div>
  </Reveal></Container></section>;
}
