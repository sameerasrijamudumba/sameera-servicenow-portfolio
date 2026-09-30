/** Supplied content is traceable to the specification; it is not independently verified. */
export type ContentRecord<T> =
  | { status: "supplied"; source: "PORTFOLIO_SPEC.md"; data: T }
  | { status: "placeholder"; reason: string; data: T }
  | { status: "verified"; data: T };

export interface Profile {
  name: string;
  role: string;
  company: string;
  experienceYears: number;
  summary: string;
  about: readonly string[];
  heroSkills: readonly string[];
  metaDescription: string;
}

export interface ContactDetails {
  email: string | null;
  linkedInUrl: string | null;
  githubUrl: string | null;
  location: string | null;
  phone: string | null;
  resumePath: string | null;
  siteUrl: string | null;
}

export interface SkillCategory { title: string; skills: readonly string[] }
export interface Experience {
  company: string;
  role: string;
  durationLabel: string;
  startDate: string | null;
  endDate: string | null;
  responsibilities: readonly string[];
  expertiseThemes: readonly string[];
}

export interface Project {
  slug: string;
  title: string;
  problem: string;
  requirement: string | null;
  solution: string;
  technologies: readonly string[];
  workflow: readonly string[];
  examples: readonly { input: string; output: string }[];
  implementation: string | null;
  challenges: readonly string[];
  result: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issuedOn: string | null;
  credentialUrl: string | null;
}

export interface CodeSample {
  id: string;
  title: string;
  language: "javascript" | "json";
  label: "Demonstration only — not Cognizant or client source code";
  code: string;
}

export interface NavigationItem { label: string; href: `#${string}`; available: boolean }

/** Authorized for preview, but not a verified professional claim. */
export interface PreviewContent<T> {
  verification: "pending" | "verified";
  source?: string;
  data: T;
}
export interface ExperienceArea { title: string; indicator: string; responsibilities: readonly string[] }
export interface ProfessionalExperience {
  company: string;
  role: string;
  durationLabel: string;
  startDate: string | null;
  endDate: string | null;
  areas: readonly ExperienceArea[];
}
export interface JourneyStage { title: string; capabilities: readonly string[] }
export interface ApproachStep { title: string; description: string }

export interface CaseStudy {
  slug: string;
  number: string;
  category: string;
  title: string;
  verification: "pending";
  kind: "portfolio-scenario";
  overview: string;
  problem: string;
  requirements: readonly string[];
  solution: string;
  workflowTitle: string;
  workflow: readonly string[];
  technologies: readonly string[];
  mappings: readonly { input: string; output: string }[];
  implementation: readonly { title: string; description: string }[];
  considerations: readonly { title: string; description: string }[];
  outcome: string;
}

export interface TechnicalNote { title: string; description: string }
export interface Walkthrough {
  title: string;
  role: readonly string[];
  workflow: readonly string[];
  workflowNote: string;
  components: readonly string[];
  implementation: readonly TechnicalNote[];
  logic: readonly TechnicalNote[];
  decisions: readonly TechnicalNote[];
  tests: readonly { scenario: string; expected: string }[];
  samples: readonly { title: string; language: "javascript" | "json"; note: string; code: string }[];
  lifecycle?: readonly { label: string; table: string; description: string }[];
  statuses?: readonly { code: string; meaning: string }[];
}

export interface CodeLabExample {
  id: string;
  category: string;
  title: string;
  purpose: string;
  context: string;
  blocks: readonly { title: string; language: "javascript" | "json"; code: string }[];
  explanation: readonly { title: string; description: string }[];
  considerations: string;
  workflow?: readonly string[];
}
