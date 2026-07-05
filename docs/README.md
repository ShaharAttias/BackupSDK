# BackupSDK

## Cloud Backup Infrastructure for Android Applications

BackupSDK is a lightweight Android SDK that enables developers to integrate cloud backup and restore capabilities into their applications through a simple Kotlin API.

The project includes a complete backup infrastructure, consisting of an Android SDK, a Node.js backend server, MongoDB database, REST API, Swagger documentation, and a web dashboard for monitoring applications and backup statistics.

---

## Why BackupSDK?

Building a reliable cloud backup solution from scratch requires backend development, REST API implementation, database management, and synchronization between the client and the server.

BackupSDK eliminates this complexity by providing a complete backup infrastructure that can be integrated into Android applications with minimal effort.

---

## Core Features

- Lightweight Kotlin SDK
- Simple SDK initialization
- Save key-value data locally
- Synchronize backup data with the server
- Restore all saved backup data
- Delete backup data
- Application authentication using App ID and API Key
- Web dashboard
- REST API
- Swagger documentation

---

## System Architecture

BackupSDK is built as a complete client-server solution.

```text
Android Application
        │
        ▼
   BackupSDK Library
        │
        ▼
 Local StorageManager
        │
        ▼
   ServerManager
        │
        ▼
 Retrofit HTTP Client
        │
        ▼
 Node.js + Express Server
        │
        ▼
 MongoDB Database
        │
        ▼
 Developer Dashboard
```

---

## Quick Example

```kotlin
BackupSDK.init(
    context = applicationContext,
    appId = "your-app-id",
    apiKey = "your-api-key",
    baseUrl = "https://your-server-url.com"
)

BackupSDK.setUserId("user123")

BackupSDK.save(
    key = "theme",
    value = "dark"
)
```

---

## Documentation

Use the navigation menu to learn how to install, configure, and integrate BackupSDK into your Android application.

The documentation includes:

- Getting Started
- Installation
- Architecture
- API Reference
- Dashboard Guide
- Events
- Examples
- Use Cases
- Screenshots & Demo
- FAQ

---

## Next

Continue to **Getting Started** to begin integrating BackupSDK into your application.