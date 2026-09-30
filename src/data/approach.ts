import type { ApproachStep } from "@/types/portfolio";

export const approach = [
  { title: "Understand", description: "Understand the business requirement, users, existing process, dependencies and expected outcome." },
  { title: "Design", description: "Identify whether the solution requires configuration, scripting, automation or integration." },
  { title: "Develop", description: "Build reusable and maintainable ServiceNow solutions using platform best practices." },
  { title: "Validate", description: "Test functionality, security, edge cases and user experience before deployment." },
] as const satisfies readonly ApproachStep[];
