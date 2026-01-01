#!/bin/bash

# Database migration script

set -e

echo "🗄️  Running database migrations..."

# Build TypeScript first
npm run build

# Run migrations
node dist/migrations/migrate.js

echo "✅ Migrations completed!"
