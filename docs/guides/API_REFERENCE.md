# API Reference

Complete API reference for AiPowerHouse UI.

## Base URL

```
Development: http://localhost:3000/api/v1
Production:  https://api.aipowerhouse.dev/api/v1
```

## Authentication

All authenticated endpoints require an API key in the header:

```
x-api-key: your-api-key-here
```

## Rate Limiting

Default limits:
- 100 requests per 15 minutes per IP
- Limits returned in headers:
  - `X-RateLimit-Limit`: Total requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset time

## Endpoints

### Health Check

#### GET /health

Check service health (no authentication required).

**Response**

```json
{
  "status": "healthy",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "version": "0.1.0",
  "environment": "production"
}
```

---

### AI Operations

#### POST /ai/prompt

Send a prompt to AI providers.

**Authentication**: Required

**Request Body**

```json
{
  "prompt": "string (required)",
  "context": "string (optional)",
  "providerId": "string (optional)",
  "routing": "string (optional)",
  "sessionId": "string (optional)"
}
```

**Parameters**

- `prompt` (string, required): The prompt to send to AI
- `context` (string, optional): Additional context
- `providerId` (string, optional): Specific provider ID
  - Options: `chatgpt`, `claude`, `gemini`, `grok`
- `routing` (string, optional): Routing strategy
  - Options: `primary`, `fallback`, `consensus`, `load_balance`, `latency_optimized`, `cost_optimized`
- `sessionId` (string, optional): Session ID to associate with

**Response**

```json
{
  "request": {
    "id": "req-123",
    "timestamp": "2025-01-01T00:00:00.000Z"
  },
  "response": {
    "id": "res-456",
    "requestId": "req-123",
    "providerId": "chatgpt",
    "content": "AI response here...",
    "tokensUsed": 150,
    "latency": 1200,
    "confidence": 0.95,
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "governance": {
    "requestIssues": [],
    "responseIssues": []
  }
}
```

**Example**

```bash
curl -X POST https://api.aipowerhouse.dev/api/v1/ai/prompt \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Explain machine learning",
    "providerId": "chatgpt"
  }'
```

#### GET /ai/providers

Get available AI providers.

**Authentication**: Not required

**Response**

```json
{
  "providers": [
    {
      "id": "chatgpt",
      "name": "ChatGPT",
      "available": true
    },
    {
      "id": "claude",
      "name": "Claude",
      "available": true
    },
    {
      "id": "gemini",
      "name": "Gemini",
      "available": false
    }
  ]
}
```

#### GET /ai/metrics

Get AI provider metrics.

**Authentication**: Required

**Response**

```json
{
  "metrics": {
    "totalRequests": 1000,
    "averageLatency": 1200,
    "totalTokens": 50000,
    "errorRate": 0.02
  }
}
```

---

### Session Management

#### POST /sessions

Create a new session.

**Authentication**: Required

**Response**

```json
{
  "session": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "user-123",
    "startedAt": "2025-01-01T00:00:00.000Z",
    "status": "active"
  }
}
```

#### GET /sessions

Get user sessions.

**Authentication**: Required

**Response**

```json
{
  "sessions": [
    {
      "id": "session-1",
      "startedAt": "2025-01-01T00:00:00.000Z",
      "endedAt": null,
      "status": "active",
      "requestCount": 5
    }
  ]
}
```

#### GET /sessions/:sessionId

Get a specific session.

**Authentication**: Required

**Parameters**

- `sessionId` (path): UUID of the session

**Response**

```json
{
  "session": {
    "id": "session-1",
    "userId": "user-123",
    "startedAt": "2025-01-01T00:00:00.000Z",
    "endedAt": null,
    "status": "active",
    "requests": [...]
  }
}
```

#### POST /sessions/:sessionId/end

End a session.

**Authentication**: Required

**Response**

```json
{
  "session": {
    "id": "session-1",
    "status": "completed",
    "endedAt": "2025-01-01T01:00:00.000Z"
  }
}
```

#### DELETE /sessions/:sessionId

Delete a session.

**Authentication**: Required

**Response**

```json
{
  "deleted": true
}
```

---

### Governance

#### GET /governance/config

Get governance configuration.

**Authentication**: Required

**Response**

```json
{
  "config": {
    "promptFirewall": true,
    "humanReviewLoop": false,
    "dataResidency": "us-central1",
    "auditTrail": true,
    "complianceMode": "moderate"
  }
}
```

#### PUT /governance/config

Update governance configuration.

**Authentication**: Required (Admin role)

**Request Body**

```json
{
  "promptFirewall": true,
  "humanReviewLoop": true,
  "complianceMode": "strict"
}
```

**Response**

```json
{
  "config": { ... },
  "updated": true
}
```

#### GET /governance/audit-log

Get audit log.

**Authentication**: Required (Admin role)

**Query Parameters**

- `limit` (number, optional): Max entries to return (default: 100)

**Response**

```json
{
  "auditLog": [
    {
      "timestamp": "2025-01-01T00:00:00.000Z",
      "requestId": "req-123",
      "action": "pii_detected",
      "details": {
        "types": ["email", "phone"]
      }
    }
  ],
  "count": 1
}
```

#### DELETE /governance/audit-log

Clear audit log.

**Authentication**: Required (Admin role)

**Response**

```json
{
  "cleared": true
}
```

#### GET /governance/report

Export governance report.

**Authentication**: Required (Admin role)

**Response**

```json
{
  "report": {
    "config": { ... },
    "totalEvents": 100,
    "recentEvents": [...],
    "summary": {
      "pii_detected": 10,
      "request_validated": 90
    }
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

### Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request parameters |
| `AUTHENTICATION_ERROR` | 401 | Missing or invalid API key |
| `AUTHORIZATION_ERROR` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `PROVIDER_ERROR` | 502 | AI provider error |
| `TIMEOUT` | 504 | Request timeout |

## SDKs

### Node.js/TypeScript

```typescript
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.aipowerhouse.dev/api/v1',
  headers: {
    'x-api-key': 'your-api-key',
    'Content-Type': 'application/json'
  }
});

// Send prompt
const response = await client.post('/ai/prompt', {
  prompt: 'Explain AI',
  providerId: 'chatgpt'
});

console.log(response.data);
```

### Python

```python
import requests

BASE_URL = 'https://api.aipowerhouse.dev/api/v1'
HEADERS = {
    'x-api-key': 'your-api-key',
    'Content-Type': 'application/json'
}

# Send prompt
response = requests.post(
    f'{BASE_URL}/ai/prompt',
    headers=HEADERS,
    json={
        'prompt': 'Explain AI',
        'providerId': 'chatgpt'
    }
)

print(response.json())
```

### cURL

```bash
curl -X POST https://api.aipowerhouse.dev/api/v1/ai/prompt \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Explain AI", "providerId": "chatgpt"}'
```

## OpenAPI Specification

Full OpenAPI 3.0 specification available at:
- [openapi.yaml](../api/openapi.yaml)
- Interactive docs (when server is running): `http://localhost:3000/api-docs`

## Support

- **Issues**: [GitHub Issues](https://github.com/aipowerhouse/ui/issues)
- **Email**: api@aipowerhouse.dev
