import { profile } from "@/data/profile";

/** Copy supplied in the approved Phase 2 brief; no new professional claims. */
export const home = {
  headline: ["Building smarter", "workflows on", "ServiceNow."],
  introduction: `I'm ${profile.name}, a ${profile.role} with ${profile.experienceYears} years of experience at ${profile.company}, focused on building reliable ITSM solutions, workflow automation, Service Catalog experiences, scripting, and enterprise integrations.`,
  aboutHeading: "Turning business processes into scalable ServiceNow solutions.",
  aboutParagraphs: [
    `With ${profile.experienceYears} years of professional experience at ${profile.company}, I work with enterprise ServiceNow environments to translate business requirements into practical, maintainable solutions.`,
    "My work brings together ITSM development, workflow automation, Service Catalog, scripting, and integrations — connecting business processes with the platform capabilities that make them work.",
  ],
  capabilities: [
    { title: "Service Management", icon: "service", items: ["Incident", "Problem", "Change", "Request"] },
    { title: "Automation", icon: "automation", items: ["Flow Designer", "Approvals", "Notifications"] },
    { title: "Development", icon: "development", items: ["Business Rules", "Client Scripts", "Script Includes"] },
    { title: "Integrations", icon: "integrations", items: ["REST API", "JSON", "IntegrationHub"] },
  ],
  highlights: [
    { value: `${profile.experienceYears} Years`, label: "Professional Experience", icon: "experience" },
    { value: "ServiceNow", label: "Primary Platform", icon: "platform" },
    { value: "ITSM", label: "Core Expertise", icon: "itsm" },
    { value: "JavaScript", label: "Development", icon: "code" },
  ],
  workflow: [
    { label: "Request", detail: "A business need", icon: "request" },
    { label: "ServiceNow", detail: "One connected platform", icon: "platform" },
    { label: "Approval", detail: "The right people", icon: "approval" },
    { label: "Automation", detail: "A reliable process", icon: "automation" },
    { label: "Fulfillment", detail: "A request, resolved", icon: "fulfillment" },
  ],
} as const;
