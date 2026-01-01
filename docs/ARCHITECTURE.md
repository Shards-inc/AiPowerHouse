# Architecture Documentation

## Overview

AiPowerHouse UI is a multi-model AI orchestration platform built with TypeScript, Express, and modern cloud-native architecture principles.

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (UI)                       │
│                    index.html                           │
└─────────────────────┬───────────────────────────────────┘
                      │
                      │ HTTPS/REST API
                      │
┌─────────────────────▼───────────────────────────────────┐
│                  API Gateway                            │
│              (Express + Middleware)                     │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Rate Limiting │ Auth │ CORS │ Compression       │  │
│  └─────────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
   ┌────────┐   ┌────────┐   ┌────────────┐
   │   AI   │   │Session │   │Governance  │
   │ Routes │   │ Routes │   │  Routes    │
   └────┬───┘   └────┬───┘   └─────┬──────┘
        │            │              │
        ▼            ▼              ▼
   ┌────────────────────────────────────┐
   │        Business Logic Layer        │
   │  ┌──────────────────────────────┐ │
   │  │ Routing Service              │ │
   │  │ Governance Service           │ │
   │  │ Session Service              │ │
   │  └──────────────────────────────┘ │
   └────────────┬───────────────────────┘
                │
        ┌───────┼───────┐
        ▼       ▼       ▼
   ┌────────┐ ┌────────┐ ┌────────┐
   │OpenAI  │ │Claude  │ │Gemini  │
   │Provider│ │Provider│ │Provider│
   └────────┘ └────────┘ └────────┘
        │       │       │
        └───────┼───────┘
                │
        ┌───────┼───────┐
        ▼               ▼
   ┌──────────┐   ┌──────────┐
   │PostgreSQL│   │  Redis   │
   │ Database │   │  Cache   │
   └──────────┘   └──────────┘
```

## Core Components

### 1. API Layer

**Purpose**: Handle HTTP requests and responses

**Components**:
- `app.ts` - Express application setup
- `server.ts` - Server bootstrapping
- Routes - API endpoint definitions
- Middleware - Request processing pipeline

### 2. Service Layer

**Purpose**: Business logic and orchestration

**Services**:
- **RoutingService**: Manages AI request routing strategies
- **GovernanceService**: Handles compliance and safety
- **SessionService**: Manages user sessions

### 3. Provider Layer

**Purpose**: AI provider integrations

**Providers**:
- OpenAI (ChatGPT)
- Anthropic (Claude)
- Google (Gemini)
- Extensible for additional providers

### 4. Data Layer

**Models**:
- User
- Request
- Response
- Session

**Storage**:
- PostgreSQL - Persistent storage
- Redis - Caching and sessions

## Design Patterns

### 1. Factory Pattern

Used for creating AI provider instances:

```typescript
ProviderFactory.getProvider(type, config)
```

### 2. Strategy Pattern

Used for routing strategies:

```typescript
- Primary routing
- Fallback routing
- Consensus routing
- Load balance routing
```

### 3. Middleware Pattern

Used for request processing:

```typescript
- Authentication
- Rate limiting
- Error handling
- Validation
```

## Data Flow

### Request Flow

1. Client sends HTTP request
2. Rate limiting middleware checks limits
3. Authentication middleware validates API key
4. Validation middleware validates request body
5. Controller processes request
6. Governance service validates content
7. Routing service selects provider(s)
8. Provider sends request to AI API
9. Response is validated and sanitized
10. Response returned to client

### Error Flow

1. Error occurs in any layer
2. Error handler middleware catches it
3. Error is logged
4. Appropriate HTTP status and message returned
5. Audit trail updated (if enabled)

## Security Architecture

### Authentication

- API key based authentication
- Key stored in headers: `x-api-key`
- Role-based access control (RBAC)

### Authorization

- Role checks: Admin, Developer, Viewer
- Route-level authorization
- Resource-level permissions

### Data Protection

- PII detection and redaction
- Content filtering
- Encryption at rest (database)
- Encryption in transit (HTTPS)

### Compliance

- Audit logging
- Data residency controls
- Prompt firewall
- Human review loop

## Scalability

### Horizontal Scaling

- Stateless API servers
- Session storage in Redis
- Load balancing ready

### Vertical Scaling

- Async/await for non-blocking I/O
- Connection pooling for database
- Caching strategies

### Performance Optimization

- Response compression
- Request batching
- Provider metrics tracking
- Query optimization

## Monitoring & Observability

### Logging

- Structured JSON logging
- Log levels: DEBUG, INFO, WARN, ERROR
- Centralized log aggregation ready

### Metrics

- Request count
- Latency tracking
- Error rates
- Token usage
- Provider performance

### Health Checks

- `/health` endpoint
- Database connectivity
- Redis connectivity
- Provider availability

## Deployment Architecture

### Development

```
Local machine → Node.js → Local DB
```

### Staging

```
GitHub → CI/CD → Docker → Staging Server
```

### Production

```
GitHub → CI/CD → Docker → Kubernetes/ECS → Production
                    ↓
              Load Balancer
                    ↓
        ┌───────────┴───────────┐
        ▼                       ▼
   API Server 1           API Server N
        │                       │
        └───────────┬───────────┘
                    ▼
            Database Cluster
```

## Technology Stack

### Backend

- **Runtime**: Node.js 20+
- **Language**: TypeScript 5.4+
- **Framework**: Express 4.x
- **Validation**: Custom validators
- **Testing**: Vitest

### Database

- **Primary**: PostgreSQL 16
- **Cache**: Redis 7

### DevOps

- **Containerization**: Docker
- **Orchestration**: Docker Compose (local), Kubernetes (production)
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana (optional)

### Security

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate limiting**: Custom middleware
- **Encryption**: Node.js crypto

## API Design

### RESTful Principles

- Resource-based URLs
- HTTP methods (GET, POST, PUT, DELETE)
- Stateless operations
- Standard status codes

### Versioning

- URL-based: `/api/v1`
- Backward compatibility maintained

### Error Handling

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

## Future Enhancements

1. **GraphQL API**: Alternative to REST
2. **WebSocket Support**: Real-time streaming
3. **Advanced Analytics**: ML-based insights
4. **Multi-tenancy**: Isolated customer environments
5. **Plugin System**: Custom provider plugins
6. **API Gateway**: Kong or similar
7. **Service Mesh**: Istio for microservices
8. **Observability**: OpenTelemetry integration

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for architecture contribution guidelines.
