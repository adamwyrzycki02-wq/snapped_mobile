# SnappedAI - Quick Start Guide

Welcome to SnappedAI! This project is now set up for both Expo development and native iOS development with Xcode.

## 🚀 Quick Setup (5 minutes)

### Prerequisites
- macOS (for iOS development)
- Node.js 18+
- Xcode (latest version)
- CocoaPods: `sudo gem install cocoapods`

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Install iOS dependencies
cd ios && pod install && cd ..

# 3. Start development
npm start
```

## 📱 Development Options

### Option 1: Expo Development (Easiest)
```bash
npm start                    # Start Expo dev server
npm run ios:simulator       # Run on iOS Simulator
```

### Option 2: Native Xcode Development (Full Control)
```bash
open ios/SnappedAI.xcworkspace  # Open in Xcode
# Then press Cmd+R to build and run
```

## 🎯 TestFlight Deployment

### Quick Deploy (EAS Build)
```bash
npm run build:ios:production  # Build in cloud
npm run submit:ios           # Submit to TestFlight
```

### Local Build (Xcode)
1. Open `ios/SnappedAI.xcworkspace` in Xcode
2. Product → Archive
3. Upload to App Store Connect

## 📚 Detailed Guides

- **[XCODE_SETUP.md](./XCODE_SETUP.md)** - Complete native iOS development guide
- **[LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md)** - Expo development workflow
- **[TESTFLIGHT_DEPLOYMENT.md](./TESTFLIGHT_DEPLOYMENT.md)** - TestFlight deployment options

## 🔧 Project Structure

```
snapped_mobile/
├── ios/                     # 📱 Native iOS Xcode project
│   ├── SnappedAI.xcworkspace   # ← Open this in Xcode
│   └── SnappedAI/
├── src/                     # ⚛️ React Native source code
├── assets/                  # 🖼️ App assets
└── app.json                # ⚙️ Expo configuration
```

## ⚡ Common Commands

```bash
# Development
npm start                    # Start Metro bundler
npm run ios:simulator       # iOS Simulator
npm run ios:local           # Connected iOS device
open ios/SnappedAI.xcworkspace  # Open Xcode

# Building
npm run build:ios:production # EAS cloud build
npm run submit:ios          # Submit to TestFlight

# Maintenance
npm run prebuild:clean      # Regenerate native files
cd ios && pod update       # Update iOS dependencies
```

## 🆘 Need Help?

1. **Build issues**: Check [XCODE_SETUP.md](./XCODE_SETUP.md) troubleshooting section
2. **Expo issues**: Check [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md)
3. **TestFlight**: Check [TESTFLIGHT_DEPLOYMENT.md](./TESTFLIGHT_DEPLOYMENT.md)

## 🎉 You're Ready!

Your project now supports:
- ✅ Native iOS development with Xcode
- ✅ Expo development workflow
- ✅ TestFlight deployment (multiple methods)
- ✅ Local and cloud builds

Choose the workflow that best fits your needs and start building! 🚀