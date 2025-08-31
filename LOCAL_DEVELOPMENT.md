# Running SnappedAI Locally on Mac

This guide will help you run the React Native Expo app locally on your Mac for development and testing.

> **📱 NEW: Native iOS Development Available!**  
> This project now includes a native iOS Xcode project for advanced development and TestFlight deployment.  
> See [XCODE_SETUP.md](./XCODE_SETUP.md) for the complete native iOS development guide.

## Prerequisites

### Required Software

1. **Node.js** (version 18 or higher)
   ```bash
   # Check if installed
   node --version
   
   # Install via Homebrew if needed
   brew install node
   ```

2. **Xcode** (for iOS development)
   - Install from Mac App Store
   - Open Xcode and accept license agreements
   - Install iOS Simulator

3. **Expo CLI**
   ```bash
   npm install -g @expo/cli
   ```

4. **iOS Simulator** (comes with Xcode)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Navigate to your project directory
cd /path/to/snapped_mobile

# Install project dependencies
npm install
```

### 2. Configure Development Environment

The app is already configured to use the development backend URL when running locally:
- **Development**: `http://10.0.2.2:12000/api/v1` (for Android emulator)
- **Production**: `http://ec2-13-48-29-237.eu-north-1.compute.amazonaws.com/api/v1`

For local iOS development, you might need to update the API URL. Create a `.env` file:

```bash
# Create .env file for local development
echo "API_BASE_URL=http://localhost:12000/api/v1" > .env
```

### 3. Start the Development Server

```bash
# Start Expo development server
npm start
# or
expo start
```

This will:
- Start the Metro bundler
- Open Expo DevTools in your browser
- Show a QR code for mobile testing

## Running on Different Platforms

### Option 1: iOS Simulator (Recommended for Mac)

```bash
# Start with iOS simulator
npm run ios
# or
expo start --ios
```

This will:
- Launch iOS Simulator automatically
- Install and run the app
- Enable hot reloading for development

### Option 2: Physical iOS Device

1. Install **Expo Go** app from the App Store on your iPhone/iPad
2. Make sure your Mac and iOS device are on the same WiFi network
3. Run `expo start` and scan the QR code with your device camera
4. The app will open in Expo Go

### Option 3: Web Browser (for quick testing)

```bash
# Run in web browser
npm run web
# or
expo start --web
```

Note: Some native features (camera, photo library) won't work in web mode.

## Development Workflow

### Hot Reloading
- Changes to your code will automatically reload the app
- Shake your device or press `Cmd+D` in simulator to open developer menu

### Debugging
- Use React Native Debugger or Chrome DevTools
- Enable "Debug JS Remotely" from the developer menu
- Use `console.log()` statements for debugging

### Common Development Commands

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator (if you have Android Studio)
npm run android

# Run in web browser
npm run web

# Clear cache and restart
expo start --clear

# Install new dependencies
npm install <package-name>
```

## Backend Configuration for Local Development

If you're running the backend locally, update the API URL:

### Option 1: Update app.json temporarily
```json
{
  "expo": {
    "extra": {
      "API_BASE_URL": "http://localhost:12000/api/v1"
    }
  }
}
```

### Option 2: Use environment variables (recommended)
Create `app.config.js` (already created) and set environment:
```bash
export NODE_ENV=development
npm start
```

## Troubleshooting

### Common Issues:

1. **Metro bundler port conflict**
   ```bash
   # Kill processes on port 8081
   lsof -ti:8081 | xargs kill -9
   expo start --clear
   ```

2. **iOS Simulator not opening**
   ```bash
   # Open simulator manually
   open -a Simulator
   # Then run
   expo start --ios
   ```

3. **Network issues with backend**
   - Make sure your backend server is running
   - Check firewall settings
   - For iOS simulator, use `localhost` instead of `10.0.2.2`

4. **Dependencies issues**
   ```bash
   # Clear npm cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

5. **Expo CLI issues**
   ```bash
   # Update Expo CLI
   npm install -g @expo/cli@latest
   ```

### iOS Simulator Shortcuts:
- `Cmd + D` - Open developer menu
- `Cmd + R` - Reload app
- `Cmd + Shift + H` - Go to home screen
- `Cmd + Shift + H + H` - Open app switcher

## File Structure for Development

```
snapped_mobile/
├── src/
│   ├── components/     # Reusable components
│   ├── screens/        # Screen components
│   ├── services/       # API services
│   └── store/          # Storage utilities
├── assets/             # Images, fonts, etc.
├── app.json           # Expo configuration
├── package.json       # Dependencies and scripts
└── babel.config.js    # Babel configuration
```

## Development Tips

1. **Use iOS Simulator for faster development** - No need to deploy to device
2. **Enable Fast Refresh** - Automatic reloading on code changes
3. **Use Flipper or React Native Debugger** for advanced debugging
4. **Test on multiple screen sizes** using different simulator devices
5. **Use TypeScript** for better development experience (already configured)

## Next Steps

Once you have the app running locally:
1. Test all features with your backend
2. Make any necessary changes
3. Test on physical devices
4. Build for TestFlight when ready

---

Happy coding! 🚀