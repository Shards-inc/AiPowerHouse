# Repository Structure

This document provides an overview of the complete repository structure for AiPowerHouse UI.

## Directory Tree

```
aipowerhouse-ui/
├── .github/                          # GitHub configuration
│   ├── workflows/                    # CI/CD workflows
│   │   ├── ci.yml                   # Continuous Integration
│   │   ├── codeql.yml               # Security analysis
│   │   ├── dependabot-auto-merge.yml # Auto-merge Dependabot PRs
│   │   └── release.yml               # Release workflow
│   ├── ISSUE_TEMPLATE/              # Issue templates
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── dependabot.yml                # Dependabot configuration
│   └── pull_request_template.md      # PR template
│
├── .husky/                           # Git hooks
│   └── pre-commit                    # Pre-commit hook
│
├── .vscode/                          # VS Code configuration
│   ├── extensions.json               # Recommended extensions
│   ├── launch.json                   # Debug configuration
│   ├── settings.json                 # Workspace settings
│   └── tasks.json                    # Task definitions
│
├── public/                           # Static assets
│   └── vite.svg                      # Vite logo
│
├── src/                              # Source code
│   ├── components/                   # React components
│   │   ├── __tests__/                # Component tests
│   │   │   ├── Footer.test.tsx
│   │   │   ├── Governance.test.tsx
│   │   │   ├── Header.test.tsx
│   │   │   ├── HeroSection.test.tsx
│   │   │   ├── ModelCard.test.tsx
│   │   │   ├── ModelRoster.test.tsx
│   │   │   └── RoutingPlaybooks.test.tsx
│   │   ├── Footer.tsx
│   │   ├── Governance.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ModelCard.tsx
│   │   ├── ModelRoster.tsx
│   │   └── RoutingPlaybooks.tsx
│   │
│   ├── data/                         # Static data
│   │   ├── __tests__/                # Data tests
│   │   │   └── models.test.ts
│   │   ├── governance.ts             # Governance controls
│   │   ├── models.ts                 # AI model definitions
│   │   └── playbooks.ts              # Routing playbooks
│   │
│   ├── test/                         # Test configuration
│   │   └── setup.ts                  # Vitest setup
│   │
│   ├── types/                        # TypeScript types
│   │   └── index.ts                  # Type definitions
│   │
│   ├── utils/                        # Utility functions
│   │   ├── __tests__/                # Utility tests
│   │   │   └── formatters.test.ts
│   │   ├── constants.ts              # Application constants
│   │   └── formatters.ts             # Formatting utilities
│   │
│   ├── App.tsx                       # Main app component
│   ├── App.test.tsx                  # App tests
│   ├── main.tsx                      # Application entry point
│   └── vite-env.d.ts                 # Vite type definitions
│
├── tests/                            # Integration tests
│   └── ui.test.ts                    # UI integration tests
│
├── types/                            # Global type definitions
│   └── global.d.ts
│
├── .editorconfig                     # Editor configuration
├── .eslintignore                     # ESLint ignore rules
├── .gitignore                        # Git ignore rules
├── .nvmrc                            # Node version
├── .prettierignore                   # Prettier ignore rules
├── .prettierrc.json                  # Prettier configuration
├── ARCHITECTURE.md                    # Architecture documentation
├── CHANGELOG.md                      # Changelog
├── CODE_OF_CONDUCT.md                # Code of conduct
├── CONTRIBUTING.md                   # Contributing guidelines
├── DEPLOYMENT.md                     # Deployment guide
├── eslint.config.cjs                 # ESLint configuration
├── index.html                        # HTML entry point
├── LICENSE                           # MIT License
├── package.json                      # Project dependencies
├── PROJECT_STATUS.md                 # Project status
├── README.md                         # Main documentation
├── REPOSITORY_STRUCTURE.md           # This file
├── SECURITY.md                       # Security policy
├── tsconfig.json                     # TypeScript configuration
├── tsconfig.app.json                 # App TypeScript config
├── tsconfig.node.json                # Node TypeScript config
├── vite.config.ts                    # Vite configuration
└── vitest.config.ts                  # Vitest configuration
```

## File Descriptions

### Configuration Files

- **package.json**: Project dependencies, scripts, and metadata
- **tsconfig.json**: TypeScript compiler configuration (project references)
- **tsconfig.app.json**: TypeScript config for application code
- **tsconfig.node.json**: TypeScript config for Node.js scripts
- **vite.config.ts**: Vite build tool configuration
- **vitest.config.ts**: Vitest test framework configuration
- **eslint.config.cjs**: ESLint linting rules
- **.prettierrc.json**: Prettier code formatting rules
- **.editorconfig**: Editor configuration for consistent formatting
- **.nvmrc**: Node.js version specification
- **.gitignore**: Files and directories ignored by Git
- **.prettierignore**: Files ignored by Prettier
- **.eslintignore**: Files ignored by ESLint

### Source Code

#### Components (`src/components/`)
- **Header.tsx**: Application header with logo and navigation
- **HeroSection.tsx**: Hero section with metrics and active conversation
- **ModelCard.tsx**: Individual AI model card component
- **ModelRoster.tsx**: Grid of AI model cards with search
- **RoutingPlaybooks.tsx**: Routing playbooks section
- **Governance.tsx**: Governance controls section
- **Footer.tsx**: Application footer

#### Data (`src/data/`)
- **models.ts**: 14 AI model definitions
- **playbooks.ts**: Routing playbook configurations
- **governance.ts**: Governance control definitions

#### Types (`src/types/`)
- **index.ts**: TypeScript type definitions for models, playbooks, governance, etc.

#### Utils (`src/utils/`)
- **constants.ts**: Application-wide constants
- **formatters.ts**: Data formatting utility functions

### Tests

- **Component tests**: Located in `src/components/__tests__/`
- **Utility tests**: Located in `src/utils/__tests__/`
- **Data tests**: Located in `src/data/__tests__/`
- **Integration tests**: Located in `tests/`

### Documentation

- **README.md**: Main project documentation
- **ARCHITECTURE.md**: Technical architecture documentation
- **CONTRIBUTING.md**: Contribution guidelines
- **DEPLOYMENT.md**: Deployment instructions
- **SECURITY.md**: Security policy
- **CODE_OF_CONDUCT.md**: Code of conduct
- **CHANGELOG.md**: Version history
- **PROJECT_STATUS.md**: Current project status and roadmap

### CI/CD

- **.github/workflows/ci.yml**: Continuous Integration pipeline
- **.github/workflows/release.yml**: Release workflow
- **.github/workflows/codeql.yml**: Security analysis
- **.github/workflows/dependabot-auto-merge.yml**: Auto-merge Dependabot PRs

### Development Tools

- **.husky/pre-commit**: Pre-commit git hook
- **.vscode/**: VS Code workspace configuration
- **.github/dependabot.yml**: Automated dependency updates

## Key Features

### Code Organization
- ✅ Modular component architecture
- ✅ Separation of concerns (components, data, utils, types)
- ✅ Co-located tests
- ✅ Type-safe with TypeScript

### Development Experience
- ✅ Hot module replacement
- ✅ Fast build times with Vite
- ✅ Comprehensive linting and formatting
- ✅ Pre-commit hooks
- ✅ VS Code integration

### Quality Assurance
- ✅ Unit tests for components
- ✅ Unit tests for utilities
- ✅ Integration tests
- ✅ Type checking
- ✅ Code coverage reporting

### DevOps
- ✅ CI/CD pipelines
- ✅ Automated security scanning
- ✅ Dependency management
- ✅ Release automation

### Documentation
- ✅ Comprehensive README
- ✅ Architecture documentation
- ✅ Contributing guidelines
- ✅ Deployment guide
- ✅ Security policy

## Statistics

- **Total Files**: ~80+
- **TypeScript Files**: ~30+
- **Test Files**: ~10+
- **Documentation Files**: ~10+
- **Configuration Files**: ~15+

## Getting Started

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Run tests: `npm test`
4. Build: `npm run build`

For more information, see [README.md](README.md).
