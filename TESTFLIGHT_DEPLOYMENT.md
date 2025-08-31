# TestFlight Deployment Guide for SnappedAI

This guide will walk you through the process of building and deploying your React Native Expo app to TestFlight.

## Prerequisites

Before you begin, ensure you have:

1. **Apple Developer Account**: You need a paid Apple Developer account ($99/year)
2. **Xcode**: Latest version installed on macOS
3. **Node.js**: Version 18 or higher
4. **Expo CLI**: Will be installed as part of the setup
5. **EAS CLI**: Will be installed as part of the setup

## Step 1: Install Dependencies

```bash
cd /path/to/your/snapped_mobile
npm install
```

## Step 2: Install and Configure EAS CLI

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to your Expo account (create one if you don't have it)
eas login

# Initialize EAS in your project (if not already done)
eas build:configure
```

## Step 3: Configure Apple Developer Account

### 3.1 Create App Store Connect App

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Click "My Apps" → "+" → "New App"
3. Fill in the details:
   - **Platform**: iOS
   - **Name**: SnappedAI
   - **Primary Language**: English
   - **Bundle ID**: com.snapped.ai (must match the one in app.json)
   - **SKU**: com.snapped.ai (or any unique identifier)

### 3.2 Update EAS Configuration

Edit `eas.json` and update the submit section with your details:

```json
{
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "1234567890",
        "appleTeamId": "ABCD123456"
      }
    }
  }
}
```

To find these values:
- **appleId**: Your Apple ID email
- **ascAppId**: Found in App Store Connect → Your App → App Information → General Information → Apple ID
- **appleTeamId**: Found in Apple Developer Portal → Membership → Team ID

## Step 4: Build the App

### 4.1 Build for Production

```bash
# Build the iOS app for production
eas build --platform ios --profile production
```

This will:
- Create a production build
- Upload it to Expo's build servers
- Generate an IPA file
- Automatically increment the build number

### 4.2 Monitor Build Progress

- The build process will take 10-20 minutes
- You can monitor progress in the terminal or at [expo.dev/builds](https://expo.dev/builds)
- Once complete, you'll get a download link for the IPA file

## Step 5: Submit to TestFlight

### Option A: Automatic Submission (Recommended)

```bash
# Submit the latest build to TestFlight
eas submit --platform ios --latest
```

### Option B: Manual Submission

1. Download the IPA file from the build completion email/link
2. Use Xcode or Application Loader to upload to App Store Connect
3. Or use Transporter app from the Mac App Store

## Step 6: Configure TestFlight

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Navigate to your app → TestFlight
3. Wait for the build to process (usually 5-10 minutes)
4. Once processed, you can:
   - Add test information
   - Add internal testers (up to 100)
   - Add external testers (up to 10,000, requires App Review)

### 6.1 Add Internal Testers

1. In TestFlight → Internal Testing
2. Click "+" next to Testers
3. Add email addresses of testers
4. Testers will receive an email invitation

### 6.2 Add External Testers (Optional)

1. In TestFlight → External Testing
2. Create a new group
3. Add testers and submit for review
4. Apple will review your app before external testers can access it

## Step 7: Testing

1. Testers install the TestFlight app from the App Store
2. They use the invitation link/code to install your app
3. They can provide feedback through TestFlight

## Updating Your App

When you need to release updates:

1. Update the version in `app.json` if it's a new version:
   ```json
   {
     "expo": {
       "version": "1.0.1"
     }
   }
   ```

2. Build and submit:
   ```bash
   eas build --platform ios --profile production
   eas submit --platform ios --latest
   ```

## Troubleshooting

### Common Issues:

1. **Bundle ID Mismatch**: Ensure the bundle ID in `app.json` matches the one in App Store Connect

2. **Provisioning Profile Issues**: EAS handles this automatically, but if you encounter issues:
   ```bash
   eas credentials
   ```

3. **Build Failures**: Check the build logs at [expo.dev/builds](https://expo.dev/builds)

4. **Network Security**: The app is configured to allow HTTP connections to your backend server. For production, consider using HTTPS.

### Useful Commands:

```bash
# Check build status
eas build:list

# View credentials
eas credentials

# Cancel a build
eas build:cancel

# View submission status
eas submit:list
```

## Production Considerations

Before going live:

1. **HTTPS**: Consider setting up HTTPS for your backend server
2. **Error Tracking**: Add crash reporting (Sentry, Bugsnag)
3. **Analytics**: Add analytics tracking
4. **Performance**: Test on various devices
5. **App Store Guidelines**: Ensure compliance with Apple's guidelines

## Support

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [TestFlight Documentation](https://developer.apple.com/testflight/)

---

**Note**: This configuration includes network security exceptions for your HTTP backend server. For production apps, it's recommended to use HTTPS instead.