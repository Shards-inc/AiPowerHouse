/**
 * Google (Gemini) provider implementation
 */

import type { AIRequest, AIResponse, ProviderConfig } from "../types/index.js";
import { BaseAIProvider } from "./base-provider.js";
import { generateUUID } from "../utils/crypto.js";

interface GeminiContent {
  parts: Array<{ text: string }>;
  role?: string;
}

interface GeminiRequest {
  contents: GeminiContent[];
  generationConfig?: {
    maxOutputTokens?: number;
    temperature?: number;
  };
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}

export class GoogleProvider extends BaseAIProvider {
  constructor(config: ProviderConfig) {
    super(config);
    this.validateConfig();
  }

  get name(): string {
    return "Gemini";
  }

  get type(): string {
    return "gemini";
  }

  async sendRequest(request: AIRequest): Promise<AIResponse> {
    return this.executeWithMetrics(async () => {
      const contents: GeminiContent[] = [];

      if (request.context) {
        contents.push({
          parts: [{ text: request.context }],
          role: "user"
        });
      }

      contents.push({
        parts: [{ text: request.prompt }],
        role: "user"
      });

      const geminiRequest: GeminiRequest = {
        contents,
        generationConfig: {
          maxOutputTokens: this.config.maxTokens,
          temperature: this.config.temperature || 0.7
        }
      };

      const model = this.config.model || "gemini-pro";
      const url = `${this.config.endpoint}/models/${model}:generateContent?key=${this.config.apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(geminiRequest)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Google API request failed");
      }

      const data = (await response.json()) as GeminiResponse;
      const content = data.candidates[0]?.content?.parts[0]?.text || "";
      const tokensUsed = data.usageMetadata?.totalTokenCount || 0;

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
