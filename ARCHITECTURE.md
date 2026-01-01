# Architecture Documentation

## Overview

AiPowerHouse UI is a React-based single-page application built with TypeScript, Vite, and Tailwind CSS. The application provides a user interface for orchestrating multi-model AI workflows.

## Technology Stack

### Core Technologies

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe JavaScript for better developer experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework

### Development Tools

- **Vitest**: Fast unit testing framework
- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **Testing Library**: React component testing utilities

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx       # Application header
│   ├── HeroSection.tsx  # Hero section with metrics
│   ├── ModelCard.tsx    # Individual AI model card
│   ├── ModelRoster.tsx  # Grid of AI model cards
│   ├── RoutingPlaybooks.tsx  # Routing playbooks section
│   ├── Governance.tsx   # Governance controls section
│   └── Footer.tsx       # Application footer
├── data/                # Static data
│   ├── models.ts        # AI model definitions
│   ├── playbooks.ts     # Routing playbook definitions
│   └── governance.ts    # Governance control definitions
├── types/               # TypeScript type definitions
│   └── index.ts         # Shared types and interfaces
├── utils/               # Utility functions
│   ├── constants.ts     # Application constants
│   └── formatters.ts    # Data formatting utilities
├── test/                # Test configuration
│   └── setup.ts         # Vitest setup file
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## Component Architecture

### Component Hierarchy

```
App
├── Header
├── HeroSection
│   └── ActiveConversationCard
├── ModelRoster
│   └── ModelCard (multiple)
├── RoutingPlaybooks
└── Governance
└── Footer
```

### Component Design Principles

1. **Single Responsibility**: Each component has a single, well-defined purpose
2. **Composition**: Components are composed together to build complex UIs
3. **Reusability**: Components are designed to be reusable
4. **Type Safety**: All components use TypeScript for type safety
5. **Testability**: Components are designed to be easily testable

## Data Flow

### Static Data

The application uses static data defined in the `src/data/` directory:

- **models.ts**: Contains definitions for all AI models
- **playbooks.ts**: Contains routing playbook configurations
- **governance.ts**: Contains governance control definitions

### State Management

Currently, the application uses React's built-in state management:

- **Local State**: Components use `useState` for local component state
- **No Global State**: No global state management library is used (can be added if needed)

## Styling Approach

### Tailwind CSS

The application uses Tailwind CSS for styling:

- **Utility Classes**: Components use Tailwind utility classes
- **Responsive Design**: Mobile-first responsive design with Tailwind breakpoints
- **Dark Theme**: Dark color scheme using Tailwind's slate color palette
- **Custom Colors**: Custom color scheme for badges and accents

### Typography

- **Font**: Manrope (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700

## Build Process

### Development

1. Vite dev server starts on port 5173
2. Hot Module Replacement (HMR) enabled
3. Fast refresh for React components

### Production

1. TypeScript compilation
2. Vite build process:
   - Code splitting
   - Tree shaking
   - Minification
   - Source maps generation
3. Output to `dist/` directory

## Testing Strategy

### Unit Tests

- Component tests using Vitest and Testing Library
- Utility function tests
- Test files co-located with components (`__tests__/`)

### Integration Tests

- End-to-end component integration tests
- UI validation tests

### Test Coverage

- Aim for >80% code coverage
- Focus on critical business logic
- Component rendering and user interactions

## Performance Considerations

### Code Splitting

- Vendor chunks separated from application code
- Lazy loading can be added for route-based code splitting

### Optimization

- Tree shaking removes unused code
- Minification reduces bundle size
- Source maps for debugging production builds

## Future Enhancements

### Potential Additions

1. **State Management**: Add Zustand or Redux for global state
2. **Routing**: Add React Router for multi-page navigation
3. **API Integration**: Connect to backend API for dynamic data
4. **Real-time Updates**: WebSocket integration for live metrics
5. **Internationalization**: i18n support for multiple languages
6. **Accessibility**: Enhanced ARIA labels and keyboard navigation
7. **PWA**: Progressive Web App capabilities
8. **Error Boundaries**: React error boundaries for better error handling

## Deployment

### Build Output

The production build creates:
- `dist/index.html`: Entry HTML file
- `dist/assets/`: JavaScript and CSS bundles
- Source maps for debugging

### Deployment Options

- Static hosting (Vercel, Netlify, GitHub Pages)
- CDN distribution
- Container deployment (Docker)

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow React best practices
- Use functional components and hooks
- Prefer named exports
- Use meaningful variable and function names

### Git Workflow

- Feature branches for new features
- Conventional commits
- Pull request reviews
- CI/CD pipeline validation
