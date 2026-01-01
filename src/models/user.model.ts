/**
 * User model
 */

import type { User, UserRole } from "../types/index.js";

export interface UserEntity {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  role: UserRole;
  api_key?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserInput {
  email: string;
  name: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: UserRole;
}

export class UserModel {
  /**
   * Convert database entity to domain model
   */
  static toDomain(entity: UserEntity): User {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      role: entity.role,
      apiKey: entity.api_key,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at
    };
  }

  /**
   * Convert domain model to database entity
   */
  static toEntity(user: User): Partial<UserEntity> {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      api_key: user.apiKey,
      created_at: user.createdAt,
      updated_at: user.updatedAt
    };
  }
}
