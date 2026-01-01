/**
 * Governance and Safety Service
 */

import type { AIRequest, AIResponse, SafetyCheck, GovernanceConfig } from "../types/index.js";
import { logger } from "../utils/logger.js";
import { ValidationError } from "../utils/errors.js";

interface PIIPattern {
  name: string;
  pattern: RegExp;
  description: string;
}

export class GovernanceService {
  private config: GovernanceConfig;
  private auditLog: Array<{
    timestamp: Date;
    requestId: string;
    action: string;
    details: Record<string, unknown>;
  }> = [];

  private readonly piiPatterns: PIIPattern[] = [
    {
      name: "email",
      pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
      description: "Email address"
    },
    {
      name: "phone",
      pattern: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
      description: "Phone number"
    },
    {
      name: "ssn",
      pattern: /\b\d{3}-\d{2}-\d{4}\b/g,
      description: "Social Security Number"
    },
    {
      name: "creditCard",
      pattern: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
      description: "Credit card number"
    },
    {
      name: "ipAddress",
      pattern: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
      description: "IP address"
    }
  ];

  constructor(config: GovernanceConfig) {
    this.config = config;
  }

  /**
   * Validate and sanitize a request before sending to AI provider
   */
  async validateRequest(request: AIRequest): Promise<{
    valid: boolean;
    sanitizedRequest?: AIRequest;
    issues: string[];
  }> {
    const issues: string[] = [];
    let sanitizedPrompt = request.prompt;

    // PII Detection
    if (this.config.promptFirewall) {
      const piiDetected = this.detectPII(request.prompt);
      if (piiDetected.length > 0) {
        issues.push(`PII detected: ${piiDetected.map((p) => p.name).join(", ")}`);
        sanitizedPrompt = this.redactPII(request.prompt);

        this.logAuditEvent(request.id, "pii_detected", {
          types: piiDetected.map((p) => p.name)
        });
      }
    }

    // Content filtering
    const contentIssues = this.checkContentSafety(sanitizedPrompt);
    if (contentIssues.length > 0) {
      issues.push(...contentIssues);
    }

    // Compliance checks
    if (this.config.complianceMode === "strict" && issues.length > 0) {
      this.logAuditEvent(request.id, "request_blocked", { issues });
      return { valid: false, issues };
    }

    const sanitizedRequest: AIRequest = {
      ...request,
      prompt: sanitizedPrompt
    };

    this.logAuditEvent(request.id, "request_validated", {
      issuesFound: issues.length,
      sanitized: sanitizedPrompt !== request.prompt
    });

    return {
      valid: true,
      sanitizedRequest,
      issues
    };
  }

  /**
   * Validate a response before returning to user
   */
  async validateResponse(response: AIResponse): Promise<{
    valid: boolean;
    sanitizedResponse?: AIResponse;
    issues: string[];
  }> {
    const issues: string[] = [];
    let sanitizedContent = response.content;

    // Check for PII in response
    const piiDetected = this.detectPII(response.content);
    if (piiDetected.length > 0) {
      issues.push(`PII in response: ${piiDetected.map((p) => p.name).join(", ")}`);
      sanitizedContent = this.redactPII(response.content);

      this.logAuditEvent(response.requestId, "pii_in_response", {
        types: piiDetected.map((p) => p.name)
      });
    }

    // Content safety check
    const contentIssues = this.checkContentSafety(sanitizedContent);
    if (contentIssues.length > 0) {
      issues.push(...contentIssues);
    }

    // Human review requirement
    if (this.config.humanReviewLoop && issues.length > 0) {
      this.logAuditEvent(response.requestId, "human_review_required", { issues });
    }

    const sanitizedResponse: AIResponse = {
      ...response,
      content: sanitizedContent
    };

    return {
      valid: true,
      sanitizedResponse,
      issues
    };
  }

  /**
   * Detect PII in text
   */
  private detectPII(text: string): PIIPattern[] {
    const detected: PIIPattern[] = [];

    for (const pattern of this.piiPatterns) {
      if (pattern.pattern.test(text)) {
        detected.push(pattern);
      }
    }

    return detected;
  }

  /**
   * Redact PII from text
   */
  private redactPII(text: string): string {
    let redacted = text;

    for (const pattern of this.piiPatterns) {
      redacted = redacted.replace(pattern.pattern, `[REDACTED:${pattern.name.toUpperCase()}]`);
    }

    return redacted;
  }

  /**
   * Check content safety (basic implementation)
   */
  private checkContentSafety(text: string): string[] {
    const issues: string[] = [];
    const lowerText = text.toLowerCase();

    // Basic prohibited content check
    const prohibitedTerms = ["hack", "exploit", "illegal", "dangerous"];
    for (const term of prohibitedTerms) {
      if (lowerText.includes(term)) {
        issues.push(`Potentially unsafe content detected: ${term}`);
      }
    }

    return issues;
  }

  /**
   * Log an audit event
   */
  private logAuditEvent(requestId: string, action: string, details: Record<string, unknown>): void {
    if (!this.config.auditTrail) {
      return;
    }

    const event = {
      timestamp: new Date(),
      requestId,
      action,
      details
    };

    this.auditLog.push(event);
    logger.info(`Governance audit: ${action}`, { requestId, ...details });
  }

  /**
   * Get audit log
   */
  getAuditLog(limit?: number): typeof this.auditLog {
    if (limit) {
      return this.auditLog.slice(-limit);
    }
    return [...this.auditLog];
  }

  /**
   * Export governance report
   */
  exportReport(): {
    config: GovernanceConfig;
    totalEvents: number;
    recentEvents: typeof this.auditLog;
    summary: Record<string, number>;
  } {
    const summary: Record<string, number> = {};

    for (const event of this.auditLog) {
      summary[event.action] = (summary[event.action] || 0) + 1;
    }

    return {
      config: this.config,
      totalEvents: this.auditLog.length,
      recentEvents: this.auditLog.slice(-100),
      summary
    };
  }

  /**
   * Update governance configuration
   */
  updateConfig(updates: Partial<GovernanceConfig>): void {
    this.config = { ...this.config, ...updates };
    logger.info("Governance configuration updated", updates);
  }

  /**
   * Clear audit log
   */
  clearAuditLog(): void {
    this.auditLog = [];
    logger.info("Audit log cleared");
  }
}
