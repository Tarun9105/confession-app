# Android And Play Store Guide

This project is set up to publish the Next.js frontend as an Android app using Capacitor.

## 1. Decide the permanent app identity

- App name: `Confessly`
- Current package id: `com.confessly.app`
- Before first Play Store upload, change the package id if needed in:
  - `F:\night_project\confession-app\confession-app\frontend\capacitor.config.json`
  - `F:\night_project\confession-app\confession-app\frontend\android\app\build.gradle`

Important:
- Once you publish with a package id, you cannot change it for that Play Store app.

## 2. Configure backend URL for release

The Android app must call a real HTTPS backend, not the local dev server.

Create:
- `F:\night_project\confession-app\confession-app\frontend\.env.local` for local web development
- `F:\night_project\confession-app\confession-app\frontend\.env.production` for release builds

Example:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.com/api
```

## 3. Install dependencies

From the repo root:

```bash
npm run setup
```

## 3.1 Install the correct Java and Android tools

Use:

- Android Studio latest stable
- Android SDK Platform 35
- JDK 21

Important:

- Do not use Java 25 for this Android build stack
- If Gradle shows `Unsupported class file major version 69`, switch to JDK 21

## 4. Run web + backend locally

From the repo root:

```bash
npm run dev
```

## 5. Build and sync Android assets

From the repo root:

```bash
npm run android:sync
```

This does:
- static Next.js export to `frontend/out`
- sync exported files into `frontend/android`

## 6. Open Android Studio

From the repo root:

```bash
npm run android:open
```

Or open this folder manually in Android Studio:

- `F:\night_project\confession-app\confession-app\frontend\android`

## 7. Standard Android release setup

In Android Studio:

- Set final app name
- Replace launcher icons
- Add splash assets if needed
- Confirm version code and version name in:
  - `F:\night_project\confession-app\confession-app\frontend\android\app\build.gradle`
- Confirm:
  - `compileSdkVersion = 35`
  - `targetSdkVersion = 35`

## 8. Create signing key

In Android Studio:

- `Build` -> `Generate Signed Bundle / APK`
- Choose `Android App Bundle`
- Create a new keystore
- Save the keystore in a safe backup location

Important:
- Do not lose the keystore
- Do not commit keystore files to git

## 9. Build release bundle

You can build from command line:

```bash
npm run android:bundle
```

Expected output:

- `F:\night_project\confession-app\confession-app\frontend\android\app\build\outputs\bundle\release\app-release.aab`

If signing is not configured yet, finish signing setup in Android Studio first.

## 10. Play Console setup

Prepare:

- App name
- Short description
- Full description
- App icon
- Feature graphic
- Phone screenshots
- Privacy policy URL
- Support email

Also complete:

- Data safety form
- App content declarations
- Content rating questionnaire
- Ads declaration if applicable

## 11. Recommended release flow

Use this order:

1. Internal testing
2. Closed testing
3. Production rollout

## 12. Before publishing checklist

- Backend is deployed over HTTPS
- Privacy policy is live
- Report flow works
- Posting, search, comments, votes, bookmarks all work on Android
- No hardcoded localhost URLs in production build
- Final package id is correct
- Final icons and screenshots are ready
- Signed `.aab` builds successfully

## 13. Important notes for this project

- Backend CORS already supports multiple origins using `FRONTEND_URL`
- You can set multiple origins comma-separated in backend `.env`
- Example:

```env
FRONTEND_URL=https://your-web-app.com,http://localhost:3000,https://localhost
```
