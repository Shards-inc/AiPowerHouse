#!/bin/bash

# Docker build script

set -e

IMAGE_NAME="aipowerhouse/ui"
VERSION=$(node -p "require('./package.json').version")

echo "🐳 Building Docker image..."
echo "Image: $IMAGE_NAME:$VERSION"

# Build the image
docker build -t "$IMAGE_NAME:$VERSION" -t "$IMAGE_NAME:latest" .

echo "✅ Docker image built successfully!"
echo ""
echo "Run the container:"
echo "  docker run -p 3000:3000 --env-file .env $IMAGE_NAME:latest"
echo ""
echo "Or use docker-compose:"
echo "  docker-compose up"
