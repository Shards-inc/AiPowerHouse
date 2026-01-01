/**
 * Base AI provider interface
 */

import type { AIRequest, AIResponse, ProviderConfig, ProviderMetrics } from "../types/index.js";
import { logger } from "../utils/logger.js";
import { ProviderError, TimeoutError } from "../utils/errors.js";
import { withTimeout } from "../utils/async.js";

export abstract class BaseAIProvider {
  protected config: ProviderConfig;
  protected metrics: ProviderMetrics;

  constructor(config: ProviderConfig) {
    this.config = config;
    this.metrics = {
      reliability: 100,
      latency: 0,
      tokenUsage: 0,
      requestCount: 0,
      errorRate: 0,
      lastUpdated: new Date()
    };
  }

  abstract get name(): string;
  abstract get type(): string;

  /**
   * Send a request to the AI provider
   */
  abstract sendRequest(request: AIRequest): Promise<AIResponse>;

  /**
   * Validate provider configuration
   */
  protected validateConfig(): void {
    if (!this.config.apiKey) {
      throw new ProviderError(this.name, "API key is required");
    }
    if (!this.config.endpoint) {
      throw new ProviderError(this.name, "Endpoint is required");
    }
  }

  /**
   * Execute request with timeout and error handling
   */
  protected async executeWithMetrics<T>(
    fn: () => Promise<T>,
    timeout: number = this.config.timeout || 30000
  ): Promise<T> {
    const startTime = Date.now();
    this.metrics.requestCount++;

    try {
      const result = await withTimeout(fn(), timeout);
      const latency = Date.now() - startTime;

      // Update metrics
      this.metrics.latency = (this.metrics.latency + latency) / 2; // Moving average
      this.metrics.lastUpdated = new Date();

      logger.debug(`${this.name} request completed`, { latency });

      return result;
    } catch (error) {
      const errorRate =
        (this.metrics.errorRate * this.metrics.requestCount + 1) / this.metrics.requestCount;
      this.metrics.errorRate = errorRate;
      this.metrics.reliability = Math.max(0, 100 - errorRate * 100);
      this.metrics.lastUpdated = new Date();

      logger.error(`${this.name} request failed`, error as Error);

      if (error instanceof Error && error.message.includes("timed out")) {
        throw new TimeoutError(`${this.name} request timed out`);
      }

      throw new ProviderError(
        this.name,
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }

  /**
   * Get current provider metrics
   */
  getMetrics(): ProviderMetrics {
    return { ...this.metrics };
  }

  /**
   * Reset metrics
   */
  resetMetrics(): void {
    this.metrics = {
      reliability: 100,
      latency: 0,
      tokenUsage: 0,
      requestCount: 0,
      errorRate: 0,
      lastUpdated: new Date()
    };
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.executeWithMetrics(async () => {
        // Implement a lightweight health check
        return true;
      }, 5000);
      return true;
    } catch {
      return false;
    }
  }
}
