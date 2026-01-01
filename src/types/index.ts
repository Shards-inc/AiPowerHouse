/**
 * AI Model definitions and types
 */

export type ModelStatus = "primary" | "strong" | "multimodal" | "real-time" | "dev" | "social" | "ops" | "summarize" | "data" | "search" | "scale" | "research" | "insight" | "efficient";

export interface AIModel {
  id: string;
  name: string;
  description: string;
  status: ModelStatus;
  reliability: number;
  latency: number;
  badgeColor: string;
}

export interface ModelMetrics {
  latency: number;
  tokenBurn: number;
  risk: "Low" | "Medium" | "High";
  safetyScore: number;
}

export interface ConversationMessage {
  id: string;
  type: "user" | "ai" | "routing";
  content: string;
  timestamp: Date;
}

export interface RoutingPlaybook {
  id: string;
  name: string;
  status: "Safe" | "Monitor" | "Optimized";
  description: string;
  route: string[];
}

export interface GovernanceControl {
  id: string;
  name: string;
  description: string;
  status: "Enabled" | "Queued" | "Compliant";
}

export interface ActiveConversation {
  id: string;
  isLive: boolean;
  messages: ConversationMessage[];
}
