# BackupSDK

BackupSDK is an Android SDK that enables developers to integrate cloud backup and restore functionality into their applications through a simple Kotlin API.

The project provides a complete backup ecosystem, including an Android SDK, a Node.js backend server, a MongoDB database, a REST API, a Developer Portal, and comprehensive documentation.

---

## Project Links

- **Documentation:** https://shaharattias.github.io/BackupSDK/
- **Developer Portal:** https://YOUR-PORTAL-URL
- **Swagger API:** https://backupsdk-api.onrender.com/api-docs
- **Backend API:** https://backupsdk-api.onrender.com

---

## Features

- Lightweight Android SDK
- Cloud backup and restore
- App registration using App ID and API Key
- Developer Portal
- REST API
- Swagger documentation
- MongoDB Atlas storage
- Cloud-hosted backend

---

## Architecture

```text
                Android Application
                        │
                        ▼
                  BackupSDK Library
                        │
                        ▼
                Retrofit REST Client
                        │
                        ▼
               Node.js / Express API
                        │
                        ▼
                  MongoDB Atlas
                        ▲
                        │
               Developer Portal
                    (React)
```

---

## Repository Structure

```text
BackupSDK/
│
├── app/          Demo Android application
├── backup/       Android SDK
├── docs/         SDK documentation
├── portal/       React Developer Portal
└── server/       Node.js backend server
```

---

## Technology Stack

### Android SDK

- Kotlin
- Retrofit
- OkHttp
- Gson

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Developer Portal

- React
- Recharts

### Documentation

- Docsify
- Swagger UI

---

## Quick Start

Initialize the SDK:

```kotlin
BackupSDK.init(
    context = applicationContext,
    appId = "YOUR_APP_ID",
    apiKey = "YOUR_API_KEY",
    baseUrl = "https://backupsdk-api.onrender.com/"
)

BackupSDK.setUserId("user_001")
```

Save data:

```kotlin
BackupSDK.save(
    key = "level",
    value = "5"
)
```

Restore backup:

```kotlin
BackupSDK.restoreAll()
```

---

## Demo Application

The repository includes a demo Android application that demonstrates how to integrate BackupSDK.

The demo includes:

- SDK initialization
- Save backup
- Restore backup
- Delete backup

---

## Developer Portal

The Developer Portal allows developers to:

- Register applications
- Generate App ID and API Key
- View application statistics
- Browse user backup data
- Monitor recent backup activity

---

## Documentation

Complete SDK documentation is available at:

**https://shaharattias.github.io/BackupSDK/**
