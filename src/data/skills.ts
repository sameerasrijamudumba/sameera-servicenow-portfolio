import type { PreviewContent, SkillCategory } from "@/types/portfolio";

/** Skills extracted from the supplied resume. */
export const skills = {
  verification: "verified",
  data: [
    { title: "ServiceNow Modules", skills: ["ITSM", "Incident Management", "Problem Management", "Change Management", "Asset Management", "Service Catalog / Service Request", "CMDB", "ITOM", "CSM"] },
    { title: "Development", skills: ["Client Scripts", "Catalog Client Scripts", "UI Scripts", "UI Policies", "UI Actions", "Business Rules", "Workflow Editor", "Flow Designer", "Scoped Applications"] },
    { title: "Administration", skills: ["ACLs", "Update Sets", "Import Sets", "Transform Maps", "Data Sources", "Next Experience UI", "Multi-Domain Instances"] },
    { title: "Reporting", skills: ["ServiceNow Reports", "Dashboards", "Performance Analytics", "Incident Templates"] },
    { title: "ITIL / Processes", skills: ["Change Management", "Incident Management", "Problem Management", "Knowledge Management", "SLA Management", "Service Request Management"] },
    { title: "Programming & Methodology", skills: ["JavaScript", "HTML", "MySQL", "Agile / Scrum"] },
  ],
} as const satisfies PreviewContent<readonly SkillCategory[]>;
