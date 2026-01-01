/**
 * Integration tests for API endpoints
 */

import { describe, expect, it, beforeAll, afterAll } from "vitest";
import type { Express } from "express";
import request from "supertest";
import { createApp } from "../../src/app.js";

describe("API Integration Tests", () => {
  let app: Express;

  beforeAll(() => {
    app = createApp();
  });

  describe("Health Check", () => {
    it("GET /health should return healthy status", async () => {
      const response = await request(app).get("/health");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status", "healthy");
      expect(response.body).toHaveProperty("timestamp");
      expect(response.body).toHaveProperty("version");
    });
  });

  describe("AI Endpoints", () => {
    const apiKey = "test-api-key-with-at-least-32-characters";

    it("GET /api/v1/ai/providers should return available providers", async () => {
      const response = await request(app)
        .get("/api/v1/ai/providers");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("providers");
      expect(Array.isArray(response.body.providers)).toBe(true);
    });

    it("POST /api/v1/ai/prompt should require authentication", async () => {
      const response = await request(app)
        .post("/api/v1/ai/prompt")
        .send({ prompt: "Test prompt" });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error");
    });

    it("POST /api/v1/ai/prompt should require prompt field", async () => {
      const response = await request(app)
        .post("/api/v1/ai/prompt")
        .set("x-api-key", apiKey)
        .send({});

      expect(response.status).toBe(400);
    });
  });

  describe("Session Endpoints", () => {
    const apiKey = "test-api-key-with-at-least-32-characters";

    it("POST /api/v1/sessions should create a session", async () => {
      const response = await request(app)
        .post("/api/v1/sessions")
        .set("x-api-key", apiKey);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("session");
      expect(response.body.session).toHaveProperty("id");
      expect(response.body.session).toHaveProperty("status", "active");
    });

    it("GET /api/v1/sessions should return user sessions", async () => {
      const response = await request(app)
        .get("/api/v1/sessions")
        .set("x-api-key", apiKey);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("sessions");
      expect(Array.isArray(response.body.sessions)).toBe(true);
    });
  });

  describe("Governance Endpoints", () => {
    const apiKey = "test-api-key-with-at-least-32-characters";

    it("GET /api/v1/governance/config should return config", async () => {
      const response = await request(app)
        .get("/api/v1/governance/config")
        .set("x-api-key", apiKey);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("config");
    });
  });

  describe("Error Handling", () => {
    it("should return 404 for unknown routes", async () => {
      const response = await request(app).get("/unknown-route");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toHaveProperty("code", "NOT_FOUND");
    });
  });
});
