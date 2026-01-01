# Contributing to AiPowerHouse UI

Thank you for your interest in contributing to AiPowerHouse UI! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/aipowerhouse-ui.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Make your changes
6. Run tests: `npm test`
7. Run linting: `npm run lint`
8. Check formatting: `npm run format:check`
9. Commit your changes: `git commit -m "Add: your feature description"`
10. Push to your fork: `git push origin feature/your-feature-name`
11. Open a Pull Request

## Development Workflow

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Code Quality Checks

Before committing, ensure all checks pass:

```bash
npm run validate
```

This runs:
- Formatting check
- Linting
- Type checking
- Tests

## Code Style

### TypeScript

- Use TypeScript for all new code
- Prefer type imports: `import type { ... }`
- Use explicit return types for exported functions
- Avoid `any` - use `unknown` if necessary

### React Components

- Use functional components with hooks
- Export components as named exports
- Use TypeScript interfaces for props
- Keep components focused and single-purpose

### File Naming

- Components: `PascalCase.tsx` (e.g., `ModelCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatters.ts`)
- Types: `index.ts` or descriptive names
- Tests: `*.test.tsx` or `*.test.ts`

### Code Formatting

We use Prettier for code formatting. Run:

```bash
npm run format
```

## Commit Messages

Follow conventional commits format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:
```
feat: Add model search functionality
```

## Pull Request Process

1. Update documentation if needed
2. Add tests for new functionality
3. Ensure all tests pass
4. Update CHANGELOG.md if applicable
5. Request review from maintainers
6. Address review feedback
7. Once approved, maintainers will merge

## Project Structure

```
src/
├── components/     # React components
├── data/          # Static data and constants
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── test/          # Test setup and utilities
└── main.tsx       # Application entry point
```

## Questions?

Feel free to open an issue for questions or reach out to the maintainers.

Thank you for contributing! 🎉
