import type { Walkthrough } from "@/types/portfolio";

/** Detailed portfolio designs, not claims of a confidential production deployment. */
const catalogLifecycle = [
  { label: "REQ", table: "sc_request", description: "The parent order. One REQ can contain multiple requested items; one item finishing does not mean every item in the order is complete." },
  { label: "RITM", table: "sc_req_item", description: "The requested item. Its request reference links to the REQ; variables, approvals, and the fulfillment flow belong to the item." },
  { label: "SCTASK", table: "sc_task", description: "An actionable fulfillment task. Its request_item reference links to the RITM. An item may need zero, one, or multiple tasks." },
] as const;

export const walkthroughs: Record<string, Walkthrough> = {
  "automated-employee-access-request": {
    title: "Employee Access Request Management",
    role: ["Requirement analysis", "Catalog configuration", "Client-side development", "Approval and task-flow implementation", "Functional testing", "Deployment support planning"],
    workflow: ["Employee → Catalog Item", "Variables validated → REQ / RITM", "Manager approval", "Application owner approval", "Create SCTASK → Assignment group", "Fulfillment confirmed → RITM closure", "REQ completion after all items finish"],
    workflowNote: "The RITM exists before the approval flow begins. Either rejection stops fulfillment, records the decision, and notifies the requester; no SCTASK is created on that branch.",
    components: ["Catalog Item", "Variables", "Variable Sets", "Catalog Client Scripts", "Catalog UI Policies", "Flow Designer", "Ask for Approval", "Create Catalog Task", "Assignment Groups", "Notifications", "REQ / RITM / SCTASK"],
    lifecycle: catalogLifecycle,
    implementation: [
      { title: "Capture the access request", description: "Define requested_for, application, access_level, and business_justification variables. A shared requester variable set can be reused where the same fields and rules apply across items." },
      { title: "Separate form behavior from enforcement", description: "Use Catalog UI Policies for conditional visibility and mandatory fields. Catalog Client Scripts handle helpful field interactions. Validate the application and permitted access level again in server-side processing." },
      { title: "Resolve approvers, then create work", description: "Trigger Flow Designer for the requested item. Resolve the requested-for employee's manager and the application's configured owner. Run two approval stages, then Create Catalog Task with the RITM reference and configured assignment group." },
      { title: "Track fulfillment and close intentionally", description: "Wait for required tasks to finish, distinguish successful completion from cancellation or failure, and update the RITM accordingly. Use the configured request lifecycle to complete the REQ only when its other items are also resolved." },
    ],
    logic: [
      { title: "Approval gates", description: "Proceed only on an explicit approved result from both stages. Rejected, cancelled, timed-out, and missing-approver paths require different handling; none should silently authorize access." },
      { title: "Task ownership", description: "Map the selected application to an active fulfillment group through configuration. Put the requested access and business justification on the task for the fulfiller; task creation does not itself grant access." },
      { title: "Notification events", description: "Notify approvers when action is required, the requester on rejection or completion, and fulfillment teams when work is assigned. Avoid resending messages on unrelated record updates." },
    ],
    decisions: [
      { title: "Missing manager or owner", description: "Route to controlled triage instead of auto-approving. Capture why the request is blocked so an administrator can correct ownership data." },
      { title: "Shared variable sets", description: "Reuse common requester fields, but keep application-specific access options on the item. This limits the impact of changing one application's rules." },
      { title: "Prevent premature closure", description: "A closed task may be incomplete rather than successful. Check the intended terminal result and all required tasks before setting the item to fulfilled." },
    ],
    tests: [
      { scenario: "Both approvals granted", expected: "Exactly the intended fulfillment task is created against the RITM and assigned to the configured group." },
      { scenario: "Manager or owner rejects", expected: "No fulfillment task is created; the requester receives the rejection outcome." },
      { scenario: "Approver or group missing", expected: "Request is held for triage without granting or implying access." },
      { scenario: "One REQ, several RITMs", expected: "Completing one RITM does not prematurely close unfinished siblings." },
      { scenario: "Cancellation or failed task", expected: "Item state and notifications reflect the actual outcome rather than successful fulfillment." },
    ],
    samples: [],
  },
  "incident-assignment-automation": {
    title: "Incident Assignment Automation",
    role: ["Routing requirement analysis", "Assignment-rule configuration", "Server-side development", "Lookup configuration", "Regression testing", "Deployment support planning"],
    workflow: ["Incident", "Category / subcategory evaluation", "Assignment rule or lookup logic", "Active assignment group", "Assignment notification"],
    workflowNote: "Use a single routing owner. The flow preserves deliberate manual assignment and routes unmatched combinations to an agreed triage group.",
    components: ["Incident", "Assignment Rules", "Before Business Rule", "GlideRecord", "Groups", "Routing Lookup Configuration", "Notifications"],
    implementation: [
      { title: "Agree on a routing matrix", description: "Define category/subcategory mappings and a fallback with support teams. Store target groups as references in configuration, with active flags and explicit precedence." },
      { title: "Start with Assignment Rules", description: "Use native Assignment Rules when conditions express the routing clearly. They apply to unassigned tasks; overlapping rules need deliberate ordering because the lowest matching order takes precedence." },
      { title: "Use a Business Rule only for the custom path", description: "For a maintained lookup model, a before-insert Business Rule can query a custom mapping table using GlideRecord. Guard preassigned records, set assignment_group on current, and avoid current.update() inside the rule." },
      { title: "Notify after a meaningful assignment", description: "Configure the notification for a newly assigned group or a real group change, rather than sending an email every time an incident is saved." },
    ],
    logic: [
      { title: "Configurable group references", description: "The lookup stores a reference to sys_user_group. Environment-specific records may not share the same sys_id, and group names can change. Move or reconcile configuration deliberately instead of embedding identifiers or display names in scripts." },
      { title: "Safe lookup behavior", description: "Filter by category, subcategory, and active status. Require one unambiguous result and an active target group. An absent or ambiguous result should take a defined fallback path." },
      { title: "Update policy", description: "The sample only handles insertion. Re-evaluation after category changes needs a separate explicit rule that respects manual ownership and avoids reassignment loops." },
    ],
    decisions: [
      { title: "Rules versus a lookup table", description: "Use declarative rules for a small stable matrix. Use a governed lookup when many mappings need ongoing maintenance; restrict who can edit that configuration." },
      { title: "No hard-coded sys_ids", description: "Keep group choices in reference fields owned by configuration. The script then reads the configured reference and validates it, without baking one instance's identity into source code." },
      { title: "No competing writers", description: "Do not let an Assignment Rule, Business Rule, and flow all set assignment_group independently. Document execution order and choose one owner for each scenario." },
    ],
    tests: [
      { scenario: "Each synthetic routing mapping", expected: "The correct active group is selected for software, network, and hardware cases." },
      { scenario: "Group already assigned", expected: "The existing assignment remains unchanged." },
      { scenario: "Missing or duplicate lookup rows", expected: "No arbitrary group is selected; the controlled fallback/triage path runs." },
      { scenario: "Inactive target group", expected: "Assignment is not made to the inactive group." },
      { scenario: "Repeated unrelated updates", expected: "No reassignment loop and no duplicate assignment notifications." },
    ],
    samples: [{
      title: "Configuration-based routing", language: "javascript",
      note: "Synthetic server-side example for a before-insert Business Rule. u_portfolio_route and its fields are illustrative custom configuration, not built-in tables. Fallback handling is outside this focused fragment; this is not employer code or a drop-in production rule.",
      code: `// Demonstration only; custom schema must be defined first.
(function routeIncident(current) {
  if (!current.assignment_group.nil() || !current.assigned_to.nil()) return;

  var route = new GlideRecord('u_portfolio_route');
  route.addQuery('u_active', true);
  route.addQuery('u_category', current.getValue('category'));
  route.addQuery('u_subcategory', current.getValue('subcategory'));
  route.setLimit(2);
  route.query();
  if (!route.next()) return; // Use the configured triage path.

  var groupId = route.getValue('u_assignment_group');
  if (route.next() || !groupId) return; // Ambiguous or incomplete.

  var group = new GlideRecord('sys_user_group');
  if (!group.get(groupId) || group.getValue('active') !== '1') return;

  current.setValue('assignment_group', group.getUniqueValue());
  // A before rule persists this value without current.update().
})(current);`,
    }],
  },
  "rest-api-integration": {
    title: "ServiceNow REST API Integration",
    role: ["API contract analysis", "Scripted REST configuration", "Validation and response development", "Integration-permission design", "Postman testing", "Deployment support planning"],
    workflow: ["External System", "Authentication", "REST API resource", "Payload validation", "ServiceNow authorization / field mapping", "Incident creation or update", "Structured HTTP response"],
    workflowNote: "This is an inbound custom REST contract. REST Messages are relevant only if a separate outbound synchronization is required. Invalid or unauthorized requests exit with an error before any incident write.",
    components: ["Scripted REST API", "REST Resource", "JSON", "Authentication", "API ACLs", "Integration User", "Incident", "Business Rules", "REST Messages (optional outbound)"],
    implementation: [
      { title: "Define a narrow contract", description: "Allow only agreed fields: external_id, short_description, description, category, and subcategory. Set length limits and allowed choice values. Treat the payload schema as a custom contract, not a stock Table API response." },
      { title: "Authenticate and authorize", description: "Require HTTPS and an approved authentication method such as OAuth. Give a dedicated integration identity only necessary roles. Enforce API access and table/field permissions explicitly: a custom script's GlideRecord calls do not automatically guarantee ACL enforcement." },
      { title: "Validate and correlate", description: "Reject malformed or invalid JSON before writes. Use a source-system plus external_id correlation key backed by uniqueness controls, so retries resolve to the same incident even under concurrent delivery." },
      { title: "Respond and observe", description: "Return a structured result and appropriate status. Log a correlation reference, operation, and safe error category; omit credentials and sensitive bodies. Never return raw exception details to callers." },
    ],
    logic: [
      { title: "Field allowlist", description: "Do not blindly copy request fields onto an incident. Prevent callers from setting arbitrary assignment, state, caller, or security-sensitive values outside the contract." },
      { title: "Create / update semantics", description: "For this proposed upsert contract, a new correlation key creates an incident (201); an existing key updates allowed fields (200). A key collision or inconsistent source mapping returns 409 instead of updating the wrong record." },
      { title: "Permissions at both layers", description: "Restrict the REST resource and integration roles, then use ACL-aware access or explicit permission checks for record and field operations. Test with the integration identity, not an administrator." },
    ],
    decisions: [
      { title: "Authentication lifecycle", description: "Keep secrets outside scripts and payloads, limit token scope, and plan rotation. A valid login must not confer unrestricted incident or field access." },
      { title: "Error and retry strategy", description: "Return stable error codes and validation messages. Retry transient failures with a bounded backoff policy; do not blindly retry permission or schema failures." },
      { title: "Postman contract tests", description: "Use synthetic payloads and an isolated test environment. Assert status, response schema, field persistence, permissions, and repeated-request behavior. Keep authentication values out of exported collections." },
    ],
    statuses: [
      { code: "201", meaning: "Created a new incident for a new correlation key." },
      { code: "200", meaning: "Updated the matched incident successfully." },
      { code: "400", meaning: "Malformed JSON or invalid/missing allowed input." },
      { code: "401 / 403", meaning: "Missing/invalid authentication, or authenticated but not authorized." },
      { code: "409", meaning: "Correlation conflict; no unsafe write performed." },
      { code: "500", meaning: "Unexpected server failure; sanitized error and correlation reference." },
    ],
    tests: [
      { scenario: "Valid create and update in Postman", expected: "201 then 200; response structure and stored allowed fields match the contract." },
      { scenario: "Malformed JSON / missing description summary", expected: "400 and an actionable validation code, with no incident created." },
      { scenario: "Invalid token / insufficient role", expected: "401 or 403 as applicable; no incident write or data disclosure." },
      { scenario: "Duplicate and concurrent external_id", expected: "One correlated incident; conflicts handled deliberately without duplicate creation." },
      { scenario: "Unexpected failure", expected: "Sanitized 500 response and a support trace without secrets or raw payload logging." },
    ],
    samples: [
      { title: "Synthetic JSON request", language: "json", note: "Proposed custom API payload. Fictional values only; no credentials or endpoint.", code: `{
  "external_id": "DEMO-CASE-001",
  "short_description": "Demo VPN connection issue",
  "description": "Synthetic incident for contract testing.",
  "category": "network",
  "subcategory": "vpn"
}` },
      { title: "Synthetic JSON response · HTTP 201", language: "json", note: "Illustrative custom response, not the default ServiceNow Table API format. The displayed record identifier is fictional.", code: `{
  "status": "created",
  "external_id": "DEMO-CASE-001",
  "incident_number": "INC-DEMO-001",
  "correlation_id": "DEMO-TRACE-001"
}` },
      { title: "Synthetic validation error · HTTP 400", language: "json", note: "Expose safe, predictable contract errors rather than internal stack traces.", code: `{
  "error": {
    "code": "INVALID_INPUT",
    "message": "short_description is required"
  },
  "correlation_id": "DEMO-TRACE-002"
}` },
    ],
  },
  "service-catalog-automation": {
    title: "Dynamic Service Catalog Automation",
    role: ["Request-process analysis", "Catalog and variable-set configuration", "Catalog Client Script development", "Flow implementation", "Form and fulfillment testing", "Deployment support planning"],
    workflow: ["User → Catalog Item", "Dynamic variables", "Form and server validation", "Submit → REQ / RITM", "Approval", "Create SCTASK → Fulfillment group", "Fulfillment → Notifications", "RITM closure → REQ completion"],
    workflowNote: "Submission creates the RITM before approval. The approval controls whether fulfillment work proceeds; it does not create the RITM after the decision.",
    components: ["Catalog Item", "Dynamic Variables", "Variable Sets", "Catalog Client Scripts", "Catalog UI Policies", "Flow Designer", "Approvals", "Catalog Tasks", "Notifications"],
    lifecycle: catalogLifecycle,
    implementation: [
      { title: "Build a reusable request model", description: "Use a shared requester/contact variable set and item-specific service options. Define variable names consistently so scripts and flows can consume the same contract across related items." },
      { title: "Guide the form", description: "Use UI Policies for show/hide and mandatory behavior, including reverse conditions when a choice changes. Reserve Catalog Client Scripts for interactions that need logic beyond those policies." },
      { title: "Validate and orchestrate", description: "Check required values and permitted combinations on the server as well as the form. Start the item flow on the RITM, resolve approvals, and create catalog tasks linked through request_item after approval." },
      { title: "Reuse fulfillment patterns", description: "Parameterize a subflow with the RITM and configured group for repeatable task creation. Wait for the correct task outcome, update the item, and notify relevant participants once per meaningful transition." },
    ],
    logic: [
      { title: "Dynamic variables", description: "A selected service determines which dependent variables are visible and required. Clear or ignore stale hidden answers according to the service contract, and validate the final combination again when processing." },
      { title: "Reusable behavior", description: "Keep common requester fields in variable sets, common task orchestration in subflows, and item-specific decisions in configuration. Avoid duplicating the same script across every item." },
      { title: "Fulfillment and closure", description: "Create one or more SCTASK records only for approved work. Check required tasks, preserve unsuccessful outcomes, and let the parent request lifecycle account for all requested items." },
    ],
    decisions: [
      { title: "UI Policy versus Client Script", description: "Prefer declarative policies for field visibility and mandatory rules. Do not implement the same rule in both places, which makes conflicts and maintenance harder." },
      { title: "Shared changes have shared impact", description: "A variable-set or subflow change can affect multiple items. Test the consumers before moving the configuration to another instance." },
      { title: "No successful closure on rejection", description: "Rejected or cancelled requests stop the approved fulfillment branch. Failed tasks need an explicit recovery or incomplete path instead of automatic successful closure." },
    ],
    tests: [
      { scenario: "Change service options repeatedly", expected: "Correct fields appear, mandatory rules reverse, and hidden stale values are handled consistently." },
      { scenario: "Bypass client-side validation", expected: "Server-side processing rejects invalid or incompatible values." },
      { scenario: "Approve, reject, or cancel", expected: "Only approved requests produce the intended catalog tasks." },
      { scenario: "Shared variable set reused", expected: "All consuming items retain their expected form and flow behavior." },
      { scenario: "Task completion and failure", expected: "RITM and REQ outcomes remain consistent, with no duplicate notifications." },
    ],
    samples: [],
  },
};
