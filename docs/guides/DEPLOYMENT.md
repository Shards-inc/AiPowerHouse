# Deployment Guide

This guide covers deploying AiPowerHouse UI to various environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Docker Deployment](#docker-deployment)
- [Cloud Deployment](#cloud-deployment)
- [Production Checklist](#production-checklist)
- [Monitoring & Maintenance](#monitoring--maintenance)

## Prerequisites

### Required

- Linux server (Ubuntu 22.04 LTS recommended)
- Node.js 18+ or Docker
- PostgreSQL 16+
- Redis 7+
- Domain name (for production)
- SSL certificate (for HTTPS)

### Recommended

- 2+ CPU cores
- 4GB+ RAM
- 20GB+ disk space
- Load balancer (for HA)
- Reverse proxy (nginx)

## Environment Setup

### 1. Clone Repository

```bash
git clone https://github.com/aipowerhouse/ui.git
cd ui
```

### 2. Configure Environment

```bash
cp .env.example .env
nano .env
```

Update production values:

```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Database (use strong passwords)
DB_HOST=your-db-host
DB_PASSWORD=secure-password

# JWT (generate strong secret)
JWT_SECRET=$(openssl rand -hex 32)

# AI Provider Keys
OPENAI_API_KEY=your-key
ANTHROPIC_API_KEY=your-key
GOOGLE_API_KEY=your-key

# Governance
GOVERNANCE_PROMPT_FIREWALL=true
GOVERNANCE_COMPLIANCE_MODE=strict
```

### 3. Install Dependencies

```bash
npm ci --only=production
```

### 4. Build Application

```bash
npm run build
```

## Docker Deployment

### Single Container

```bash
# Build image
docker build -t aipowerhouse-ui:latest .

# Run container
docker run -d \
  --name aipowerhouse-ui \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  aipowerhouse-ui:latest
```

### Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Docker Compose

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  app:
    image: aipowerhouse/ui:latest
    restart: always
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    restart: always
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis-data:/data

  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.prod.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
      - ./index.html:/usr/share/nginx/html/index.html:ro
    depends_on:
      - app

volumes:
  postgres-data:
  redis-data:
```

## Cloud Deployment

### AWS (EC2)

```bash
# 1. Launch EC2 instance (t3.medium or larger)
# 2. SSH into instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# 3. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# 4. Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 5. Clone and deploy
git clone https://github.com/aipowerhouse/ui.git
cd ui
cp .env.example .env
nano .env  # Configure
docker-compose -f docker-compose.prod.yml up -d
```

### AWS (ECS)

Create `ecs-task-definition.json`:

```json
{
  "family": "aipowerhouse-ui",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "app",
      "image": "aipowerhouse/ui:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "OPENAI_API_KEY",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:openai-key"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/aipowerhouse-ui",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

Deploy:

```bash
# Create task definition
aws ecs register-task-definition --cli-input-json file://ecs-task-definition.json

# Create service
aws ecs create-service \
  --cluster your-cluster \
  --service-name aipowerhouse-ui \
  --task-definition aipowerhouse-ui \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx]}"
```

### Google Cloud (Cloud Run)

```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT/aipowerhouse-ui

# Deploy to Cloud Run
gcloud run deploy aipowerhouse-ui \
  --image gcr.io/YOUR_PROJECT/aipowerhouse-ui \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production \
  --set-secrets OPENAI_API_KEY=openai-key:latest
```

### Kubernetes

Create `k8s-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: aipowerhouse-ui
spec:
  replicas: 3
  selector:
    matchLabels:
      app: aipowerhouse-ui
  template:
    metadata:
      labels:
        app: aipowerhouse-ui
    spec:
      containers:
      - name: app
        image: aipowerhouse/ui:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        envFrom:
        - secretRef:
            name: aipowerhouse-secrets
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: aipowerhouse-ui
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: aipowerhouse-ui
```

Deploy:

```bash
kubectl apply -f k8s-deployment.yaml
```

## Production Checklist

### Security

- [ ] Strong JWT secret (32+ characters)
- [ ] Secure database password
- [ ] HTTPS enabled with valid SSL certificate
- [ ] API keys stored in secrets manager
- [ ] Rate limiting enabled
- [ ] CORS configured for specific origins
- [ ] Security headers enabled (Helmet.js)
- [ ] Database encryption at rest
- [ ] Regular security audits

### Performance

- [ ] Compression enabled
- [ ] Database connection pooling
- [ ] Redis caching configured
- [ ] CDN for static assets (optional)
- [ ] Load balancer configured
- [ ] Auto-scaling enabled

### Monitoring

- [ ] Health check endpoint working
- [ ] Log aggregation configured
- [ ] Error tracking (Sentry, etc.)
- [ ] Metrics collection (Prometheus)
- [ ] Uptime monitoring
- [ ] Alert rules configured

### Backup & Recovery

- [ ] Database backups automated
- [ ] Backup retention policy
- [ ] Disaster recovery plan
- [ ] Backup restoration tested

### Compliance

- [ ] Governance settings configured
- [ ] Audit logging enabled
- [ ] Data residency requirements met
- [ ] Privacy policy in place
- [ ] Terms of service defined

## Monitoring & Maintenance

### Health Checks

```bash
# Check health
curl https://your-domain.com/health

# Check metrics
curl https://your-domain.com/api/v1/ai/metrics \
  -H "x-api-key: your-key"
```

### Logs

```bash
# Docker logs
docker logs -f aipowerhouse-ui

# Docker Compose logs
docker-compose logs -f app

# Kubernetes logs
kubectl logs -f deployment/aipowerhouse-ui
```

### Database Maintenance

```bash
# Backup database
docker exec aipowerhouse-postgres pg_dump -U postgres aipowerhouse > backup.sql

# Restore database
docker exec -i aipowerhouse-postgres psql -U postgres aipowerhouse < backup.sql
```

### Updates

```bash
# Pull latest code
git pull origin main

# Rebuild
npm run build

# Restart with Docker
docker-compose down
docker-compose up -d --build

# Or with Kubernetes
kubectl rollout restart deployment/aipowerhouse-ui
```

### Scaling

```bash
# Docker Compose (manual)
docker-compose up -d --scale app=3

# Kubernetes (auto-scaling)
kubectl autoscale deployment aipowerhouse-ui \
  --min=2 --max=10 --cpu-percent=70
```

## Troubleshooting

### Application Won't Start

```bash
# Check logs
docker logs aipowerhouse-ui

# Check environment
docker exec aipowerhouse-ui env

# Check health
curl http://localhost:3000/health
```

### High Memory Usage

```bash
# Check memory
docker stats aipowerhouse-ui

# Increase memory limit
docker run --memory="2g" ...
```

### Database Connection Issues

```bash
# Test connection
docker exec aipowerhouse-postgres psql -U postgres -c "SELECT 1"

# Check network
docker network inspect aipowerhouse-network
```

## Support

- **Documentation**: [docs/](../)
- **Issues**: [GitHub Issues](https://github.com/aipowerhouse/ui/issues)
- **Email**: ops@aipowerhouse.dev
