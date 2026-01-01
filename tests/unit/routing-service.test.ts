/**
 * Unit tests for routing service
 */

import { describe, expect, it, beforeEach } from "vitest";
import type { AIRequest, ProviderConfig, AIProviderType } from "../../src/types/index.js";
import { RoutingStrategy } from "../../src/types/index.js";
import { RoutingService } from "../../src/services/routing-service.js";

describe("RoutingService", () => {
  let routingService: RoutingService;
  let mockRequest: AIRequest;
  let mockProviderConfigs: Map<AIProviderType, ProviderConfig>;

  beforeEach(() => {
    routingService = new RoutingService();
    
    mockRequest = {
      id: "test-request-1",
      prompt: "Test prompt",
      createdAt: new Date()
    };

    mockProviderConfigs = new Map([
      [
        "chatgpt",
        {
          apiKey: "test-key",
          endpoint: "https://api.openai.com/v1",
          model: "gpt-4"
        }
      ]
    ]);
  });

  describe("registerPlaybook", () => {
    it("should register a routing playbook", () => {
      const playbook = {
        id: "test-playbook",
        name: "Test Playbook",
        description: "Test",
        strategy: RoutingStrategy.Primary,
        providers: ["chatgpt"],
        conditions: [],
        enabled: true
      };

      routingService.registerPlaybook(playbook);
      expect(routingService.getPlaybook("test-playbook")).toEqual(playbook);
    });
  });

  describe("getPlaybooks", () => {
    it("should return all registered playbooks", () => {
      const playbook1 = {
        id: "playbook-1",
        name: "Playbook 1",
        description: "Test",
        strategy: RoutingStrategy.Primary,
        providers: ["chatgpt"],
        conditions: [],
        enabled: true
      };

      const playbook2 = {
        id: "playbook-2",
        name: "Playbook 2",
        description: "Test",
        strategy: RoutingStrategy.Fallback,
        providers: ["claude"],
        conditions: [],
        enabled: true
      };

      routingService.registerPlaybook(playbook1);
      routingService.registerPlaybook(playbook2);

      const playbooks = routingService.getPlaybooks();
      expect(playbooks).toHaveLength(2);
    });
  });

  describe("removePlaybook", () => {
    it("should remove a playbook", () => {
      const playbook = {
        id: "test-playbook",
        name: "Test Playbook",
        description: "Test",
        strategy: RoutingStrategy.Primary,
        providers: ["chatgpt"],
        conditions: [],
        enabled: true
      };

      routingService.registerPlaybook(playbook);
      expect(routingService.getPlaybook("test-playbook")).toBeDefined();

      const removed = routingService.removePlaybook("test-playbook");
      expect(removed).toBe(true);
      expect(routingService.getPlaybook("test-playbook")).toBeUndefined();
    });
  });
});
