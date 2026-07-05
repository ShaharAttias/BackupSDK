# Installation

This guide explains how to add BackupSDK to your Android project and prepare it for use.

---

## Project Requirements

Before integrating the SDK, make sure your project includes:

- Android Studio
- Kotlin
- Internet permission
- A running BackupSDK backend server
- App ID and API Key

---

## Step 1 — Add the SDK Module

Import the BackupSDK module into your Android project.

If the SDK is distributed as a local module, add it to your project and include it in your Gradle configuration.

```gradle
implementation(project(":backup"))
```

> **Note**
>
> In this project, BackupSDK is integrated as a local module. Future versions may be distributed through Maven Central or JitPack.

---

## Step 2 — Add Internet Permission

Make sure the application has internet access.

Add the following permission to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

---

## Step 3 — Configure the Server

Before making any requests, BackupSDK needs to know where the backend server is located.

Initialize the SDK using your server URL, App ID, and API Key:

```kotlin
BackupSDK.init(
    context = applicationContext,
    appId = "your-app-id",
    apiKey = "your-api-key",
    baseUrl = "https://your-server-url.com"
)
```

Example for a local server:

```kotlin
BackupSDK.init(
    context = applicationContext,
    appId = "demo-app",
    apiKey = "demo-api-key",
    baseUrl = "http://192.168.1.15:3000"
)
```

---

## Step 4 — Set the User ID

Set the current user before using backup operations.

```kotlin
BackupSDK.setUserId("user123")
```

---

## Step 5 — Verify the Connection

After initialization, the SDK communicates with the BackupSDK backend through its REST API.

Make sure that:

- The backend server is running.
- The server URL is accessible from the Android device.
- The backend is connected to MongoDB.
- The App ID and API Key are valid.

---

## Common Issues

### Server not reachable

Verify that:

- The backend server is running.
- The correct IP address or domain is used.
- The Android device and server are connected to the same network when using a local server.

---

### SDK not initialized

If the SDK is used before calling:

```kotlin
BackupSDK.init(...)
```

an exception may be thrown.

---

### User ID is not set

Before saving, restoring, or deleting backup data, call:

```kotlin
BackupSDK.setUserId("user123")
```

---

### App ID or API Key is missing

BackupSDK requires both an App ID and API Key during initialization.

```kotlin
BackupSDK.init(
    context = applicationContext,
    appId = "your-app-id",
    apiKey = "your-api-key",
    baseUrl = "https://your-server-url.com"
)
```

---

## What's Next?

Continue to **Architecture** to understand how BackupSDK communicates with the backend server and stores backup data.