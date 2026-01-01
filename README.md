<div align="center">
  <img
    width="1200"
    height="475"
    alt="GHBanner"
    src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6"
  />
  <h1>Built with AI Studio</h1>
  <p>The fastest path from prompt to production with Gemini.</p>
  <a href="https://aistudio.google.com/apps">Start building</a>
</div>

# AiPowerHouse UI

A polished, enterprise-grade UI shell for orchestrating multi-model AI workflows. The interface highlights routing playbooks, governance controls, and a curated roster of leading AI platforms.

## ✨ Features

- **Multi-Model Orchestration**: Manage and route tasks across 14+ AI models
- **Routing Playbooks**: Drag-and-drop pipelines for automated switching and fallback
- **Governance Controls**: Built-in guardrails with audit trails and compliance snapshots
- **Real-time Metrics**: Monitor latency, token burn, and risk scores
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Type-Safe**: Full TypeScript coverage with strict type checking
- **Tested**: Comprehensive test suite with Vitest

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/aipowerhouse-ui.git
cd aipowerhouse-ui

# Install dependencies
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` with hot module replacement enabled.

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

The production build will be output to the `dist/` directory.

## 📁 Project Structure

```
aipowerhouse-ui/
├── .github/              # GitHub workflows and templates
│   ├── workflows/        # CI/CD pipelines
│   └── ISSUE_TEMPLATE/  # Issue templates
├── src/
│   ├── components/       # React components
│   │   ├── __tests__/   # Component tests
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ModelCard.tsx
│   │   ├── ModelRoster.tsx
│   │   ├── RoutingPlaybooks.tsx
│   │   ├── Governance.tsx
│   │   └── Footer.tsx
│   ├── data/            # Static data and constants
│   │   ├── models.ts
│   │   ├── playbooks.ts
│   │   └── governance.ts
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/           # Utility functions
│   │   ├── __tests__/   # Utility tests
│   │   ├── constants.ts
│   │   └── formatters.ts
│   ├── test/            # Test setup
│   │   └── setup.ts
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── tests/               # Integration tests
├── .editorconfig        # Editor configuration
├── .gitignore           # Git ignore rules
├── .prettierrc.json     # Prettier configuration
├── .prettierignore      # Prettier ignore rules
├── eslint.config.cjs    # ESLint configuration
├── vite.config.ts       # Vite configuration
├── vitest.config.ts     # Vitest configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project dependencies and scripts
├── index.html           # HTML entry point
├── README.md            # This file
├── CONTRIBUTING.md      # Contribution guidelines
├── CHANGELOG.md         # Changelog
└── LICENSE              # MIT License
```

## 🧪 Testing

Run the test suite:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🔍 Code Quality

### Validation

Run all quality checks:

```bash
npm run validate
```

This command runs:
- Formatting check (`prettier --check`)
- Linting (`eslint`)
- Type checking (`tsc --noEmit`)
- Tests (`vitest run`)

### Individual Commands

```bash
# Format code
npm run format

# Check formatting
npm run format:check

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run typecheck
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Vitest** - Testing framework
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run typecheck` | Run TypeScript type checker |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run validate` | Run all quality checks |

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [AI Studio](https://aistudio.google.com/apps)
- UI components styled with [Tailwind CSS](https://tailwindcss.com)
- Icons and fonts from [Google Fonts](https://fonts.google.com)

## 📞 Support

For support, please open an issue in the GitHub repository.

---

Made with ❤️ by the AiPowerHouse team
