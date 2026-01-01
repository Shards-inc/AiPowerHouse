#!/usr/bin/env node

/**
 * CLI tool for AiPowerHouse UI
 */

import { Command } from "commander";
import { config } from "../src/config/index.js";
import { logger } from "../src/utils/logger.js";
import { generateRandomString } from "../src/utils/crypto.js";

const program = new Command();

program
  .name("aipowerhouse")
  .description("CLI tool for AiPowerHouse UI")
  .version(config.app.version);

// Generate API key command
program
  .command("generate-key")
  .description("Generate a new API key")
  .option("-l, --length <number>", "Key length", "32")
  .action((options) => {
    const length = parseInt(options.length, 10);
    const apiKey = generateRandomString(length);
    console.log("Generated API Key:");
    console.log(apiKey);
  });

// Check health command
program
  .command("health")
  .description("Check service health")
  .action(async () => {
    try {
      const response = await fetch(`http://${config.app.host}:${config.app.port}/health`);
      const data = await response.json();
      console.log("Health Status:", data.status);
      console.log("Version:", data.version);
      console.log("Environment:", data.environment);
    } catch (error) {
      console.error("Failed to check health:", error);
      process.exit(1);
    }
  });

// Test provider command
program
  .command("test-provider <provider>")
  .description("Test an AI provider connection")
  .option("-k, --api-key <key>", "API key to test")
  .action(async (provider, options) => {
    console.log(`Testing ${provider} provider...`);
    
    // In a real implementation, test the provider connection
    console.log("API Key:", options.apiKey ? "✓ Provided" : "✗ Not provided");
    console.log("Status: Not implemented yet");
  });

// Show config command
program
  .command("config")
  .description("Show current configuration")
  .action(() => {
    console.log("Application Configuration:");
    console.log("-------------------------");
    console.log(`Name: ${config.app.name}`);
    console.log(`Version: ${config.app.version}`);
    console.log(`Environment: ${config.app.env}`);
    console.log(`Port: ${config.app.port}`);
    console.log(`API Prefix: ${config.api.prefix}`);
    console.log("");
    console.log("Governance:");
    console.log(`  Prompt Firewall: ${config.governance.promptFirewall}`);
    console.log(`  Human Review: ${config.governance.humanReviewLoop}`);
    console.log(`  Data Residency: ${config.governance.dataResidency}`);
    console.log(`  Compliance Mode: ${config.governance.complianceMode}`);
  });

program.parse();
