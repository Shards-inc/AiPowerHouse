# Getting Started Guide

Welcome to AiPowerHouse UI! This guide will help you get up and running quickly.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Docker** (optional, for containerized deployment)
- **PostgreSQL** 16+ (for database)
- **Redis** 7+ (for caching)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/aipowerhouse/ui.git
cd ui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Copy the example environment file and update it with your API keys:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
# Required: Add at least one AI provider API key
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key
GOOGLE_API_KEY=your-google-key

# Database (if using PostgreSQL)
DB_HOST=localhost
DB_PASSWORD=your-db-password

# Authentication
JWT_SECRET=your-secret-key-min-32-characters
```

### 4. Run Setup Script

```bash
npm run setup
```

This will:
- Validate your environment
- Install dependencies
- Run type checking
- Run linters
- Run tests

### 5. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 6. Test the API

Open your browser or use curl:

```bash
# Health check
curl http://localhost:3000/health

# Get available providers
curl http://localhost:3000/api/v1/ai/providers
```

## Using Docker

### Build and Run with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Project Structure

```
aipowerhouse-ui/
├── src/                    # Source code
│   ├── api/               # AI provider integrations
│   ├── config/            # Configuration
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Express middleware
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── types/             # TypeScript types
│   ├── utils/             # Utilities
│   ├── app.ts            # Express app setup
│   └── server.ts         # Server entry point
├── tests/                 # Test files
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
├── docs/                  # Documentation
├── scripts/               # Utility scripts
├── .github/               # GitHub Actions
├── index.html            # UI frontend
├── docker-compose.yml    # Docker configuration
├── Dockerfile            # Docker image
└── package.json          # Dependencies

```

## Basic Usage

### 1. Create a Session

```bash
curl -X POST http://localhost:3000/api/v1/sessions \
  -H "x-api-key: your-api-key"
```

Response:
```json
{
  "session": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "user-123",
    "status": "active",
    "startedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### 2. Send a Prompt

```bash
curl -X POST http://localhost:3000/api/v1/ai/prompt \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Explain quantum computing in simple terms",
    "providerId": "chatgpt"
  }'
```

Response:
```json
{
  "request": {
    "id": "req-123",
    "timestamp": "2025-01-01T00:00:00.000Z"
  },
  "response": {
    "id": "res-456",
    "content": "Quantum computing is...",
    "tokensUsed": 150,
    "latency": 1200,
    "providerId": "chatgpt"
  },
  "governance": {
    "requestIssues": [],
    "responseIssues": []
  }
}
```

### 3. Use Different Routing Strategies

```bash
# Consensus routing (queries multiple providers)
curl -X POST http://localhost:3000/api/v1/ai/prompt \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "What is artificial intelligence?",
    "routing": "consensus"
  }'
```

## Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run test:ui          # Open test UI

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Check formatting
npm run format:fix       # Fix formatting
npm run typecheck        # Run TypeScript checks

# Docker
npm run docker:build     # Build Docker image
npm run docker:up        # Start containers
npm run docker:down      # Stop containers
npm run docker:logs      # View logs

# Utilities
npm run setup            # Run setup script
npm run migrate          # Run database migrations
npm run cli              # Run CLI tool
npm run clean            # Clean build artifacts
```

## API Authentication

All API requests (except public endpoints) require authentication using an API key:

```bash
-H "x-api-key: your-32-character-api-key"
```

### Generate an API Key

```bash
npm run cli generate-key
```

## Configuration

### Environment Variables

See `.env.example` for all available configuration options.

Key variables:

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/staging/production)
- `OPENAI_API_KEY` - OpenAI API key
- `ANTHROPIC_API_KEY` - Anthropic API key
- `GOOGLE_API_KEY` - Google API key
- `JWT_SECRET` - JWT signing secret
- `DB_PASSWORD` - Database password

### Governance Settings

Control safety and compliance:

```env
GOVERNANCE_PROMPT_FIREWALL=true    # Enable PII detection
GOVERNANCE_HUMAN_REVIEW=false      # Require human review
GOVERNANCE_COMPLIANCE_MODE=moderate # strict/moderate/permissive
```

## Troubleshooting

### Port Already in Use

```bash
# Change port in .env
PORT=3001
```

### Database Connection Failed

```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Or start with Docker Compose
docker-compose up -d postgres
```

### API Key Invalid

Ensure your API key is at least 32 characters:

```bash
npm run cli generate-key
```

### Build Errors

```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

## Next Steps

- [API Documentation](../api/openapi.yaml) - Explore all endpoints
- [Architecture Guide](../ARCHITECTURE.md) - Understand the system
- [Deployment Guide](DEPLOYMENT.md) - Deploy to production
- [Contributing Guide](../../CONTRIBUTING.md) - Contribute to the project

## Support

- **Issues**: [GitHub Issues](https://github.com/aipowerhouse/ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/aipowerhouse/ui/discussions)
- **Email**: support@aipowerhouse.dev

## License

This project is licensed under the MIT License - see [LICENSE](../../LICENSE) for details.
