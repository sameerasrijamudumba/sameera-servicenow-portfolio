import type { NavigationItem } from "@/types/portfolio";

/** Unbuilt destinations render as disabled controls, never broken anchor links. */
export const navigation = [
  { label: "Home", href: "#home", available: true },
  { label: "About", href: "#about", available: true },
  { label: "Skills", href: "#skills", available: true },
  { label: "Experience", href: "#experience", available: true },
  { label: "Projects", href: "#projects", available: true },
  { label: "Code Lab", href: "#code-lab", available: true },
  { label: "Education", href: "#education", available: true },
  { label: "Contact", href: "#contact", available: true },
] as const satisfies readonly NavigationItem[];

export const certificationNavigation: NavigationItem = { label: "Certifications", href: "#certifications", available: true };

