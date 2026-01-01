#!/bin/bash

# Production build script

set -e

echo "🏗️  Building for production..."

# Clean dist directory
echo "🧹 Cleaning dist directory..."
rm -rf dist

# Run type checking
echo "🔍 Running type check..."
npm run typecheck

# Run linter
echo "🔍 Running linter..."
npm run lint

# Run formatter check
echo "🎨 Checking code formatting..."
npm run format

# Run tests
echo "🧪 Running tests..."
npm test

# Build TypeScript
echo "📦 Building TypeScript..."
npx tsc

echo "✅ Build complete!"
echo "📁 Build output: dist/"
