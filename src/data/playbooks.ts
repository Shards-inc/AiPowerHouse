import type { RoutingPlaybook } from "../types/index.js";

export const ROUTING_PLAYBOOKS: RoutingPlaybook[] = [
  {
    id: "launch-readiness",
    name: "Launch readiness",
    status: "Safe",
    description: "ChatGPT → Claude → Gemini (confidence > 0.86)",
    route: ["ChatGPT", "Claude", "Gemini"]
  },
  {
    id: "ops-escalation",
    name: "Ops escalation",
    status: "Monitor",
    description: "Grok → Perplexity → DeepSeek (live data routed)",
    route: ["Grok", "Perplexity", "DeepSeek"]
  },
  {
    id: "developer-copilot",
    name: "Developer copilot",
    status: "Optimized",
    description: "Co Pilot → Qwen → Mistral (code + docs coverage)",
    route: ["Co Pilot", "Qwen", "Mistral"]
  }
];
