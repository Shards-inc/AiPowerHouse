/**
 * Session Management Service
 */

import type { Session, AIRequest, User } from "../types/index.js";
import { generateUUID } from "../utils/crypto.js";
import { logger } from "../utils/logger.js";
import { NotFoundError, ValidationError } from "../utils/errors.js";

export class SessionService {
  private sessions: Map<string, Session> = new Map();

  /**
   * Create a new session
   */
  createSession(userId: string): Session {
    const session: Session = {
      id: generateUUID(),
      userId,
      requests: [],
      startedAt: new Date(),
      status: "active"
    };

    this.sessions.set(session.id, session);
    logger.info(`Created session ${session.id} for user ${userId}`);

    return session;
  }

  /**
   * Get a session by ID
   */
  getSession(sessionId: string): Session {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new NotFoundError("Session");
    }
    return session;
  }

  /**
   * Get all sessions for a user
   */
  getUserSessions(userId: string): Session[] {
    return Array.from(this.sessions.values()).filter((s) => s.userId === userId);
  }

  /**
   * Add a request to a session
   */
  addRequestToSession(sessionId: string, request: AIRequest): void {
    const session = this.getSession(sessionId);
    session.requests.push(request);
    logger.debug(`Added request ${request.id} to session ${sessionId}`);
  }

  /**
   * End a session
   */
  endSession(sessionId: string): Session {
    const session = this.getSession(sessionId);
    session.status = "completed";
    session.endedAt = new Date();
    logger.info(`Ended session ${sessionId}`);
    return session;
  }

  /**
   * Terminate a session
   */
  terminateSession(sessionId: string): Session {
    const session = this.getSession(sessionId);
    session.status = "terminated";
    session.endedAt = new Date();
    logger.info(`Terminated session ${sessionId}`);
    return session;
  }

  /**
   * Delete a session
   */
  deleteSession(sessionId: string): boolean {
    const deleted = this.sessions.delete(sessionId);
    if (deleted) {
      logger.info(`Deleted session ${sessionId}`);
    }
    return deleted;
  }

  /**
   * Get active sessions
   */
  getActiveSessions(): Session[] {
    return Array.from(this.sessions.values()).filter((s) => s.status === "active");
  }

  /**
   * Clean up old sessions
   */
  cleanupOldSessions(maxAgeMs: number = 24 * 60 * 60 * 1000): number {
    const cutoff = new Date(Date.now() - maxAgeMs);
    let cleaned = 0;

    for (const [id, session] of this.sessions) {
      if (session.endedAt && session.endedAt < cutoff) {
        this.sessions.delete(id);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      logger.info(`Cleaned up ${cleaned} old sessions`);
    }

    return cleaned;
  }

  /**
   * Get session statistics
   */
  getStatistics(): {
    total: number;
    active: number;
    completed: number;
    terminated: number;
    averageRequestsPerSession: number;
  } {
    const sessions = Array.from(this.sessions.values());
    const totalRequests = sessions.reduce((sum, s) => sum + s.requests.length, 0);

    return {
      total: sessions.length,
      active: sessions.filter((s) => s.status === "active").length,
      completed: sessions.filter((s) => s.status === "completed").length,
      terminated: sessions.filter((s) => s.status === "terminated").length,
      averageRequestsPerSession: sessions.length > 0 ? totalRequests / sessions.length : 0
    };
  }
}
