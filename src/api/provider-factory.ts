/**
 * AI Provider Factory
 */

import type { AIProviderType, ProviderConfig } from "../types/index.js";
import { BaseAIProvider } from "./base-provider.js";
import { OpenAIProvider } from "./openai-provider.js";
import { AnthropicProvider } from "./anthropic-provider.js";
import { GoogleProvider } from "./google-provider.js";
import { ValidationError } from "../utils/errors.js";

export class ProviderFactory {
  private static providers = new Map<string, BaseAIProvider>();

  /**
   * Create or get a provider instance
   */
  static getProvider(type: AIProviderType, config: ProviderConfig): BaseAIProvider {
    const key = `${type}-${config.endpoint}`;

    if (this.providers.has(key)) {
      return this.providers.get(key)!;
    }

    let provider: BaseAIProvider;

    switch (type) {
      case "chatgpt":
        provider = new OpenAIProvider(config);
        break;
      case "claude":
        provider = new AnthropicProvider(config);
        break;
      case "gemini":
        provider = new GoogleProvider(config);
        break;
      default:
        throw new ValidationError(`Unsupported provider type: ${type}`);
    }

    this.providers.set(key, provider);
    return provider;
  }

  /**
   * Get all registered providers
   */
  static getAllProviders(): BaseAIProvider[] {
    return Array.from(this.providers.values());
  }

  /**
   * Clear all providers (useful for testing)
   */
  static clearProviders(): void {
    this.providers.clear();
  }

  /**
   * Remove a specific provider
   */
  static removeProvider(type: AIProviderType, endpoint: string): boolean {
    const key = `${type}-${endpoint}`;
    return this.providers.delete(key);
  }
}
