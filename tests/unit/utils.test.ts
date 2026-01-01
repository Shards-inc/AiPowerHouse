/**
 * Unit tests for utility functions
 */

import { describe, expect, it } from "vitest";
import { validateEmail, validateString, validateNumber } from "../../src/utils/validation.js";
import { generateUUID, hash, maskSensitiveData } from "../../src/utils/crypto.js";
import { sleep, retry } from "../../src/utils/async.js";

describe("Validation utilities", () => {
  describe("validateEmail", () => {
    it("should validate correct email", () => {
      expect(validateEmail("test@example.com")).toBe(true);
    });

    it("should reject invalid email", () => {
      expect(validateEmail("invalid-email")).toBe(false);
    });
  });

  describe("validateString", () => {
    it("should validate string within length limits", () => {
      const result = validateString("hello", "test", { minLength: 2, maxLength: 10 });
      expect(result).toBe("hello");
    });

    it("should throw error for string too short", () => {
      expect(() => validateString("a", "test", { minLength: 2 })).toThrow();
    });
  });

  describe("validateNumber", () => {
    it("should validate number within range", () => {
      const result = validateNumber(5, "test", { min: 0, max: 10 });
      expect(result).toBe(5);
    });

    it("should throw error for number out of range", () => {
      expect(() => validateNumber(15, "test", { max: 10 })).toThrow();
    });
  });
});

describe("Crypto utilities", () => {
  describe("generateUUID", () => {
    it("should generate valid UUID", () => {
      const uuid = generateUUID();
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });

    it("should generate unique UUIDs", () => {
      const uuid1 = generateUUID();
      const uuid2 = generateUUID();
      expect(uuid1).not.toBe(uuid2);
    });
  });

  describe("hash", () => {
    it("should generate consistent hash", () => {
      const hash1 = hash("test");
      const hash2 = hash("test");
      expect(hash1).toBe(hash2);
    });

    it("should generate different hashes for different inputs", () => {
      const hash1 = hash("test1");
      const hash2 = hash("test2");
      expect(hash1).not.toBe(hash2);
    });
  });

  describe("maskSensitiveData", () => {
    it("should mask middle characters", () => {
      const masked = maskSensitiveData("1234567890", 2);
      expect(masked).toBe("12******90");
    });

    it("should mask short strings completely", () => {
      const masked = maskSensitiveData("123", 4);
      expect(masked).toBe("***");
    });
  });
});

describe("Async utilities", () => {
  describe("sleep", () => {
    it("should delay execution", async () => {
      const start = Date.now();
      await sleep(100);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(90);
    });
  });

  describe("retry", () => {
    it("should retry failed function", async () => {
      let attempts = 0;
      const fn = async () => {
        attempts++;
        if (attempts < 3) throw new Error("Failed");
        return "success";
      };

      const result = await retry(fn, { maxRetries: 3, initialDelay: 10 });
      expect(result).toBe("success");
      expect(attempts).toBe(3);
    });

    it("should throw after max retries", async () => {
      const fn = async () => {
        throw new Error("Always fails");
      };

      await expect(retry(fn, { maxRetries: 2, initialDelay: 10 })).rejects.toThrow("Always fails");
    });
  });
});
