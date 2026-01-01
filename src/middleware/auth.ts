/**
 * Authentication middleware
 */

import type { Request, Response, NextFunction } from "express";
import { AuthenticationError, AuthorizationError } from "../utils/errors.js";
import type { UserRole } from "../types/index.js";

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: UserRole;
      };
    }
  }
}

/**
 * Authenticate API key
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["x-api-key"] as string;

  if (!apiKey) {
    throw new AuthenticationError("API key is required");
  }

  // In a real implementation, validate the API key against database
  // For now, we'll use a simple validation
  if (apiKey.length < 32) {
    throw new AuthenticationError("Invalid API key");
  }

  // Mock user - in real implementation, fetch from database
  req.user = {
    id: "user-123",
    email: "user@example.com",
    role: "developer"
  };

  next();
}

/**
 * Authorize based on role
 */
export function authorize(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AuthenticationError();
    }

    if (!roles.includes(req.user.role)) {
      throw new AuthorizationError(`Required role: ${roles.join(" or ")}`);
    }

    next();
  };
}

/**
 * Optional authentication - doesn't fail if no credentials provided
 */
export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["x-api-key"] as string;

  if (apiKey && apiKey.length >= 32) {
    req.user = {
      id: "user-123",
      email: "user@example.com",
      role: "developer"
    };
  }

  next();
}
