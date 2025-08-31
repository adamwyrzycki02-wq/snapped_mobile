#!/bin/bash

# Local Development Startup Script for SnappedAI
# This script helps set up and start the app for local development

echo "🚀 Starting SnappedAI for local development..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   You can install it via Homebrew: brew install node"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI..."
    npm install -g @expo/cli
else
    echo "✅ Expo CLI found: $(expo --version)"
fi

# Check if we're in development mode
if [ -z "$NODE_ENV" ]; then
    export NODE_ENV=development
    echo "🔧 Set NODE_ENV to development"
fi

echo ""
echo "🎯 Choose how to run the app:"
echo "1. iOS Simulator (recommended for Mac)"
echo "2. Web browser (quick testing)"
echo "3. Start server only (scan QR with Expo Go app)"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo "🍎 Starting iOS Simulator..."
        expo start --ios
        ;;
    2)
        echo "🌐 Starting in web browser..."
        expo start --web
        ;;
    3)
        echo "📱 Starting development server..."
        echo "   Scan the QR code with Expo Go app on your device"
        expo start
        ;;
    *)
        echo "📱 Starting development server (default)..."
        expo start
        ;;
esac