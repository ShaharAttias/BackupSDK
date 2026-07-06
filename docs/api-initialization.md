# Initialization

Before using BackupSDK, the SDK must be initialized and associated with the current user.

Initialization is performed once when the application starts.

---

# BackupSDK.init()

Initializes the SDK and configures the connection to the BackupSDK backend server.

## Syntax

```kotlin
BackupSDK.init(
    context = applicationContext,
    appId = "your-app-id",
    apiKey = "your-api-key",
    baseUrl = "https://your-server-url.com"
)
```

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| context | Context | Android application context. |
| appId | String | Unique application identifier assigned by BackupSDK. |
| apiKey | String | Authentication key for the application. |
| baseUrl | String | Base URL of the BackupSDK backend server. |

---

## Description

During initialization, BackupSDK:

- Creates the local `StorageManager`.
- Configures the `ServerManager` and Retrofit.
- Stores the application credentials.
- Prepares the SDK for communication with the backend server.

The SDK must be initialized before calling any other BackupSDK function.

---

## Example

```kotlin
BackupSDK.init(
    context = applicationContext,
    appId = "demo-app",
    apiKey = "demo-api-key",
    baseUrl = "https://your-backend-url.com"
)
```

---

## Notes

- Call this method only once during application startup.
- It is recommended to initialize the SDK in the `Application` class.
- Calling SDK methods before initialization will result in an exception.

---

# BackupSDK.setUserId()

Associates all backup operations with a specific user.

## Syntax

```kotlin
BackupSDK.setUserId("user123")
```

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| userId | String | Unique identifier of the current user. |

---

## Description

The User ID identifies which user's backup will be stored or restored.

Every call to `save()`, `restoreAll()`, or `deleteBackup()` uses the currently configured User ID.

---

## Example

```kotlin
BackupSDK.setUserId("user123")
```

---

## Notes

- A User ID must be set before calling `save()`, `restoreAll()`, or `deleteBackup()`.
- If no User ID has been configured, BackupSDK throws an exception.