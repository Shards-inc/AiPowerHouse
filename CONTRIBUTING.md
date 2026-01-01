# Contributing to AiPowerHouse UI

First off, thank you for considering contributing to AiPowerHouse UI! It's people like you that make this project a great tool for the community.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed and what behavior you expected**
* **Include screenshots if relevant**
* **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Explain why this enhancement would be useful**
* **List some examples of how it would be used**

### Pull Requests

* Fill in the required template
* Follow the TypeScript styleguide
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline
* Ensure all tests pass

## Development Process

1. Fork the repo and create your branch from `main`
2. Install dependencies: `npm install`
3. Make your changes
4. Run tests: `npm test`
5. Run linter: `npm run lint`
6. Run type checker: `npm run typecheck`
7. Format code: `npm run format`
8. Commit your changes using conventional commits
9. Push to your fork and submit a pull request

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

* `feat:` - A new feature
* `fix:` - A bug fix
* `docs:` - Documentation only changes
* `style:` - Code style changes (formatting, missing semi-colons, etc)
* `refactor:` - Code changes that neither fix a bug nor add a feature
* `perf:` - Performance improvements
* `test:` - Adding or correcting tests
* `chore:` - Changes to the build process or auxiliary tools

Example:
```
feat: add model comparison dashboard
fix: resolve routing timeout issue
docs: update API integration guide
```

## Development Setup

### Prerequisites

* Node.js 18+ 
* npm or yarn
* Git

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/aipowerhouse-ui.git

# Navigate to the directory
cd aipowerhouse-ui

# Install dependencies
npm install

# Copy environment example
cp .env.example .env

# Start development server
npm run dev
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Code Style

We use:
* **ESLint** for linting TypeScript
* **Prettier** for code formatting
* **TypeScript** strict mode

Run `npm run lint` and `npm run format` before committing.

## Project Structure

```
aipowerhouse-ui/
├── src/              # Source code
│   ├── api/          # API integration layer
│   ├── config/       # Configuration
│   ├── models/       # Data models
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   ├── types/        # TypeScript types
│   └── utils/        # Utilities
├── tests/            # Test files
├── docs/             # Documentation
└── scripts/          # Build and utility scripts
```

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for your contribution! 🎉
