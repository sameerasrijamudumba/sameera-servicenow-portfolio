import { profile } from "@/data/profile";
import type { PreviewContent, ProfessionalExperience } from "@/types/portfolio";

export const experience = {
  verification: "verified",
  data: {
    company: profile.company,
    role: profile.role,
    durationLabel: "May 2022 – March 2026",
    startDate: "May 2022",
    endDate: "March 2026",
    areas: [
      { title: "IT service delivery", indicator: "ITSM / CATALOG", responsibilities: [
        "Developed and customized ITSM portals, workflows, and automation across Incident, Problem, and Change.",
        "Designed Service Catalog items, Record Producers, and Order Guides for request fulfillment.",
        "Implemented auto-routing, SLA monitoring, escalation rules, and Incident templates.",
      ] },
      { title: "Development & automation", indicator: "SCRIPTING / FLOWS", responsibilities: [
        "Implemented Client Scripts, Catalog Client Scripts, UI Policies, UI Actions, and Business Rules.",
        "Created automation using Flow Designer and Workflow Editor.",
        "Configured Data Sources, Import Sets, and Transform Maps for CMDB data.",
      ] },
      { title: "Integration & access", indicator: "REST / SECURITY", responsibilities: [
        "Applied ACLs for secure, role-based data access across ITSM modules.",
        "Built reports, dashboards, and Performance Analytics views for ITSM KPIs.",
      ] },
      { title: "Enterprise collaboration", indicator: "DELIVERY / SUPPORT", responsibilities: [
        "Supported testing, deployment, QA validation, and end-user support in Agile / Scrum delivery.",
        "Collaborated with stakeholders to translate requirements into maintainable platform solutions.",
      ] },
    ],
  },
} as const satisfies PreviewContent<ProfessionalExperience>;
