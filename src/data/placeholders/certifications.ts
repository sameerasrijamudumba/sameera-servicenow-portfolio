import type { Certification, ContentRecord } from "@/types/portfolio";

export const certificationDrafts = [
  {
    "status": "placeholder",
    "reason": "Example credential only; completion is not confirmed. Do not publish.",
    "data": {
      "name": "ServiceNow Certified System Administrator",
      "issuer": "ServiceNow",
      "issuedOn": null,
      "credentialUrl": null
    }
  },
  {
    "status": "placeholder",
    "reason": "Example credential only; completion is not confirmed. Do not publish.",
    "data": {
      "name": "ServiceNow Certified Application Developer",
      "issuer": "ServiceNow",
      "issuedOn": null,
      "credentialUrl": null
    }
  }
] as const satisfies readonly ContentRecord<Certification>[];
