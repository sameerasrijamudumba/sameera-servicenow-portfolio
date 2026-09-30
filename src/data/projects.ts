import type { CaseStudy } from "@/types/portfolio";

/** Portfolio scenarios authorized in Phase 4. Internal review state is never rendered. */
export const projects = [
  {
    slug: "automated-employee-access-request", number: "01", category: "Service Catalog / Flow Designer",
    title: "Automated Employee Access Request", verification: "pending", kind: "portfolio-scenario",
    overview: "A portfolio solution scenario exploring how application-access requests can move through one connected catalog, approval, and fulfillment process.",
    problem: "Employee application-access requests required manual coordination between employees, managers, application owners, and IT teams.",
    requirements: ["Capture the employee, application, access level, and business justification in a structured request.", "Route the request through manager and application-owner approval before IT fulfillment.", "Make ownership and request status visible throughout the process."],
    solution: "Design a ServiceNow catalog-based request process that captures the required access information and automatically routes the request through the appropriate approval and fulfillment stages.",
    workflowTitle: "Access request lifecycle",
    workflow: ["Employee", "Catalog Request", "Manager Approval", "Application Owner Approval", "IT Fulfillment", "Request Closed"],
    technologies: ["Service Catalog", "Catalog Items", "Variables", "Client Scripts", "UI Policies", "Flow Designer", "Approvals", "Notifications"],
    mappings: [],
    implementation: [
      { title: "Structure the request", description: "Define catalog variables for the required access information. Use UI Policies for conditional fields and Client Scripts for helpful form behavior, with authoritative validation before processing." },
      { title: "Coordinate approvals", description: "Use Flow Designer to resolve the manager and application owner, request their approvals in sequence, and branch explicitly for rejection or missing approvers." },
      { title: "Complete fulfillment", description: "After approval, create work for the responsible IT team. Notify the requester at meaningful status changes and close the request after fulfillment is confirmed." },
    ],
    considerations: [
      { title: "Approval exceptions", description: "Define what happens when an approver is missing, unavailable, or rejects the request. Avoid silently treating an unresolved approval as authorization." },
      { title: "Access boundaries", description: "Limit visibility and updates to the appropriate participants. Form behavior should complement, rather than replace, server-side access controls." },
      { title: "Validation paths", description: "Test approval, rejection, cancellation, duplicate submissions, and incomplete fulfillment with synthetic requests." },
    ],
    outcome: "A standardized request process with clearer ownership, automated approval routing, and improved request visibility.",
  },
  {
    slug: "incident-assignment-automation", number: "02", category: "ITSM / Automation",
    title: "Incident Assignment Automation", verification: "pending", kind: "portfolio-scenario",
    overview: "A portfolio solution scenario for consistent incident routing, using issue categories and subcategories to identify an appropriate support group.",
    problem: "Incoming incidents require consistent routing to the appropriate support group based on the nature of the issue.",
    requirements: ["Evaluate incident category and subcategory against a clear set of routing conditions.", "Identify a support group for known issue combinations and provide a fallback for unmatched incidents.", "Preserve intentional manual assignments and avoid repeated reassignment."],
    solution: "Create automated assignment logic using incident attributes such as category and subcategory.",
    workflowTitle: "Incident routing logic",
    workflow: ["Incident Created", "Evaluate Category", "Evaluate Subcategory", "Assignment Logic", "Support Group"],
    technologies: ["Incident Management", "Business Rules", "Assignment Rules", "GlideRecord", "ServiceNow Scripting", "Notifications"],
    mappings: [{ input: "Software + Outlook", output: "Messaging Support" }, { input: "Network + VPN", output: "Network Support" }, { input: "Hardware + Laptop", output: "End User Computing" }],
    implementation: [
      { title: "Define routing conditions", description: "Document category and subcategory mappings with a default triage group for incomplete or unmatched information. Keep routing configuration easy to maintain." },
      { title: "Choose one routing owner", description: "Prefer Assignment Rules for condition-based routing. Where custom processing is needed, use scoped server-side logic and targeted GlideRecord lookups without competing assignment mechanisms." },
      { title: "Validate routing behavior", description: "Test each sample mapping, unknown categories, inactive groups, and manually assigned incidents. Trigger notifications only when a meaningful assignment change occurs." },
    ],
    considerations: [
      { title: "Rule precedence", description: "Define evaluation order and eliminate overlapping conditions that could send the same incident to different groups." },
      { title: "Manual overrides", description: "Guard against overwriting intentional assignments. Establish explicit conditions for when automatic routing may run again." },
      { title: "Maintainable lookups", description: "Avoid embedding environment-specific identifiers in reusable logic. Check that the target group exists and is active." },
    ],
    outcome: "More consistent incident routing and reduced dependence on manual assignment.",
  },
  {
    slug: "rest-api-integration", number: "03", category: "Integration",
    title: "ServiceNow REST API Integration", verification: "pending", kind: "portfolio-scenario",
    overview: "A portfolio architecture scenario for exchanging incident information between an external application and ServiceNow through a controlled REST contract.",
    problem: "An external enterprise application needs to exchange incident information with ServiceNow without manual ticket creation.",
    requirements: ["Accept authenticated requests to create or update incident information.", "Validate JSON payloads and map approved fields consistently.", "Return clear success or error responses and correlate updates to the intended incident."],
    solution: "Create a REST-based integration that allows incident information to be created or updated programmatically.",
    workflowTitle: "Incident integration architecture",
    workflow: ["External Application", "REST API", "ServiceNow", "Incident Processing", "Assignment Logic", "Support Team"],
    technologies: ["REST API", "REST Messages", "Scripted REST API", "JSON", "Authentication", "Business Rules"],
    mappings: [],
    implementation: [
      { title: "Define the contract", description: "Specify allowed fields, required values, correlation identifiers, response codes, and create-versus-update behavior before configuring an endpoint." },
      { title: "Process inbound requests", description: "Use a Scripted REST API when the scenario requires a custom inbound contract. Authenticate and authorize callers, validate payloads, and pass accepted incident data through controlled processing." },
      { title: "Handle response and synchronization", description: "Return a structured response with a correlation reference. If outbound updates are required, configure REST Messages separately; keep inbound handling and outbound calls distinct." },
    ],
    considerations: [
      { title: "Authentication and permissions", description: "Choose the authentication method with the consuming system and security requirements in mind. Restrict the integration account to necessary operations; never place credentials in client-side code." },
      { title: "Retries and duplicates", description: "Use a defined correlation strategy so repeated delivery does not create duplicate incidents. Specify timeout and retry behavior for outbound operations." },
      { title: "Operational visibility", description: "Return useful validation errors and record enough diagnostic context for support without logging secrets or sensitive payload fields." },
    ],
    outcome: "Automated exchange of incident information between systems and a more consistent integration workflow.",
  },
  {
    slug: "service-catalog-automation", number: "04", category: "Service Catalog / Workflow",
    title: "Service Catalog Automation", verification: "pending", kind: "portfolio-scenario",
    overview: "A portfolio solution scenario for a recurring IT service request, connecting a guided catalog form with validation, approvals, fulfillment, and notifications.",
    problem: "A recurring IT request involves multiple manual steps, approvals, validation, and notification emails.",
    requirements: ["Display relevant request fields dynamically and validate required information.", "Route approvals and fulfillment tasks according to the requested service.", "Notify participants of meaningful changes and close the request only after completion."],
    solution: "Build a structured ServiceNow Catalog Item with dynamic fields, validation, approval routing, and automated fulfillment.",
    workflowTitle: "Catalog fulfillment flow",
    workflow: ["User Request", "Dynamic Form", "Validation", "Approval", "Fulfillment", "Notification", "Closure"],
    technologies: ["Service Catalog", "Catalog Client Scripts", "UI Policies", "Flow Designer", "Approval Actions", "Notifications"],
    mappings: [],
    implementation: [
      { title: "Build the service form", description: "Define catalog variables and conditional fields. Use UI Policies for visibility and mandatory behavior, and Catalog Client Scripts for interactions that need scripting." },
      { title: "Orchestrate the request", description: "Validate submitted information before starting approval actions. Use Flow Designer to branch on approval decisions and create the appropriate fulfillment work." },
      { title: "Close the loop", description: "Send status notifications to the relevant participants and require completion checks before closure. Test rejection, cancellation, and failed fulfillment as well as the successful path." },
    ],
    considerations: [
      { title: "Validation beyond the form", description: "Client-side checks improve usability but should not be the sole control on submitted data. Validate business rules where the request is processed." },
      { title: "Workflow exceptions", description: "Specify how missing information, rejected approvals, and incomplete tasks are handled without advancing the request incorrectly." },
      { title: "Notification quality", description: "Tie messages to meaningful transitions and prevent duplicate or unnecessary emails when a request is updated." },
    ],
    outcome: "A standardized request experience with automated workflow and reduced repetitive administrative steps.",
  },
] as const satisfies readonly CaseStudy[];

export const projectsIntroduction = {
  heading: "ServiceNow Projects & Solution Case Studies",
  description: "A selection of ServiceNow solutions focused on workflow automation, IT service management, integrations, and employee service experiences.",
};

export const caseStudySections = [
  { id: "overview", number: "01", title: "Project Overview" },
  { id: "business-problem", number: "02", title: "Business Scenario" },
  { id: "requirements", number: "03", title: "Requirements" },
  { id: "role", number: "04", title: "My Role" },
  { id: "solution-design", number: "05", title: "Solution Design" },
  { id: "workflow", number: "06", title: "Detailed Workflow / Architecture" },
  { id: "components", number: "07", title: "ServiceNow Components Used" },
  { id: "implementation", number: "08", title: "Implementation Approach" },
  { id: "logic", number: "09", title: "Technical Logic" },
  { id: "considerations", number: "10", title: "Technical Challenges & Decisions" },
  { id: "testing", number: "11", title: "Testing Approach" },
  { id: "outcome", number: "12", title: "Outcome" },
] as const;
