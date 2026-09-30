import type { CodeSample, ContentRecord } from "@/types/portfolio";

export const codeSampleDrafts = [
  {
    "status": "placeholder",
    "reason": "Sample from the specification, awaiting Code Lab review. Never execute in the browser.",
    "data": {
      "id": "gliderecord",
      "title": "GlideRecord",
      "language": "javascript",
      "label": "Demonstration only — not Cognizant or client source code",
      "code": "var gr = new GlideRecord('incident');\ngr.addQuery('active', true);\ngr.addQuery('priority', 1);\ngr.query();\n\nwhile (gr.next()) {\n    gs.info(gr.number);\n}"
    }
  }
] as const satisfies readonly ContentRecord<CodeSample>[];
