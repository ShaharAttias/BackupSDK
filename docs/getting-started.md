# Getting Started

This guide walks you through the basic steps required to integrate BackupSDK into your Android application.

---

## Requirements

- Android Studio
- Kotlin support
- Internet connection
- A running BackupSDK backend server
- A valid App ID and API Key

---

## Step 1 — Add the SDK

Add the BackupSDK library to your Android project.

> Installation methods are explained in the **Installation** guide.

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

---

## Step 3 — Set the User ID

Before performing backup, restore, or delete operations, set the current user identifier.

```kotlin
BackupSDK.setUserId("user123")
```

The User ID is used to associate backup data with a specific user.

---

## Step 4 — Save Data

Save application data as a key-value pair.

```kotlin
BackupSDK.save(
    key = "theme",
    value = "dark"
)
```

The SDK saves the value locally and synchronizes the full backup data with the server.

---

## Step 5 — Restore Data

Restore all previously saved backup data from the server into local storage.

```kotlin
BackupSDK.restoreAll()
```

---

## Step 6 — Handle Results

Backup operations can receive an optional callback.

```kotlin
BackupSDK.save(
    key = "theme",
    value = "dark",
    callback = object : BackupSDK.BackupCallback {
        override fun onSuccess(message: String) {
            // Backup saved successfully
        }

        override fun onError(error: String) {
            // Handle error
        }
    }
)
```
