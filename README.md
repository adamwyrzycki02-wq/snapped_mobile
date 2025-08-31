# SnappedAI Mobile App

A React Native mobile application for AI-powered image search and matching.

## 🚀 Quick Start

**New to the project?** Start here: **[QUICK_START.md](./QUICK_START.md)**

## 📱 Development Options

This project supports multiple development workflows:

### Native iOS Development (Recommended)
- **[XCODE_SETUP.md](./XCODE_SETUP.md)** - Complete guide for native iOS development with Xcode
- Full control over iOS project
- Local builds and TestFlight deployment
- Advanced debugging capabilities

### Expo Development Workflow
- **[LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md)** - Expo-based development workflow
- Quick prototyping and testing
- Cross-platform development

## 🚀 Deployment

- **[TESTFLIGHT_DEPLOYMENT.md](./TESTFLIGHT_DEPLOYMENT.md)** - Complete TestFlight deployment guide
- Multiple deployment methods (EAS Build, Xcode, hybrid)
- Production build configurations

## 📁 Project Structure

```
snapped_mobile/
├── ios/                     # Native iOS Xcode project
│   ├── SnappedAI.xcworkspace   # Main Xcode workspace
│   └── SnappedAI/             # iOS app source
├── src/                     # React Native source code
├── assets/                  # App assets (icons, images)
├── app.json                # Expo configuration
└── package.json            # Dependencies and scripts
```

## 🛠️ Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation library
- **Axios** - HTTP client
- **Lottie** - Animations

## 📋 Features

- AI-powered image search
- Photo capture and upload
- Image cropping and manipulation
- User onboarding flow
- Responsive design for iOS devices

## 🔧 Development

```bash
# Quick setup
npm install
cd ios && pod install && cd ..

# Start development
npm start                    # Expo dev server
npm run ios:simulator       # iOS Simulator
open ios/SnappedAI.xcworkspace  # Xcode

# Build for TestFlight
npm run build:ios:production
npm run submit:ios
```

## 📖 Documentation

- [QUICK_START.md](./QUICK_START.md) - Get started in 5 minutes
- [XCODE_SETUP.md](./XCODE_SETUP.md) - Native iOS development
- [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md) - Expo development
- [TESTFLIGHT_DEPLOYMENT.md](./TESTFLIGHT_DEPLOYMENT.md) - Deployment guide

## 🤝 Contributing

1. Follow the setup guide in [QUICK_START.md](./QUICK_START.md)
2. Create a feature branch
3. Make your changes
4. Test on iOS Simulator and device
5. Submit a pull request

## 📄 License

This project is private and proprietary.

---

**Ready to start?** Check out the [QUICK_START.md](./QUICK_START.md) guide! 🚀