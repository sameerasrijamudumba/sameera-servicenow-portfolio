import type { Project, ContentRecord } from "@/types/portfolio";

export const projectDrafts = [
  {
    "status": "placeholder",
    "reason": "Specification outline awaiting confirmation as actual professional work. Missing detail must be supplied before publication.",
    "data": {
      "slug": "automated-employee-access-request",
      "title": "Automated Employee Access Request",
      "problem": "Employee application-access requests required multiple manual approvals and repetitive coordination between IT teams.",
      "requirement": null,
      "solution": "Developed a ServiceNow catalog-based request process that automatically routed requests through manager and application-owner approvals.",
      "technologies": [
        "Service Catalog",
        "Catalog Items",
        "Variables",
        "Client Scripts",
        "UI Policies",
        "Flow Designer",
        "Approval Actions",
        "Notifications"
      ],
      "workflow": [
        "Employee Request",
        "Manager Approval",
        "Application Owner Approval",
        "IT Fulfillment",
        "Request Closure"
      ],
      "examples": [],
      "implementation": null,
      "challenges": [],
      "result": "Reduced manual coordination and provided users with better visibility into the status of their requests."
    }
  },
  {
    "status": "placeholder",
    "reason": "Specification outline awaiting confirmation as actual professional work. Missing detail must be supplied before publication.",
    "data": {
      "slug": "incident-assignment-automation",
      "title": "Incident Assignment Automation",
      "problem": "Service desk agents were manually reviewing incoming incidents and assigning them to appropriate support groups.",
      "requirement": null,
      "solution": "Implemented automated assignment logic based on incident category, subcategory and configuration information.",
      "technologies": [
        "Incident Management",
        "Business Rules",
        "Assignment Rules",
        "GlideRecord",
        "Notifications",
        "ServiceNow Scripting"
      ],
      "workflow": [],
      "examples": [
        {
          "input": "Software + Microsoft Outlook",
          "output": "Messaging Support Team"
        },
        {
          "input": "Network + VPN",
          "output": "Network Support Team"
        },
        {
          "input": "Hardware + Laptop",
          "output": "End User Computing Team"
        }
      ],
      "implementation": null,
      "challenges": [],
      "result": "Improved consistency in incident routing and reduced unnecessary manual assignment effort."
    }
  },
  {
    "status": "placeholder",
    "reason": "Specification outline awaiting confirmation as actual professional work. Missing detail must be supplied before publication.",
    "data": {
      "slug": "rest-api-integration",
      "title": "REST API Integration",
      "problem": "An external enterprise application needed to automatically create and update ServiceNow incidents.",
      "requirement": null,
      "solution": "Implemented REST-based integration between the external application and ServiceNow.",
      "technologies": [
        "REST API",
        "Scripted REST API",
        "REST Messages",
        "JSON",
        "Authentication",
        "Business Rules"
      ],
      "workflow": [
        "External Application",
        "REST API",
        "ServiceNow",
        "Incident Created",
        "Assignment Logic",
        "Support Team"
      ],
      "examples": [],
      "implementation": null,
      "challenges": [],
      "result": "Reduced dependency on manual ticket creation and enabled automated exchange of incident information."
    }
  },
  {
    "status": "placeholder",
    "reason": "Specification outline awaiting confirmation as actual professional work. Missing detail must be supplied before publication.",
    "data": {
      "slug": "service-catalog-automation",
      "title": "Service Catalog Automation",
      "problem": "A common IT service request involved multiple manual steps and approval emails.",
      "requirement": null,
      "solution": "Created a ServiceNow Catalog Item with dynamic fields, validation, approval routing and automated fulfillment.",
      "technologies": [
        "Service Catalog",
        "Catalog Client Scripts",
        "UI Policies",
        "Flow Designer",
        "Notifications",
        "Approval Actions"
      ],
      "workflow": [],
      "examples": [],
      "implementation": null,
      "challenges": [],
      "result": "Created a standardized request process and reduced repetitive administrative work."
    }
  }
] as const satisfies readonly ContentRecord<Project>[];
