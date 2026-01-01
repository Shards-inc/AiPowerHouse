/**
 * Anthropic (Claude) provider implementation
 */

import type { AIRequest, AIResponse, ProviderConfig } from "../types/index.js";
import { BaseAIProvider } from "./base-provider.js";
import { generateUUID } from "../utils/crypto.js";

interface AnthropicMessage {
  role: "user" | "assistant";
  content: string;
}

interface AnthropicRequest {
  model: string;
  messages: AnthropicMessage[];
  max_tokens: number;
  temperature?: number;
  system?: string;
}

interface AnthropicResponse {
  id: string;
  content: Array<{
    type: string;
    text: string;
  }>;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

export class AnthropicProvider extends BaseAIProvider {
  constructor(config: ProviderConfig) {
    super(config);
    this.validateConfig();
  }

  get name(): string {
    return "Claude";
  }

  get type(): string {
    return "claude";
  }

  async sendRequest(request: AIRequest): Promise<AIResponse> {
    return this.executeWithMetrics(async () => {
      const messages: AnthropicMessage[] = [
        {
          role: "user",
          content: request.prompt
        }
      ];

      const anthropicRequest: AnthropicRequest = {
        model: this.config.model || "claude-3-opus-20240229",
        messages,
        max_tokens: this.config.maxTokens || 4096,
        temperature: this.config.temperature || 0.7,
        system: request.context
      };

      const response = await fetch(`${this.config.endpoint}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.config.apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify(anthropicRequest)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Anthropic API request failed");
      }

      const data = (await response.json()) as AnthropicResponse;
      const content = data.content[0]?.text || "";
      const tokensUsed = data.usage.input_tokens + data.usage.output_tokens;

      this.metrics.tokenUsage += tokensUsed;

      return {
        id: generateUUID(),
        requestId: request.id,
        providerId: this.type,
        content,
        tokensUsed,
        latency: this.metrics.latency,
        createdAt: new Date()
      };
    });
  }
}
