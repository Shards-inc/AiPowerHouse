/**
 * Session Routes
 */

import { Router } from "express";
import { SessionController } from "../controllers/session-controller.js";
import { authenticate } from "../middleware/auth.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = Router();

/**
 * POST /api/v1/sessions
 * Create a new session
 */
router.post("/", authenticate, asyncHandler(SessionController.createSession));

/**
 * GET /api/v1/sessions
 * Get user sessions
 */
router.get("/", authenticate, asyncHandler(SessionController.getUserSessions));

/**
 * GET /api/v1/sessions/:sessionId
 * Get a specific session
 */
router.get("/:sessionId", authenticate, asyncHandler(SessionController.getSession));

/**
 * POST /api/v1/sessions/:sessionId/end
 * End a session
 */
router.post("/:sessionId/end", authenticate, asyncHandler(SessionController.endSession));

/**
 * DELETE /api/v1/sessions/:sessionId
 * Delete a session
 */
router.delete("/:sessionId", authenticate, asyncHandler(SessionController.deleteSession));

/**
 * GET /api/v1/sessions/stats
 * Get session statistics
 */
router.get("/stats", authenticate, asyncHandler(SessionController.getStatistics));

export default router;
