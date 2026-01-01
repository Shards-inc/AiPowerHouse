/**
 * Session Controller
 */

import type { Request, Response } from "express";
import { SessionService } from "../services/session-service.js";
import { ValidationError } from "../utils/errors.js";

const sessionService = new SessionService();

export class SessionController {
  /**
   * Create a new session
   */
  static async createSession(req: Request, res: Response) {
    if (!req.user) {
      throw new ValidationError("User authentication required");
    }

    const session = sessionService.createSession(req.user.id);

    res.status(201).json({
      session: {
        id: session.id,
        userId: session.userId,
        startedAt: session.startedAt,
        status: session.status
      }
    });
  }

  /**
   * Get a session
   */
  static async getSession(req: Request, res: Response) {
    const { sessionId } = req.params;
    const session = sessionService.getSession(sessionId);

    res.json({ session });
  }

  /**
   * Get user sessions
   */
  static async getUserSessions(req: Request, res: Response) {
    if (!req.user) {
      throw new ValidationError("User authentication required");
    }

    const sessions = sessionService.getUserSessions(req.user.id);

    res.json({
      sessions: sessions.map((s) => ({
        id: s.id,
        startedAt: s.startedAt,
        endedAt: s.endedAt,
        status: s.status,
        requestCount: s.requests.length
      }))
    });
  }

  /**
   * End a session
   */
  static async endSession(req: Request, res: Response) {
    const { sessionId } = req.params;
    const session = sessionService.endSession(sessionId);

    res.json({ session });
  }

  /**
   * Delete a session
   */
  static async deleteSession(req: Request, res: Response) {
    const { sessionId } = req.params;
    const deleted = sessionService.deleteSession(sessionId);

    res.json({ deleted });
  }

  /**
   * Get session statistics
   */
  static async getStatistics(req: Request, res: Response) {
    const stats = sessionService.getStatistics();
    res.json({ statistics: stats });
  }
}
