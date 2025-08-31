# Xcode Project Setup for SnappedAI

This guide will help you set up and use the native iOS Xcode project for local development and TestFlight deployment.

## Overview

This project has been converted from a managed Expo workflow to a bare React Native workflow with native iOS files. This allows you to:

- Open and edit the project directly in Xcode
- Build and run on iOS devices and simulators locally
- Customize native iOS configurations
- Deploy to TestFlight using Xcode or command line tools
- Debug native iOS code

## Prerequisites

### Required Software

1. **macOS** (required for iOS development)
2. **Xcode** (latest version from Mac App Store)
   - Install Xcode Command Line Tools: `xcode-select --install`
3. **Node.js** (version 18 or higher)
4. **CocoaPods** (for iOS dependency management)
   ```bash
   sudo gem install cocoapods
   ```
5. **Expo CLI**
   ```bash
   npm install -g @expo/cli
   ```

### Apple Developer Account

For TestFlight deployment, you'll need:
- Apple Developer Account ($99/year)
- Provisioning profiles and certificates set up in Xcode

## Project Structure

```
snapped_mobile/
├── ios/                          # Native iOS project
│   ├── SnappedAI.xcodeproj/     # Xcode project file
│   ├── SnappedAI.xcworkspace/   # Xcode workspace (use this!)
│   ├── SnappedAI/               # iOS app source code
│   │   ├── Info.plist          # iOS app configuration
│   │   ├── AppDelegate.mm      # App delegate
│   │   └── Images.xcassets/    # App icons and images
│   ├── Podfile                 # CocoaPods dependencies
│   └── Pods/                   # Installed CocoaPods (generated)
├── src/                        # React Native source code
├── assets/                     # App assets (icons, images)
├── app.json                    # Expo configuration
└── package.json               # Node.js dependencies
```

## Setup Instructions

### 1. Install Dependencies

```bash
# Navigate to project directory
cd /path/to/snapped_mobile

# Install Node.js dependencies
npm install

# Install iOS dependencies (CocoaPods)
cd ios
pod install
cd ..
```

### 2. Open in Xcode

**Important**: Always open the `.xcworkspace` file, not the `.xcodeproj` file!

```bash
# Open the workspace in Xcode
open ios/SnappedAI.xcworkspace
```

Or manually:
1. Open Xcode
2. File → Open
3. Navigate to `ios/SnappedAI.xcworkspace`
4. Click "Open"

### 3. Configure Signing & Capabilities

In Xcode:
1. Select the project in the navigator
2. Select the "SnappedAI" target
3. Go to "Signing & Capabilities" tab
4. Select your development team
5. Xcode will automatically manage provisioning profiles

## Development Workflow

### Option 1: Using Xcode (Recommended)

1. **Open the workspace**: `open ios/SnappedAI.xcworkspace`
2. **Select target device**: Choose iOS Simulator or connected device
3. **Build and run**: Press `Cmd+R` or click the play button
4. **Debug**: Use Xcode's debugger for native code issues

### Option 2: Using Command Line

```bash
# Run on iOS Simulator
npm run ios:simulator

# Run on connected iOS device
npm run ios:local

# Start Metro bundler separately (optional)
npm start
```

### Option 3: Using Expo CLI

```bash
# Start development server
expo start

# Run on iOS
expo run:ios
```

## Building for TestFlight

### Method 1: Using Xcode (Recommended)

1. **Open workspace**: `open ios/SnappedAI.xcworkspace`
2. **Select "Any iOS Device"** as the destination
3. **Archive the app**:
   - Product → Archive
   - Wait for build to complete
4. **Upload to App Store Connect**:
   - Window → Organizer
   - Select your archive
   - Click "Distribute App"
   - Choose "App Store Connect"
   - Follow the upload wizard

### Method 2: Using Command Line

```bash
# Build archive
npm run build:ios:local

# Upload to App Store Connect (requires additional setup)
# You'll need to configure fastlane or use Xcode Organizer
```

### Method 3: Using EAS Build (Cloud)

```bash
# Build using Expo's cloud service
npm run build:ios:production

# Submit to TestFlight
npm run submit:ios
```

## Configuration

### App Information

Edit these files to customize your app:

1. **App name and bundle ID**: `ios/SnappedAI/Info.plist`
2. **App icons**: `ios/SnappedAI/Images.xcassets/AppIcon.appiconset/`
3. **Launch screen**: `ios/SnappedAI/SplashScreen.storyboard`
4. **Permissions**: Already configured in `Info.plist`:
   - Camera access
   - Photo library access
   - Network security exceptions

### Bundle Identifier

Current bundle ID: `com.snapped.ai`

To change it:
1. Update in Xcode: Project → Target → General → Bundle Identifier
2. Update in `app.json`: `expo.ios.bundleIdentifier`

### Version and Build Number

- **Version**: Update in `app.json` (`expo.version`)
- **Build Number**: Auto-incremented or update in Xcode

## Troubleshooting

### Common Issues

1. **"No such file or directory" for CocoaPods**
   ```bash
   sudo gem install cocoapods
   cd ios && pod install
   ```

2. **Build fails with signing errors**
   - Check your Apple Developer account status
   - Verify provisioning profiles in Xcode
   - Try "Automatically manage signing"

3. **Metro bundler issues**
   ```bash
   # Clear Metro cache
   npx react-native start --reset-cache
   
   # Or clear all caches
   npm start -- --clear
   ```

4. **Pod install fails**
   ```bash
   cd ios
   pod deintegrate
   pod install
   ```

5. **Xcode build errors**
   - Clean build folder: Product → Clean Build Folder
   - Delete derived data: Xcode → Preferences → Locations → Derived Data → Delete

### iOS Simulator Issues

```bash
# Reset iOS Simulator
xcrun simctl erase all

# List available simulators
xcrun simctl list devices

# Boot specific simulator
xcrun simctl boot "iPhone 15 Pro"
```

## Development Tips

1. **Use the workspace**: Always open `.xcworkspace`, never `.xcodeproj`
2. **Hot reloading**: Shake device or press `Cmd+D` for developer menu
3. **Debugging**: Use Xcode debugger for native issues, Chrome DevTools for JS
4. **Testing on device**: Enable Developer Mode in iOS Settings
5. **Provisioning**: Let Xcode manage signing automatically for development

## File Changes and Regeneration

### When to regenerate iOS files

Run `expo prebuild --clean` when you:
- Add new native dependencies
- Change app configuration significantly
- Update Expo SDK version

### Preserving custom changes

If you make custom changes to iOS files:
1. Document your changes
2. Consider using Expo config plugins instead
3. Be careful with `expo prebuild --clean` as it overwrites files

## Next Steps

1. **Test the app**: Run on simulator and physical device
2. **Configure TestFlight**: Set up App Store Connect
3. **Add team members**: Invite developers to your Apple Developer team
4. **Set up CI/CD**: Consider GitHub Actions or similar for automated builds

## Useful Commands

```bash
# Project setup
npm install                    # Install Node dependencies
cd ios && pod install        # Install iOS dependencies

# Development
npm start                     # Start Metro bundler
npm run ios:simulator        # Run on iOS Simulator
npm run ios:local           # Run on connected device
open ios/SnappedAI.xcworkspace  # Open in Xcode

# Building
npm run build:ios:local     # Build archive locally
npm run build:ios:production # Build with EAS
npm run submit:ios          # Submit to TestFlight

# Maintenance
npm run prebuild:clean      # Regenerate native files
cd ios && pod update       # Update CocoaPods dependencies
```

## Support Resources

- [React Native iOS Guide](https://reactnative.dev/docs/running-on-device)
- [Xcode Documentation](https://developer.apple.com/documentation/xcode)
- [CocoaPods Guides](https://guides.cocoapods.org/)
- [Expo Bare Workflow](https://docs.expo.dev/bare/overview/)
- [TestFlight Documentation](https://developer.apple.com/testflight/)

---

Happy coding! 🚀📱