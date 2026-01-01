/**
 * OpenAI (ChatGPT) provider implementation
 */

import type { AIRequest, AIResponse, ProviderConfig } from "../types/index.js";
import { BaseAIProvider } from "./base-provider.js";
import { generateUUID } from "../utils/crypto.js";

interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenAIRequest {
  model: string;
  messages: OpenAIMessage[];
  max_tokens?: number;
  temperature?: number;
}

interface OpenAIResponse {
  id: string;
  choices: Array<{
    message: {
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class OpenAIProvider extends BaseAIProvider {
  constructor(config: ProviderConfig) {
    super(config);
    this.validateConfig();
  }

  get name(): string {
    return "ChatGPT";
  }

  get type(): string {
    return "chatgpt";
  }

  async sendRequest(request: AIRequest): Promise<AIResponse> {
    return this.executeWithMetrics(async () => {
      const messages: OpenAIMessage[] = [];

      if (request.context) {
        messages.push({
          role: "system",
          content: request.context
        });
      }

      messages.push({
        role: "user",
        content: request.prompt
      });

      const openaiRequest: OpenAIRequest = {
        model: this.config.model || "gpt-4",
        messages,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature || 0.7
      };

      const response = await fetch(`${this.config.endpoint}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify(openaiRequest)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "OpenAI API request failed");
      }

      const data = (await response.json()) as OpenAIResponse;
      const content = data.choices[0]?.message?.content || "";
      const tokensUsed = data.usage.total_tokens;

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
