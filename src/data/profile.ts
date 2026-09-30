import type { Profile } from "@/types/portfolio";

/** Identity and copy supplied in PORTFOLIO_SPEC.md. */
export const profile = {
  name: "Sameera Srija J",
  role: "ServiceNow Developer",
  company: "Cognizant",
  experienceYears: 4,
  summary: "ServiceNow Developer with 3.10+ years of hands-on experience in ServiceNow development and customization across ITSM, ITOM, and CSM modules.",
  about: [
    "I am a ServiceNow Developer with hands-on experience building and customizing enterprise ITSM, ITOM, and CSM solutions.",
    "My work spans Incident, Problem, Change, Asset Management, Service Catalog, CMDB governance, scripting, workflow automation, reporting, and role-based access.",
    "I translate complex requirements into maintainable platform solutions using Client Scripts, Business Rules, UI Policies, Flow Designer, and data import patterns.",
  ],
  heroSkills: ["ServiceNow", "ITSM", "JavaScript", "Flow Designer", "REST API", "Service Catalog"],
  metaDescription: "Portfolio of Sameera Srija J, a ServiceNow Developer experienced in ITSM, ITOM, CSM, workflow automation, scripting, CMDB governance, and reporting.",
} as const satisfies Profile;
