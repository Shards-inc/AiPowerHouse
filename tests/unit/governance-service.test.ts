/**
 * Unit tests for governance service
 */

import { describe, expect, it, beforeEach } from "vitest";
import type { AIRequest, GovernanceConfig } from "../../src/types/index.js";
import { GovernanceService } from "../../src/services/governance-service.js";

describe("GovernanceService", () => {
  let governanceService: GovernanceService;
  let config: GovernanceConfig;

  beforeEach(() => {
    config = {
      promptFirewall: true,
      humanReviewLoop: false,
      dataResidency: "us-central1",
      auditTrail: true,
      complianceMode: "moderate"
    };
    governanceService = new GovernanceService(config);
  });

  describe("validateRequest", () => {
    it("should detect PII in request", async () => {
      const request: AIRequest = {
        id: "test-1",
        prompt: "My email is john.doe@example.com and phone is 555-123-4567",
        createdAt: new Date()
      };

      const result = await governanceService.validateRequest(request);
      
      expect(result.valid).toBe(true);
      expect(result.issues).toHaveLength(2);
      expect(result.issues[0]).toContain("PII detected");
      expect(result.sanitizedRequest?.prompt).toContain("[REDACTED:EMAIL]");
      expect(result.sanitizedRequest?.prompt).toContain("[REDACTED:PHONE]");
    });

    it("should pass clean request", async () => {
      const request: AIRequest = {
        id: "test-2",
        prompt: "What is the weather like today?",
        createdAt: new Date()
      };

      const result = await governanceService.validateRequest(request);
      
      expect(result.valid).toBe(true);
      expect(result.issues).toHaveLength(0);
      expect(result.sanitizedRequest?.prompt).toBe(request.prompt);
    });

    it("should block request in strict mode with issues", async () => {
      const strictConfig: GovernanceConfig = {
        ...config,
        complianceMode: "strict"
      };
      const strictService = new GovernanceService(strictConfig);

      const request: AIRequest = {
        id: "test-3",
        prompt: "Email me at test@example.com",
        createdAt: new Date()
      };

      const result = await strictService.validateRequest(request);
      
      expect(result.valid).toBe(false);
      expect(result.issues.length).toBeGreaterThan(0);
    });
  });

  describe("getAuditLog", () => {
    it("should return audit log entries", async () => {
      const request: AIRequest = {
        id: "test-4",
        prompt: "Test prompt",
        createdAt: new Date()
      };

      await governanceService.validateRequest(request);
      
      const log = governanceService.getAuditLog();
      expect(log.length).toBeGreaterThan(0);
    });

    it("should limit audit log entries", async () => {
      // Create multiple requests
      for (let i = 0; i < 10; i++) {
        await governanceService.validateRequest({
          id: `test-${i}`,
          prompt: "Test",
          createdAt: new Date()
        });
      }

      const log = governanceService.getAuditLog(5);
      expect(log).toHaveLength(5);
    });
  });

  describe("exportReport", () => {
    it("should export governance report", async () => {
      const request: AIRequest = {
        id: "test-5",
        prompt: "Test with email@example.com",
        createdAt: new Date()
      };

      await governanceService.validateRequest(request);
      
      const report = governanceService.exportReport();
      
      expect(report).toHaveProperty("config");
      expect(report).toHaveProperty("totalEvents");
      expect(report).toHaveProperty("recentEvents");
      expect(report).toHaveProperty("summary");
      expect(report.totalEvents).toBeGreaterThan(0);
    });
  });

  describe("clearAuditLog", () => {
    it("should clear audit log", async () => {
      const request: AIRequest = {
        id: "test-6",
        prompt: "Test",
        createdAt: new Date()
      };

      await governanceService.validateRequest(request);
      expect(governanceService.getAuditLog().length).toBeGreaterThan(0);

      governanceService.clearAuditLog();
      expect(governanceService.getAuditLog()).toHaveLength(0);
    });
  });
});
