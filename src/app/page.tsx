import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Journey } from "@/components/sections/Journey";
import { DevelopmentApproach } from "@/components/sections/DevelopmentApproach";
import { Projects } from "@/components/sections/Projects";

import { CodeLab } from "@/components/sections/CodeLab";
import { Education } from "@/components/sections/Education";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <><Navbar /><main id="main-content" tabIndex={-1}><Hero /><Highlights /><About /><Skills /><Experience /><Journey /><DevelopmentApproach /><Projects /><CodeLab /><Education /><Certifications /><Contact /></main><Footer /></>
  );
}

