/**
 * Validation utilities
 */

import { ValidationError } from "./errors.js";

export function validateRequired<T>(value: T | undefined | null, fieldName: string): T {
  if (value === undefined || value === null || value === "") {
    throw new ValidationError(`${fieldName} is required`);
  }
  return value;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateString(
  value: unknown,
  fieldName: string,
  options?: { minLength?: number; maxLength?: number; pattern?: RegExp }
): string {
  if (typeof value !== "string") {
    throw new ValidationError(`${fieldName} must be a string`);
  }

  if (options?.minLength && value.length < options.minLength) {
    throw new ValidationError(
      `${fieldName} must be at least ${options.minLength} characters long`
    );
  }

  if (options?.maxLength && value.length > options.maxLength) {
    throw new ValidationError(
      `${fieldName} must be at most ${options.maxLength} characters long`
    );
  }

  if (options?.pattern && !options.pattern.test(value)) {
    throw new ValidationError(`${fieldName} format is invalid`);
  }

  return value;
}

export function validateNumber(
  value: unknown,
  fieldName: string,
  options?: { min?: number; max?: number; integer?: boolean }
): number {
  const num = typeof value === "string" ? parseFloat(value) : value;

  if (typeof num !== "number" || isNaN(num)) {
    throw new ValidationError(`${fieldName} must be a number`);
  }

  if (options?.integer && !Number.isInteger(num)) {
    throw new ValidationError(`${fieldName} must be an integer`);
  }

  if (options?.min !== undefined && num < options.min) {
    throw new ValidationError(`${fieldName} must be at least ${options.min}`);
  }

  if (options?.max !== undefined && num > options.max) {
    throw new ValidationError(`${fieldName} must be at most ${options.max}`);
  }

  return num;
}

export function validateEnum<T>(
  value: unknown,
  fieldName: string,
  allowedValues: T[]
): T {
  if (!allowedValues.includes(value as T)) {
    throw new ValidationError(
      `${fieldName} must be one of: ${allowedValues.join(", ")}`
    );
  }
  return value as T;
}

export function validateArray<T>(
  value: unknown,
  fieldName: string,
  options?: { minLength?: number; maxLength?: number }
): T[] {
  if (!Array.isArray(value)) {
    throw new ValidationError(`${fieldName} must be an array`);
  }

  if (options?.minLength && value.length < options.minLength) {
    throw new ValidationError(
      `${fieldName} must contain at least ${options.minLength} items`
    );
  }

  if (options?.maxLength && value.length > options.maxLength) {
    throw new ValidationError(
      `${fieldName} must contain at most ${options.maxLength} items`
    );
  }

  return value as T[];
}

export function validateObject(value: unknown, fieldName: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new ValidationError(`${fieldName} must be an object`);
  }
  return value as Record<string, unknown>;
}

export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .trim();
}

export function validateApiKey(apiKey: string): boolean {
  // Basic validation - adjust based on your requirements
  return apiKey.length >= 32 && /^[a-zA-Z0-9_-]+$/.test(apiKey);
}
