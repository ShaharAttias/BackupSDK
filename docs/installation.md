# Installation

This guide explains how to add BackupSDK to your Android project and prepare it for use.

---

## Prerequisites

Before integrating BackupSDK, make sure you have:

- Android Studio
- A Kotlin-based Android project
- Internet permission enabled
- A running BackupSDK backend server
- A valid App ID and API Key

---

## Step 1 — Add the SDK Module

Add the BackupSDK module to your Android project.

Include the SDK module as a dependency in your application's `build.gradle` file:

```gradle
implementation(project(":backup"))
```

> **Note**
>
> BackupSDK is currently distributed as a local Android module.

---

## Step 2 — Grant Internet Permission

BackupSDK communicates with the backend server over HTTP.

Add the following permission to your `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

---

## Step 3 — Configure the SDK

Initialize BackupSDK using your App ID, API Key, and backend server URL.

```kotlin
BackupSDK.init(
    context = applicationContext,
    appId = "your-app-id",
    apiKey = "your-api-key",
    baseUrl = "https://your-server-url.com"
)
```

Example:

```kotlin
BackupSDK.init(
    context = applicationContext,
    appId = "demo-app",
    apiKey = "demo-api-key",
    baseUrl = "https://your-backend-url.com"
)
```

---

## Step 4 — Verify the Connection

Before using BackupSDK, verify that:

- The backend server is running.
- The backend URL is accessible from the Android device.
- MongoDB is connected.
- The App ID and API Key are valid.

---

## Troubleshooting

### Server is not reachable

Verify that:

- The backend server is running.
- The configured backend URL is correct.
- The Android device can access the backend server.

---

### SDK is not initialized

Make sure `BackupSDK.init()` is called before using any SDK operation.

---

### Invalid App ID or API Key

Verify that the App ID and API Key match the credentials registered in the Developer Portal.