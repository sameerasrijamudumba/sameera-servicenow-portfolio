import type { Experience, ContentRecord } from "@/types/portfolio";

export const experienceDrafts = [
  {
    "status": "placeholder",
    "reason": "Responsibilities are examples in the specification; confirm before publication. Dates were not supplied. Expertise themes do not establish chronology.",
    "data": {
      "company": "Cognizant",
      "role": "ServiceNow Developer",
      "durationLabel": "4 Years",
      "startDate": null,
      "endDate": null,
      "responsibilities": [
        "Developed and customized ServiceNow ITSM applications.",
        "Worked extensively with Incident, Problem, Change and Request Management.",
        "Developed Service Catalog items and Record Producers.",
        "Created Catalog Client Scripts and UI Policies.",
        "Developed Business Rules and Client Scripts.",
        "Created reusable server-side logic using Script Includes.",
        "Developed automated workflows using Flow Designer.",
        "Configured notifications and approval processes.",
        "Implemented REST API integrations between ServiceNow and external systems.",
        "Worked with ACLs and role-based access controls.",
        "Troubleshot production issues and ServiceNow platform defects.",
        "Participated in requirement gathering and technical discussions.",
        "Worked with update sets for controlled movement of configurations between ServiceNow instances.",
        "Supported testing, deployment and post-production validation.",
        "Followed enterprise development and change-management practices."
      ],
      "expertiseThemes": [
        "ServiceNow Platform",
        "ITSM Development",
        "Workflow Automation",
        "API Integrations",
        "Enterprise Solutions"
      ]
    }
  }
] as const satisfies readonly ContentRecord<Experience>[];
