<div align="center">
  <img
    width="1200"
    height="475"
    alt="GHBanner"
    src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6"
  />
  <h1>AiPowerHouse UI</h1>
  <p>🚀 Enterprise-grade multi-model AI orchestration platform</p>
  
  [![CI](https://github.com/aipowerhouse/ui/actions/workflows/ci.yml/badge.svg)](https://github.com/aipowerhouse/ui/actions/workflows/ci.yml)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-blue.svg)](https://www.typescriptlang.org/)
  [![Node](https://img.shields.io/badge/Node-18+-green.svg)](https://nodejs.org/)
</div>

---

## 🌟 Overview

AiPowerHouse UI is a professional, production-ready platform for orchestrating multiple AI models in a unified interface. Built with enterprise-grade architecture, it provides intelligent routing, governance controls, and seamless integration with leading AI providers.

### ✨ Key Features

- **🤖 Multi-Model Support**: Integrate ChatGPT, Claude, Gemini, Grok, and more
- **🔀 Smart Routing**: Primary, fallback, consensus, and load-balanced routing strategies
- **🛡️ Governance & Safety**: PII detection, content filtering, audit trails
- **📊 Real-time Metrics**: Monitor latency, tokens, costs, and reliability
- **🔐 Enterprise Security**: JWT authentication, rate limiting, RBAC
- **📈 Scalable Architecture**: Stateless API, Redis caching, PostgreSQL storage
- **🐳 Docker Ready**: Full containerization with Docker Compose
- **📚 API Documentation**: Complete OpenAPI/Swagger specification
- **🧪 Comprehensive Testing**: Unit, integration, and E2E tests
- **🔄 CI/CD Pipeline**: Automated testing and deployment with GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Docker
- PostgreSQL 16+ (optional, for database features)
- Redis 7+ (optional, for caching)

### Installation

```bash
# Clone the repository
git clone https://github.com/aipowerhouse/ui.git
cd ui

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Run setup
npm run setup

# Start development server
npm run dev
```

Server runs at `http://localhost:3000`

### Docker Deployment

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📖 Documentation

- **[Getting Started Guide](docs/guides/GETTING_STARTED.md)** - Complete setup walkthrough
- **[API Reference](docs/guides/API_REFERENCE.md)** - Full API documentation
- **[Architecture](docs/ARCHITECTURE.md)** - System design and patterns
- **[Deployment Guide](docs/guides/DEPLOYMENT.md)** - Production deployment
- **[OpenAPI Spec](docs/api/openapi.yaml)** - Interactive API documentation

## 🎯 Usage Examples

### Send a Prompt

```bash
curl -X POST http://localhost:3000/api/v1/ai/prompt \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Explain quantum computing",
    "providerId": "chatgpt"
  }'
```

### Use Consensus Routing

```bash
curl -X POST http://localhost:3000/api/v1/ai/prompt \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "What is artificial intelligence?",
    "routing": "consensus"
  }'
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm test                 # Run tests
npm run test:coverage    # Generate coverage report
npm run lint             # Run linter
npm run format           # Check code formatting
npm run typecheck        # Run TypeScript checks
npm run docker:build     # Build Docker image
npm run cli              # Run CLI tool
```

### Project Structure

```
├── src/                    # Source code
│   ├── api/               # AI provider integrations
│   ├── config/            # Configuration management
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Express middleware
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── types/             # TypeScript definitions
│   └── utils/             # Utilities
├── tests/                 # Test suites
├── docs/                  # Documentation
├── scripts/               # Utility scripts
└── .github/               # CI/CD workflows
```

## 🔑 Configuration

Key environment variables:

```env
# Application
NODE_ENV=production
PORT=3000

# AI Providers
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=sk-ant-your-key
GOOGLE_API_KEY=your-key

# Database
DB_HOST=localhost
DB_PASSWORD=your-password

# Security
JWT_SECRET=your-secret-min-32-chars

# Governance
GOVERNANCE_PROMPT_FIREWALL=true
GOVERNANCE_COMPLIANCE_MODE=moderate
```

See [.env.example](.env.example) for all options.

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Open test UI
npm run test:ui
```

## 📦 Deployment

### Docker

```bash
npm run docker:build
docker run -p 3000:3000 --env-file .env aipowerhouse/ui:latest
```

### Kubernetes

See [deployment guide](docs/guides/DEPLOYMENT.md) for Kubernetes manifests.

### Cloud Platforms

- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances

## 🤝 Contributing

We welcome contributions! Please see:

- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linters
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

Built with:
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Vitest](https://vitest.dev/)
- [Docker](https://www.docker.com/)

AI Providers:
- [OpenAI](https://openai.com/)
- [Anthropic](https://www.anthropic.com/)
- [Google AI](https://ai.google/)

## 📞 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/aipowerhouse/ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/aipowerhouse/ui/discussions)
- **Email**: support@aipowerhouse.dev

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐

---

<div align="center">
  <p>Built with ❤️ by the AiPowerHouse Team</p>
  <p>
    <a href="https://aipowerhouse.dev">Website</a> •
    <a href="https://github.com/aipowerhouse/ui">GitHub</a> •
    <a href="https://twitter.com/aipowerhouse">Twitter</a>
  </p>
</div>
