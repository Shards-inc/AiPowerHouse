import type { GovernanceControl } from "../types/index.js";

export const GOVERNANCE_CONTROLS: GovernanceControl[] = [
  {
    id: "prompt-firewall",
    name: "Prompt firewall",
    description: "PII redaction and policy tags",
    status: "Enabled"
  },
  {
    id: "human-review",
    name: "Human review loop",
    description: "Approval gates for high-risk flows",
    status: "Queued"
  },
  {
    id: "data-residency",
    name: "Data residency",
    description: "Region: us-central1",
    status: "Compliant"
  }
];
