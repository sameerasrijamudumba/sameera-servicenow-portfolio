import { ArrowDown, ArrowUpRight, ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import { home } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { HeroWorkflow } from "@/components/visuals/HeroWorkflow";

export function Hero() {
  return (
    <section id="home" tabIndex={-1} className="hero" aria-labelledby="hero-heading">
      <Container>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" />{profile.role}</p>
            <h1 id="hero-heading">{home.headline[0]}<br />{home.headline[1]}<br /><span>{home.headline[2]}</span></h1>
            <p className="hero-description">{home.introduction}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View Projects<ArrowUpRight size={18} aria-hidden="true" /></a>
              <a className="button button-secondary" href="#experience">Explore My Experience<ArrowRight size={17} aria-hidden="true" /></a>
            </div>
            <ul className="expertise-badges" aria-label="Areas of expertise">
              {profile.heroSkills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </div>
          <HeroWorkflow />
        </div>
        <div className="hero-bottom"><p>Enterprise thinking.<span> Practical solutions.</span></p><a href="#about">Get to know me<ArrowDown size={15} aria-hidden="true" /></a></div>
      </Container>
    </section>
  );
}
