/**
 * Rate limiting middleware
 */

import type { Request, Response, NextFunction } from "express";
import { RateLimitError } from "../utils/errors.js";

interface RateLimitStore {
  requests: number;
  resetTime: number;
}

const store = new Map<string, RateLimitStore>();

export function rateLimit(options: { windowMs: number; max: number }) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();

    let record = store.get(key);

    // Reset if window expired
    if (!record || now > record.resetTime) {
      record = {
        requests: 0,
        resetTime: now + options.windowMs
      };
      store.set(key, record);
    }

    record.requests++;

    // Set rate limit headers
    res.setHeader("X-RateLimit-Limit", options.max.toString());
    res.setHeader("X-RateLimit-Remaining", Math.max(0, options.max - record.requests).toString());
    res.setHeader("X-RateLimit-Reset", new Date(record.resetTime).toISOString());

    if (record.requests > options.max) {
      throw new RateLimitError();
    }

    next();
  };
}

/**
 * Clean up old entries periodically
 */
setInterval(
  () => {
    const now = Date.now();
    for (const [key, record] of store) {
      if (now > record.resetTime) {
        store.delete(key);
      }
    }
  },
  60 * 1000
); // Clean up every minute
