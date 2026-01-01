/**
 * Governance Routes
 */

import { Router } from "express";
import { GovernanceController } from "../controllers/governance-controller.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = Router();

/**
 * GET /api/v1/governance/config
 * Get governance configuration
 */
router.get("/config", authenticate, asyncHandler(GovernanceController.getConfig));

/**
 * PUT /api/v1/governance/config
 * Update governance configuration
 */
router.put(
  "/config",
  authenticate,
  authorize("admin"),
  asyncHandler(GovernanceController.updateConfig)
);

/**
 * GET /api/v1/governance/audit-log
 * Get audit log
 */
router.get(
  "/audit-log",
  authenticate,
  authorize("admin"),
  asyncHandler(GovernanceController.getAuditLog)
);

/**
 * GET /api/v1/governance/report
 * Export governance report
 */
router.get(
  "/report",
  authenticate,
  authorize("admin"),
  asyncHandler(GovernanceController.exportReport)
);

/**
 * DELETE /api/v1/governance/audit-log
 * Clear audit log
 */
router.delete(
  "/audit-log",
  authenticate,
  authorize("admin"),
  asyncHandler(GovernanceController.clearAuditLog)
);

export default router;
