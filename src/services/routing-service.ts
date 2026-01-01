/**
 * AI Routing Service
 */

import type {
  AIRequest,
  AIResponse,
  RoutingStrategy,
  RoutingPlaybook,
  AIProviderType,
  ProviderConfig
} from "../types/index.js";
import { ProviderFactory } from "../api/provider-factory.js";
import { logger } from "../utils/logger.js";
import { ValidationError, ProviderError } from "../utils/errors.js";
import { retry } from "../utils/async.js";

export class RoutingService {
  private playbooks: Map<string, RoutingPlaybook> = new Map();

  /**
   * Register a routing playbook
   */
  registerPlaybook(playbook: RoutingPlaybook): void {
    this.playbooks.set(playbook.id, playbook);
    logger.info(`Registered routing playbook: ${playbook.name}`);
  }

  /**
   * Route a request based on strategy
   */
  async routeRequest(
    request: AIRequest,
    providerConfigs: Map<AIProviderType, ProviderConfig>
  ): Promise<AIResponse> {
    const strategy = request.routing || RoutingStrategy.Primary;

    logger.info(`Routing request ${request.id} with strategy: ${strategy}`);

    switch (strategy) {
      case RoutingStrategy.Primary:
        return this.primaryRouting(request, providerConfigs);
      case RoutingStrategy.Fallback:
        return this.fallbackRouting(request, providerConfigs);
      case RoutingStrategy.Consensus:
        return this.consensusRouting(request, providerConfigs);
      case RoutingStrategy.LoadBalance:
        return this.loadBalanceRouting(request, providerConfigs);
      case RoutingStrategy.LatencyOptimized:
        return this.latencyOptimizedRouting(request, providerConfigs);
      case RoutingStrategy.CostOptimized:
        return this.costOptimizedRouting(request, providerConfigs);
      default:
        throw new ValidationError(`Unknown routing strategy: ${strategy}`);
    }
  }

  /**
   * Primary routing - use the first available provider
   */
  private async primaryRouting(
    request: AIRequest,
    providerConfigs: Map<AIProviderType, ProviderConfig>
  ): Promise<AIResponse> {
    const [firstType, firstConfig] = Array.from(providerConfigs.entries())[0];
    if (!firstConfig) {
      throw new ValidationError("No provider configuration available");
    }

    const provider = ProviderFactory.getProvider(firstType, firstConfig);
    return provider.sendRequest(request);
  }

  /**
   * Fallback routing - try providers in order until one succeeds
   */
  private async fallbackRouting(
    request: AIRequest,
    providerConfigs: Map<AIProviderType, ProviderConfig>
  ): Promise<AIResponse> {
    const errors: Error[] = [];

    for (const [providerType, config] of providerConfigs) {
      try {
        logger.debug(`Trying provider: ${providerType}`);
        const provider = ProviderFactory.getProvider(providerType, config);
        return await provider.sendRequest(request);
      } catch (error) {
        logger.warn(`Provider ${providerType} failed`, {
          error: error instanceof Error ? error.message : String(error)
        });
        errors.push(error as Error);
      }
    }

    throw new ProviderError(
      "All providers",
      "All providers failed",
      { errors: errors.map((e) => e.message) }
    );
  }

  /**
   * Consensus routing - get responses from multiple providers and choose best
   */
  private async consensusRouting(
    request: AIRequest,
    providerConfigs: Map<AIProviderType, ProviderConfig>
  ): Promise<AIResponse> {
    const responses: AIResponse[] = [];
    const errors: Error[] = [];

    // Send requests to all providers in parallel
    const promises = Array.from(providerConfigs.entries()).map(async ([providerType, config]) => {
      try {
        const provider = ProviderFactory.getProvider(providerType, config);
        const response = await provider.sendRequest(request);
        responses.push(response);
      } catch (error) {
        logger.warn(`Provider ${providerType} failed in consensus routing`, {
          error: error instanceof Error ? error.message : String(error)
        });
        errors.push(error as Error);
      }
    });

    await Promise.allSettled(promises);

    if (responses.length === 0) {
      throw new ProviderError(
        "Consensus",
        "All providers failed in consensus routing",
        { errors: errors.map((e) => e.message) }
      );
    }

    // Choose the response with the highest confidence or shortest response
    // In a real implementation, you might use more sophisticated logic
    responses.sort((a, b) => {
      if (a.confidence && b.confidence) {
        return b.confidence - a.confidence;
      }
      return a.latency - b.latency;
    });

    return responses[0];
  }

  /**
   * Load balance routing - distribute requests across providers
   */
  private async loadBalanceRouting(
    request: AIRequest,
    providerConfigs: Map<AIProviderType, ProviderConfig>
  ): Promise<AIResponse> {
    // Simple round-robin for now
    const providers = Array.from(providerConfigs.entries());
    const index = Math.floor(Math.random() * providers.length);
    const [providerType, config] = providers[index];

    const provider = ProviderFactory.getProvider(providerType, config);
    return retry(() => provider.sendRequest(request), { maxRetries: 2 });
  }

  /**
   * Latency optimized routing - use the fastest provider
   */
  private async latencyOptimizedRouting(
    request: AIRequest,
    providerConfigs: Map<AIProviderType, ProviderConfig>
  ): Promise<AIResponse> {
    const providers = Array.from(providerConfigs.entries()).map(([type, config]) => ({
      type,
      provider: ProviderFactory.getProvider(type, config)
    }));

    // Sort by latency metrics
    providers.sort((a, b) => a.provider.getMetrics().latency - b.provider.getMetrics().latency);

    const { provider } = providers[0];
    return provider.sendRequest(request);
  }

  /**
   * Cost optimized routing - use the cheapest provider
   */
  private async costOptimizedRouting(
    request: AIRequest,
    providerConfigs: Map<AIProviderType, ProviderConfig>
  ): Promise<AIResponse> {
    // In a real implementation, you would consider token costs per provider
    // For now, use the provider with lowest token usage
    const providers = Array.from(providerConfigs.entries()).map(([type, config]) => ({
      type,
      provider: ProviderFactory.getProvider(type, config)
    }));

    providers.sort((a, b) => a.provider.getMetrics().tokenUsage - b.provider.getMetrics().tokenUsage);

    const { provider } = providers[0];
    return provider.sendRequest(request);
  }

  /**
   * Get all registered playbooks
   */
  getPlaybooks(): RoutingPlaybook[] {
    return Array.from(this.playbooks.values());
  }

  /**
   * Get a specific playbook
   */
  getPlaybook(id: string): RoutingPlaybook | undefined {
    return this.playbooks.get(id);
  }

  /**
   * Remove a playbook
   */
  removePlaybook(id: string): boolean {
    return this.playbooks.delete(id);
  }
}
