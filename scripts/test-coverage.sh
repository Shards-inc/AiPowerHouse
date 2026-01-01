#!/bin/bash

# Test coverage script

set -e

echo "🧪 Running tests with coverage..."

npm run test:coverage

echo ""
echo "✅ Coverage report generated!"
echo "📊 View coverage report: coverage/index.html"
