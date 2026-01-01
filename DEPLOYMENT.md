# Deployment Guide

This guide covers various deployment options for AiPowerHouse UI.

## Prerequisites

Before deploying, ensure you have:

1. Built the production bundle: `npm run build`
2. Verified the build locally: `npm run preview`
3. Checked that all tests pass: `npm test`

## Build Output

The production build creates a `dist/` directory containing:

```
dist/
├── index.html          # Entry HTML file
├── assets/
│   ├── index-[hash].js    # JavaScript bundle
│   └── index-[hash].css   # CSS bundle (if extracted)
└── vite.svg            # Static assets
```

## Deployment Options

### Static Hosting

#### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

Or connect your GitHub repository to Vercel for automatic deployments.

**Configuration** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "framework": "vite"
}
```

#### Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Build: `npm run build`
3. Deploy: `netlify deploy --prod --dir=dist`

Or connect your GitHub repository to Netlify.

**Configuration** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```
3. Run: `npm run deploy`

**Configuration** (`vite.config.ts`):
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... other config
})
```

### CDN Deployment

#### Cloudflare Pages

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set build output directory: `dist`
4. Deploy

#### AWS S3 + CloudFront

1. Build: `npm run build`
2. Upload `dist/` contents to S3 bucket
3. Configure CloudFront distribution
4. Set up custom domain (optional)

**S3 Configuration:**
- Enable static website hosting
- Set index document: `index.html`
- Configure bucket policy for public read access

**CloudFront Configuration:**
- Set default root object: `index.html`
- Configure error pages (404 → `/index.html`)

### Container Deployment

#### Docker

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

Build and run:
```bash
docker build -t aipowerhouse-ui .
docker run -p 80:80 aipowerhouse-ui
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

## Environment Variables

If you need environment variables:

1. Create `.env.production`:
   ```
   VITE_API_URL=https://api.example.com
   ```

2. Access in code:
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

3. Vite will replace these at build time.

## CI/CD Integration

### GitHub Actions

The repository includes a CI workflow (`.github/workflows/ci.yml`) that:
- Runs linting
- Checks formatting
- Type checks
- Runs tests
- Builds the application

For automatic deployment, add a deployment step to the workflow.

## Performance Optimization

### Pre-deployment Checklist

- [ ] Minification enabled (default in Vite)
- [ ] Source maps generated (for debugging)
- [ ] Assets optimized
- [ ] Gzip/Brotli compression enabled (via hosting provider)
- [ ] CDN configured (if applicable)
- [ ] Caching headers configured
- [ ] Error pages configured (SPA routing)

### Caching Strategy

Configure caching headers:
- HTML: No cache or short cache
- JS/CSS: Long cache with hash-based filenames
- Images: Long cache

## Monitoring

After deployment, monitor:

1. **Performance**: Use tools like Lighthouse, WebPageTest
2. **Errors**: Set up error tracking (Sentry, LogRocket)
3. **Analytics**: Add analytics (Google Analytics, Plausible)
4. **Uptime**: Monitor availability (UptimeRobot, Pingdom)

## Troubleshooting

### 404 Errors on Refresh

Ensure your hosting provider is configured to serve `index.html` for all routes (SPA routing).

### Build Failures

- Check Node.js version (requires 20.x)
- Clear `node_modules` and reinstall
- Check for TypeScript errors: `npm run typecheck`

### Performance Issues

- Enable compression (gzip/brotli)
- Use CDN for static assets
- Optimize images
- Enable HTTP/2

## Security Considerations

- Use HTTPS
- Set security headers (CSP, HSTS, etc.)
- Keep dependencies updated
- Use environment variables for secrets
- Enable CORS properly if using APIs

## Support

For deployment issues, please open an issue in the GitHub repository.
