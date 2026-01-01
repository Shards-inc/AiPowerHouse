#!/bin/bash

# Setup script for AiPowerHouse UI

set -e

echo "🚀 Setting up AiPowerHouse UI..."

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18 or higher is required. Current version: $(node --version)"
    exit 1
fi
echo "✓ Node.js version: $(node --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📄 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env with your API keys and configuration"
else
    echo "✓ .env file already exists"
fi

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

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Update .env with your API keys"
echo "  2. Start the development server: npm run dev"
echo "  3. Or build for production: npm run build"
echo ""
