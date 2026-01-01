/**
 * Application configuration
 */

import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export const config = {
  app: {
    name: process.env.APP_NAME || "AiPowerHouse UI",
    version: process.env.APP_VERSION || "0.1.0",
    env: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT || "3000", 10),
    host: process.env.HOST || "0.0.0.0"
  },

  api: {
    prefix: process.env.API_PREFIX || "/api/v1",
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10), // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_MAX || "100", 10)
    },
    cors: {
      origin: process.env.CORS_ORIGIN || "*",
      credentials: process.env.CORS_CREDENTIALS === "true"
    }
  },

  database: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    name: process.env.DB_NAME || "aipowerhouse",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    pool: {
      min: parseInt(process.env.DB_POOL_MIN || "2", 10),
      max: parseInt(process.env.DB_POOL_MAX || "10", 10)
    }
  },

  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
    password: process.env.REDIS_PASSWORD || "",
    db: parseInt(process.env.REDIS_DB || "0", 10)
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET || "your-secret-key-change-in-production",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "24h",
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || "10", 10)
  },

  providers: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY || "",
      endpoint: process.env.OPENAI_ENDPOINT || "https://api.openai.com/v1",
      model: process.env.OPENAI_MODEL || "gpt-4",
      maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || "2048", 10)
    },
    anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY || "",
      endpoint: process.env.ANTHROPIC_ENDPOINT || "https://api.anthropic.com/v1",
      model: process.env.ANTHROPIC_MODEL || "claude-3-opus-20240229",
      maxTokens: parseInt(process.env.ANTHROPIC_MAX_TOKENS || "4096", 10)
    },
    google: {
      apiKey: process.env.GOOGLE_API_KEY || "",
      endpoint: process.env.GOOGLE_ENDPOINT || "https://generativelanguage.googleapis.com/v1",
      model: process.env.GOOGLE_MODEL || "gemini-pro",
      maxTokens: parseInt(process.env.GOOGLE_MAX_TOKENS || "2048", 10)
    },
    xai: {
      apiKey: process.env.XAI_API_KEY || "",
      endpoint: process.env.XAI_ENDPOINT || "https://api.x.ai/v1",
      model: process.env.XAI_MODEL || "grok-1"
    }
  },

  logging: {
    level: process.env.LOG_LEVEL || "info",
    format: process.env.LOG_FORMAT || "json",
    outputs: process.env.LOG_OUTPUTS?.split(",") || ["console"]
  },

  monitoring: {
    enabled: process.env.MONITORING_ENABLED === "true",
    metricsPort: parseInt(process.env.METRICS_PORT || "9090", 10),
    healthCheckPath: process.env.HEALTH_CHECK_PATH || "/health"
  },

  governance: {
    promptFirewall: process.env.GOVERNANCE_PROMPT_FIREWALL === "true",
    humanReviewLoop: process.env.GOVERNANCE_HUMAN_REVIEW === "true",
    dataResidency: process.env.GOVERNANCE_DATA_RESIDENCY || "us-central1",
    auditTrail: process.env.GOVERNANCE_AUDIT_TRAIL !== "false",
    complianceMode: (process.env.GOVERNANCE_COMPLIANCE_MODE as
      | "strict"
      | "moderate"
      | "permissive") || "moderate"
  }
} as const;

export default config;
