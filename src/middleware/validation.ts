/**
 * Request validation middleware
 */

import type { Request, Response, NextFunction } from "express";
import { ValidationError } from "../utils/errors.js";

export function validateBody(schema: Record<string, (value: unknown) => void>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const [field, validator] of Object.entries(schema)) {
        const value = req.body[field];
        validator(value);
      }
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        next(error);
      } else {
        next(new ValidationError((error as Error).message));
      }
    }
  };
}

export function validateQuery(schema: Record<string, (value: unknown) => void>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const [field, validator] of Object.entries(schema)) {
        const value = req.query[field];
        validator(value);
      }
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        next(error);
      } else {
        next(new ValidationError((error as Error).message));
      }
    }
  };
}
