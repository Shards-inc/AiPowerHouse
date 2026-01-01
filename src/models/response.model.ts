/**
 * Response model
 */

import type { AIResponse } from "../types/index.js";

export interface ResponseEntity {
  id: string;
  request_id: string;
  provider_id: string;
  content: string;
  tokens_used: number;
  latency: number;
  confidence?: number;
  metadata?: string; // JSON string
  created_at: Date;
}

export class ResponseModel {
  /**
   * Convert database entity to domain model
   */
  static toDomain(entity: ResponseEntity): AIResponse {
    return {
      id: entity.id,
      requestId: entity.request_id,
      providerId: entity.provider_id,
      content: entity.content,
      tokensUsed: entity.tokens_used,
      latency: entity.latency,
      confidence: entity.confidence,
      metadata: entity.metadata ? JSON.parse(entity.metadata) : undefined,
      createdAt: entity.created_at
    };
  }

  /**
   * Convert domain model to database entity
   */
  static toEntity(response: AIResponse): Partial<ResponseEntity> {
    return {
      id: response.id,
      request_id: response.requestId,
      provider_id: response.providerId,
      content: response.content,
      tokens_used: response.tokensUsed,
      latency: response.latency,
      confidence: response.confidence,
      metadata: response.metadata ? JSON.stringify(response.metadata) : undefined,
      created_at: response.createdAt
    };
  }
}
