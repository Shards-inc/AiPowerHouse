/**
 * Server entry point
 */

import { createApp } from "./app.js";
import { config } from "./config/index.js";
import { logger } from "./utils/logger.js";

async function startServer() {
  try {
    const app = createApp();

    const server = app.listen(config.app.port, config.app.host, () => {
      logger.info(`${config.app.name} v${config.app.version} started`, {
        environment: config.app.env,
        port: config.app.port,
        host: config.app.host,
        apiPrefix: config.api.prefix
      });
    });

    // Graceful shutdown
    const shutdown = async () => {
      logger.info("Shutting down gracefully...");

      server.close(() => {
        logger.info("Server closed");
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        logger.error("Forced shutdown");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);

    // Handle uncaught errors
    process.on("uncaughtException", (error) => {
      logger.error("Uncaught exception", error);
      process.exit(1);
    });

    process.on("unhandledRejection", (reason) => {
      logger.error("Unhandled rejection", reason as Error);
      process.exit(1);
    });
  } catch (error) {
    logger.error("Failed to start server", error as Error);
    process.exit(1);
  }
}

startServer();
