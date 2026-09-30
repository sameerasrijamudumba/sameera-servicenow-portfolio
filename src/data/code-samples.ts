import type { CodeLabExample } from "@/types/portfolio";

// Authored synthetic demonstrations. Display as text; never execute in the portfolio.
export const codeSamples = [
  {
    id: "gliderecord", category: "GlideRecord", title: "Query Active Priority 1 Incidents",
    purpose: "Demonstrate server-side record querying using GlideRecord.", context: "Server-side / Read operation",
    blocks: [{ title: "Incident query", language: "javascript", code: `var incidentGR = new GlideRecord('incident');
incidentGR.addQuery('active', true);
incidentGR.addQuery('priority', 1);
incidentGR.setLimit(20); // Bound this demonstration.
incidentGR.query();

while (incidentGR.next()) {
    gs.info(incidentGR.getValue('number'));
}` }],
    explanation: [
      { title: "Build the query", description: "Initialize GlideRecord for incident. Each addQuery() adds a condition; together they select active priority 1 records." },
      { title: "Execute and read", description: "query() runs the request. next() advances the cursor, and getValue() reads a field value from the current record." },
    ],
    considerations: "GlideRecord runs on the server. Use selective filters and suitable indexes on large tables; this example limits output to 20 records, not a complete report. Avoid unnecessary logging, and use ACL-aware access when caller permissions must be enforced.",
  },
  {
    id: "business-rule", category: "Business Rule", title: "Automatically Route VPN Incidents",
    purpose: "Route an unassigned VPN incident through a reusable, configuration-driven lookup.", context: "Server-side / Before insert Business Rule",
    blocks: [{ title: "Before insert · Incident", language: "javascript", code: `(function executeRule(current, previous) {
    if (!current.assignment_group.nil() ||
        !current.assigned_to.nil()) return;

    if (current.getValue('category') !== 'network' ||
        current.getValue('subcategory') !== 'vpn') return;

    var groupId = new PortfolioAssignmentUtil()
        .findGroup('network', 'vpn');

    if (groupId) {
        current.setValue('assignment_group', groupId);
    }
    // No current.update(): this is a before rule.
})(current, previous);` }],
    explanation: [
      { title: "Timing and record context", description: "current is the record being saved. A before-insert rule sets values before persistence. previous represents earlier values on supported update contexts; this insert-only example does not use it, and it is unavailable in async rules." },
      { title: "Configuration owns the destination", description: "The Script Include tab defines PortfolioAssignmentUtil. A synthetic network/vpn lookup row references the intended Network Support group; the rule contains no fixed group identifier." },
    ],
    considerations: "Use the same application scope as the utility. Avoid current.update() and recursive saves. Preserve deliberate assignments, define a triage path for missing configuration, and choose one routing owner so Assignment Rules and Business Rules do not compete. Avoid unnecessary hard-coded sys_ids.",
  },
  {
    id: "client-script", category: "Client Script", title: "Dynamic Form Behavior",
    purpose: "Display an informational field message when impact changes to High.", context: "Browser / onChange Client Script on impact",
    blocks: [{ title: "Impact field · onChange", language: "javascript", code: `function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;

    // Clear the earlier message attached to this field.
    g_form.hideFieldMsg('impact', true);

    if (g_form.getValue('impact') === '1') {
        g_form.showFieldMsg(
            'impact',
            'High impact selected. Confirm affected services.',
            'info'
        );
    }
}` }],
    explanation: [
      { title: "Respond in the browser", description: "Configure an onChange Client Script for impact. getValue() reads the stored choice value; this example assumes High is '1'. showFieldMsg() places guidance beside that field." },
      { title: "Clear the right message", description: "hideFieldMsg() clears field messages before reapplying the hint. clearMessages() is appropriate for form-level messages added with addInfoMessage() or addErrorMessage(); it does not replace field-message cleanup." },
    ],
    considerations: "Client Scripts run in the user's browser and are not security controls. Coordinate field-message ownership so one script does not clear another script's advice. Prefer UI Policies for declarative field behavior, and validate important rules on the server too.",
  },
  {
    id: "glideajax", category: "GlideAjax", title: "Retrieve Server Data from a Client Script",
    purpose: "Fetch a synthetic support hint asynchronously and apply it to the form.", context: "Browser ↔ Server / Synthetic guidance lookup",
    workflow: ["Client Script", "GlideAjax", "Script Include", "Server Response", "Form Update"],
    blocks: [
      { title: "Client Script · category onChange", language: "javascript", code: `function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;
    g_form.hideFieldMsg('category', true);
    if (!newValue) return;

    var requestedCategory = newValue;
    var ajax = new GlideAjax('PortfolioSupportAjax');
    ajax.addParam('sysparm_name', 'getHint');
    ajax.addParam('sysparm_category', requestedCategory);
    ajax.getXMLAnswer(function(answer) {
        // Ignore a response for an outdated selection.
        if (g_form.getValue('category') !== requestedCategory) return;
        if (!answer) return;
        g_form.hideFieldMsg('category', true);
        g_form.showFieldMsg('category', answer, 'info');
    });
}` },
      { title: "Script Include · client callable", language: "javascript", code: `var PortfolioSupportAjax = Class.create();
PortfolioSupportAjax.prototype = Object.extendsObject(
    global.AbstractAjaxProcessor, {
        getHint: function() {
            var category = this.getParameter('sysparm_category');
            // Allowlisted synthetic data; no user records queried.
            if (category === 'network') {
                return 'Demo guidance: include connection details.';
            }
            return '';
        },
        type: 'PortfolioSupportAjax'
    }
);` },
    ],
    explanation: [
      { title: "An asynchronous contract", description: "addParam() supplies the method through sysparm_name and sends the category. getXMLAnswer() invokes a callback with the server's answer, keeping the form responsive." },
      { title: "Client-callable server logic", description: "The Script Include extends AbstractAjaxProcessor and must be configured as client callable. Use its correct API name across scopes; the example assumes both scripts are in the same scope." },
    ],
    considerations: "Restrict callable access to appropriate authenticated users and roles. Validate every client parameter and return only authorized data. This deliberately returns allowlisted synthetic guidance, not private user data. Empty answers leave the form unchanged; define user-safe error feedback for real remote failures.",
  },
  {
    id: "script-include", category: "Script Include", title: "Reusable Assignment Utility",
    purpose: "Resolve one active support group from a governed routing lookup.", context: "Server-side / Not client callable",
    blocks: [{ title: "PortfolioAssignmentUtil", language: "javascript", code: `var PortfolioAssignmentUtil = Class.create();
PortfolioAssignmentUtil.prototype = {
    initialize: function() {},

    findGroup: function(category, subcategory) {
        if (!category || !subcategory) return '';
        var route = new GlideRecord('u_portfolio_route');
        route.addQuery('u_active', true);
        route.addQuery('u_category', category);
        route.addQuery('u_subcategory', subcategory);
        route.setLimit(2);
        route.query();
        if (!route.next()) return '';

        var groupId = route.getValue('u_assignment_group');
        if (route.next() || !groupId) return '';

        var group = new GlideRecord('sys_user_group');
        if (!group.get(groupId) ||
            group.getValue('active') !== '1') return '';
        return group.getUniqueValue();
    },
    type: 'PortfolioAssignmentUtil'
};` }],
    explanation: [
      { title: "Separate lookup from routing", description: "The utility returns a group reference; its caller decides whether to assign the incident. Several Business Rules can reuse the lookup without copying query logic." },
      { title: "Maintain configuration once", description: "u_portfolio_route is an illustrative custom table with active, category, subcategory, and assignment-group reference fields. Two matches signal ambiguity; absent, duplicate, or inactive destinations return an empty result." },
    ],
    considerations: "Create the synthetic schema before use and restrict configuration edits. Enforce unique routing keys, validate caller inputs, and define fallback behavior. This server-only utility assumes a trusted caller; data permissions and cross-scope access need explicit review. Reuse improves maintainability without exposing the utility to browsers.",
  },
  {
    id: "rest-api", category: "REST API", title: "Create Incident through REST",
    purpose: "Illustrate a Table API create request with synthetic incident data.", context: "POST /api/now/table/incident",
    blocks: [
      { title: "Request body · JSON", language: "json", code: `{
  "short_description": "VPN connectivity issue",
  "description": "Unable to establish VPN connection",
  "category": "network",
  "subcategory": "vpn"
}` },
      { title: "Response excerpt · HTTP 201", language: "json", code: `{
  "result": {
    "number": "INC-DEMO-001",
    "short_description": "VPN connectivity issue",
    "category": "network",
    "subcategory": "vpn"
  }
}` },
    ],
    explanation: [
      { title: "Request contract", description: "POST creates a record; GET reads and PATCH updates. Send Content-Type: application/json and Accept: application/json. Authenticate over HTTPS with an approved mechanism such as OAuth and a least-privilege integration identity." },
      { title: "Response handling", description: "A successful create returns 201. The fictional result above is an abbreviated Table API response with identifiers omitted. Inspect errors and status: distinguish invalid input from authentication, permission, or server failures before retrying." },
    ],
    considerations: "The path is relative and contains no instance address or credentials. Confirm category choices, required fields, ACLs, and Business Rules in the target instance. A successful HTTP response still needs field-level verification. Avoid blind retries of POST requests that could create duplicate incidents.",
  },
] as const satisfies readonly CodeLabExample[];

export const developmentPractices = [
  "Avoid hard-coded sys_ids", "Keep queries efficient", "Reuse server-side logic",
  "Use client-side scripting only when necessary", "Validate inputs", "Apply least-privilege access",
  "Use meaningful naming conventions", "Handle errors gracefully", "Keep configuration separate from logic where practical",
] as const;
