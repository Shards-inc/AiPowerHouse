/**
 * AI Routes
 */

import { Router } from "express";
import { AIController } from "../controllers/ai-controller.js";
import { authenticate } from "../middleware/auth.js";
import { validateBody } from "../middleware/validation.js";
import { validateRequired, validateString } from "../utils/validation.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = Router();

/**
 * POST /api/v1/ai/prompt
 * Send a prompt to AI providers
 */
router.post(
  "/prompt",
  authenticate,
  validateBody({
    prompt: (value) => validateRequired(validateString(value, "prompt"), "prompt")
  }),
  asyncHandler(AIController.sendPrompt)
);

/**
 * GET /api/v1/ai/providers
 * Get available AI providers
 */
router.get("/providers", asyncHandler(AIController.getProviders));

/**
 * GET /api/v1/ai/metrics
 * Get AI provider metrics
 */
router.get("/metrics", authenticate, asyncHandler(AIController.getMetrics));

export default router;
