/**
 * Request model
 */

import type { AIRequest, RoutingStrategy } from "../types/index.js";

export interface RequestEntity {
  id: string;
  prompt: string;
  context?: string;
  provider_id?: string;
  routing_strategy?: RoutingStrategy;
  user_id?: string;
  session_id?: string;
  metadata?: string; // JSON string
  created_at: Date;
}

export class RequestModel {
  /**
   * Convert database entity to domain model
   */
  static toDomain(entity: RequestEntity): AIRequest {
    return {
      id: entity.id,
      prompt: entity.prompt,
      context: entity.context,
      providerId: entity.provider_id,
      routing: entity.routing_strategy,
      metadata: entity.metadata ? JSON.parse(entity.metadata) : undefined,
      createdAt: entity.created_at
    };
  }

  /**
   * Convert domain model to database entity
   */
  static toEntity(request: AIRequest): Partial<RequestEntity> {
    return {
      id: request.id,
      prompt: request.prompt,
      context: request.context,
      provider_id: request.providerId,
      routing_strategy: request.routing,
      metadata: request.metadata ? JSON.stringify(request.metadata) : undefined,
      created_at: request.createdAt
    };
  }
}
