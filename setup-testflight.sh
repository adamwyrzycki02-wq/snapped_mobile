#!/bin/bash

# TestFlight Setup Script for SnappedAI
# This script helps set up the environment for TestFlight deployment

echo "🚀 Setting up SnappedAI for TestFlight deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

# Install EAS CLI globally if not already installed
if ! command -v eas &> /dev/null; then
    echo "📦 Installing EAS CLI globally..."
    npm install -g eas-cli
else
    echo "✅ EAS CLI already installed: $(eas --version)"
fi

# Check if user is logged in to Expo
echo "🔐 Checking Expo authentication..."
if ! eas whoami &> /dev/null; then
    echo "Please log in to your Expo account:"
    eas login
else
    echo "✅ Already logged in to Expo as: $(eas whoami)"
fi

echo ""
echo "🎉 Setup complete! Next steps:"
echo ""
echo "1. Configure your Apple Developer account details in eas.json"
echo "2. Create your app in App Store Connect"
echo "3. Run: eas build --platform ios --profile production"
echo "4. Run: eas submit --platform ios --latest"
echo ""
echo "📖 See TESTFLIGHT_DEPLOYMENT.md for detailed instructions"