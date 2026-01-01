/**
 * Core type definitions for AiPowerHouse UI
 */

export interface AIProvider {
  id: string;
  name: string;
  type: AIProviderType;
  status: ProviderStatus;
  config: ProviderConfig;
  metrics: ProviderMetrics;
}

export enum AIProviderType {
  ChatGPT = "chatgpt",
  Claude = "claude",
  Gemini = "gemini",
  Grok = "grok",
  CoPilot = "copilot",
  MetaAI = "metaai",
  ManusAI = "manusai",
  Kimi = "kimi",
  Qwen = "qwen",
  DeepSeek = "deepseek",
  Minimax = "minimax",
  Genspark = "genspark",
  Perplexity = "perplexity",
  Mistral = "mistral"
}

export enum ProviderStatus {
  Active = "active",
  Inactive = "inactive",
  Maintenance = "maintenance",
  Error = "error"
}

export interface ProviderConfig {
  apiKey: string;
  endpoint: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  timeout?: number;
}

export interface ProviderMetrics {
  reliability: number; // 0-100
  latency: number; // milliseconds
  tokenUsage: number;
  requestCount: number;
  errorRate: number;
  lastUpdated: Date;
}

export interface AIRequest {
  id: string;
  prompt: string;
  context?: string;
  providerId?: string;
  routing?: RoutingStrategy;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface AIResponse {
  id: string;
  requestId: string;
  providerId: string;
  content: string;
  tokensUsed: number;
  latency: number;
  confidence?: number;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export enum RoutingStrategy {
  Primary = "primary",
  Fallback = "fallback",
  Consensus = "consensus",
  LoadBalance = "load_balance",
  CostOptimized = "cost_optimized",
  LatencyOptimized = "latency_optimized"
}

export interface RoutingPlaybook {
  id: string;
  name: string;
  description: string;
  strategy: RoutingStrategy;
  providers: string[];
  conditions: RoutingCondition[];
  enabled: boolean;
}

export interface RoutingCondition {
  type: "confidence" | "latency" | "cost" | "custom";
  operator: "gt" | "lt" | "eq" | "gte" | "lte";
  value: number;
}

export interface SafetyCheck {
  enabled: boolean;
  piiDetection: boolean;
  contentFiltering: boolean;
  humanReviewThreshold?: number;
}

export interface GovernanceConfig {
  promptFirewall: boolean;
  humanReviewLoop: boolean;
  dataResidency: string;
  auditTrail: boolean;
  complianceMode: "strict" | "moderate" | "permissive";
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  apiKey?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  Admin = "admin",
  Developer = "developer",
  Viewer = "viewer"
}

export interface Session {
  id: string;
  userId: string;
  requests: AIRequest[];
  startedAt: Date;
  endedAt?: Date;
  status: "active" | "completed" | "terminated";
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  statusCode: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
