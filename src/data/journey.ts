import type { JourneyStage, PreviewContent } from "@/types/portfolio";

/** Thematic capabilities, not dated milestones or promotions. */
export const journey = {
  verification: "pending",
  source: "Approved Phase 3 brief",
  data: [
    { title: "Foundation", capabilities: ["ServiceNow Platform", "ITSM Processes"] },
    { title: "Development", capabilities: ["Business Rules", "Client Scripts", "Script Includes"] },
    { title: "Automation", capabilities: ["Flow Designer", "Approvals", "Service Catalog"] },
    { title: "Integration", capabilities: ["REST APIs", "Enterprise Systems"] },
    { title: "Enterprise Solutions", capabilities: ["Scalable ServiceNow Development"] },
  ],
} as const satisfies PreviewContent<readonly JourneyStage[]>;
