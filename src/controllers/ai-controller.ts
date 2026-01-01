/**
 * AI Controller - handles AI-related requests
 */

import type { Request, Response } from "express";
import type { AIRequest, AIProviderType, ProviderConfig, RoutingStrategy } from "../types/index.js";
import { RoutingService } from "../services/routing-service.js";
import { GovernanceService } from "../services/governance-service.js";
import { SessionService } from "../services/session-service.js";
import { generateUUID } from "../utils/crypto.js";
import { config } from "../config/index.js";
import { logger } from "../utils/logger.js";
import { ValidationError } from "../utils/errors.js";

const routingService = new RoutingService();
const governanceService = new GovernanceService(config.governance);
const sessionService = new SessionService();

export class AIController {
  /**
   * Send a prompt to AI providers
   */
  static async sendPrompt(req: Request, res: Response) {
    const { prompt, context, providerId, routing, sessionId } = req.body;

    // Create AI request
    const aiRequest: AIRequest = {
      id: generateUUID(),
      prompt,
      context,
      providerId,
      routing: routing as RoutingStrategy,
      metadata: {
        userId: req.user?.id,
        ip: req.ip
      },
      createdAt: new Date()
    };

    // Validate request through governance
    const validation = await governanceService.validateRequest(aiRequest);
    if (!validation.valid) {
      throw new ValidationError("Request validation failed", { issues: validation.issues });
    }

    // Get provider configurations
    const providerConfigs = new Map<AIProviderType, ProviderConfig>();

    if (providerId) {
      // Use specific provider
      const providerConfig = AIController.getProviderConfig(providerId as AIProviderType);
      providerConfigs.set(providerId as AIProviderType, providerConfig);
    } else {
      // Use all available providers
      providerConfigs.set("chatgpt", AIController.getProviderConfig("chatgpt"));
      providerConfigs.set("claude", AIController.getProviderConfig("claude"));
      providerConfigs.set("gemini", AIController.getProviderConfig("gemini"));
    }

    // Route the request
    const response = await routingService.routeRequest(
      validation.sanitizedRequest || aiRequest,
      providerConfigs
    );

    // Validate response through governance
    const responseValidation = await governanceService.validateResponse(response);

    // Add to session if provided
    if (sessionId) {
      try {
        sessionService.addRequestToSession(sessionId, aiRequest);
      } catch (error) {
        logger.warn(`Failed to add request to session ${sessionId}`, {
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    res.json({
      request: {
        id: aiRequest.id,
        timestamp: aiRequest.createdAt
      },
      response: responseValidation.sanitizedResponse || response,
      governance: {
        requestIssues: validation.issues,
        responseIssues: responseValidation.issues
      }
    });
  }

  /**
   * Get available providers
   */
  static async getProviders(req: Request, res: Response) {
    const providers = [
      { id: "chatgpt", name: "ChatGPT", available: !!config.providers.openai.apiKey },
      { id: "claude", name: "Claude", available: !!config.providers.anthropic.apiKey },
      { id: "gemini", name: "Gemini", available: !!config.providers.google.apiKey },
      { id: "grok", name: "Grok", available: !!config.providers.xai.apiKey }
    ];

    res.json({ providers });
  }

  /**
   * Get provider metrics
   */
  static async getMetrics(req: Request, res: Response) {
    // In a real implementation, aggregate metrics from all providers
    res.json({
      metrics: {
        totalRequests: 0,
        averageLatency: 0,
        totalTokens: 0,
        errorRate: 0
      }
    });
  }

  /**
   * Helper: Get provider configuration
   */
  private static getProviderConfig(providerId: AIProviderType): ProviderConfig {
    switch (providerId) {
      case "chatgpt":
        return {
          apiKey: config.providers.openai.apiKey,
          endpoint: config.providers.openai.endpoint,
          model: config.providers.openai.model,
          maxTokens: config.providers.openai.maxTokens
        };
      case "claude":
        return {
          apiKey: config.providers.anthropic.apiKey,
          endpoint: config.providers.anthropic.endpoint,
          model: config.providers.anthropic.model,
          maxTokens: config.providers.anthropic.maxTokens
        };
      case "gemini":
        return {
          apiKey: config.providers.google.apiKey,
          endpoint: config.providers.google.endpoint,
          model: config.providers.google.model,
          maxTokens: config.providers.google.maxTokens
        };
      default:
        throw new ValidationError(`Unknown provider: ${providerId}`);
    }
  }
}
