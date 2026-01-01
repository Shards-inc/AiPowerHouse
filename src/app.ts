/**
 * Express application setup
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { config } from "./config/index.js";
import { errorHandler } from "./middleware/error-handler.js";
import { rateLimit } from "./middleware/rate-limit.js";
import { logger } from "./utils/logger.js";

// Import routes
import aiRoutes from "./routes/ai-routes.js";
import sessionRoutes from "./routes/session-routes.js";
import governanceRoutes from "./routes/governance-routes.js";

export function createApp() {
  const app = express();

  // Security middleware
  app.use(helmet());
  app.use(cors(config.api.cors));

  // Body parsing
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  // Compression
  app.use(compression());

  // Rate limiting
  app.use(rateLimit(config.api.rateLimit));

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: config.app.version,
      environment: config.app.env
    });
  });

  // API routes
  app.use(`${config.api.prefix}/ai`, aiRoutes);
  app.use(`${config.api.prefix}/sessions`, sessionRoutes);
  app.use(`${config.api.prefix}/governance`, governanceRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      error: {
        code: "NOT_FOUND",
        message: "Route not found"
      }
    });
  });

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}

export default createApp;
