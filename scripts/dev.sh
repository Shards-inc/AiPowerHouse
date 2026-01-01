#!/bin/bash

# Development server startup script

set -e

echo "🔧 Starting development environment..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Copying from .env.example..."
    cp .env.example .env
fi

# Build TypeScript
echo "📦 Building TypeScript..."
npm run build

# Start the server
echo "🚀 Starting server..."
NODE_ENV=development node dist/server.js
