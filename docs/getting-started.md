# Getting Started

This guide walks you through the basic steps required to integrate BackupSDK into your Android application.

Before using the SDK, make sure your project meets the following requirements.

---

## Requirements

- Android Studio
- Kotlin support
- Internet connection
- Access to a running BackupSDK backend server
- Valid App ID and API Key

---

## Step 1 — Add the SDK

Import the BackupSDK library into your Android project.

> The SDK should be added as a dependency or imported as a local module.

---

## Step 2 — Initialize the SDK

Initialize the SDK once when your application starts.

```kotlin
BackupSDK.init(
    context = applicationContext,
    appId = "your-app-id",
    apiKey = "your-api-key",
    baseUrl = "https://your-server-url.com"
)
```

The `baseUrl` should point to your BackupSDK backend server.

> **Developer Tip**
>
> Initialize the SDK only once, preferably when the application starts.

---

## Step 3 — Set the User ID

Before saving or restoring data, set the current user identifier.

```kotlin
BackupSDK.setUserId("user123")
```

The User ID is used by the backend to associate backup data with a specific user.

---

## Step 4 — Save Data

After initialization and user setup, the SDK is ready to save data.

```kotlin
BackupSDK.save(
    key = "theme",
    value = "dark"
)
```

---

## Step 5 — Restore Data

To restore all saved backup data from the server:

```kotlin
BackupSDK.restoreAll()
```

---

## What's Next?

Continue to the **Installation** guide to learn how to add BackupSDK correctly to your Android project.