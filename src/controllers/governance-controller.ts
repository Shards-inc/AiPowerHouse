/**
 * Governance Controller
 */

import type { Request, Response } from "express";
import { GovernanceService } from "../services/governance-service.js";
import { config } from "../config/index.js";

const governanceService = new GovernanceService(config.governance);

export class GovernanceController {
  /**
   * Get governance configuration
   */
  static async getConfig(req: Request, res: Response) {
    res.json({ config: config.governance });
  }

  /**
   * Update governance configuration
   */
  static async updateConfig(req: Request, res: Response) {
    const updates = req.body;
    governanceService.updateConfig(updates);
    res.json({ config: config.governance, updated: true });
  }

  /**
   * Get audit log
   */
  static async getAuditLog(req: Request, res: Response) {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
    const auditLog = governanceService.getAuditLog(limit);
    res.json({ auditLog, count: auditLog.length });
  }

  /**
   * Export governance report
   */
  static async exportReport(req: Request, res: Response) {
    const report = governanceService.exportReport();
    res.json({ report });
  }

  /**
   * Clear audit log
   */
  static async clearAuditLog(req: Request, res: Response) {
    governanceService.clearAuditLog();
    res.json({ cleared: true });
  }
}
