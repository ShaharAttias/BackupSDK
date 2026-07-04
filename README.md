# BackupSDK

BackupSDK is an Android SDK that enables developers to easily back up and restore application data through a secure cloud backend.

The project also includes a backend server, a developer dashboard, and a demo Android application that demonstrates the SDK integration.

---

## Features

- 📦 Easy SDK integration
- ☁️ Cloud backup and restore
- 🔐 App registration with App ID & API Key
- 📊 Developer Dashboard
- 📖 Swagger API Documentation
- 🗄 MongoDB Atlas storage
- 🌐 Cloud-hosted backend (Render)

---

## Project Architecture

```
                Android Application
                        │
                        ▼
                  BackupSDK Library
                        │
                        ▼
              REST API (Express.js)
                        │
                        ▼
                  MongoDB Atlas
                        ▲
                        │
              Developer Dashboard
                    (React)
```

---

## Repository Structure

```
BackupSDK/
│
├── app/          # Demo Android application
├── backup/       # Android SDK
├── portal/       # React developer dashboard
└── server/       # Express backend server
```

---

## Technologies

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

### Dashboard
- React
- Recharts

### Documentation
- Swagger UI

---

## Getting Started

### 1. Register your application

Create a new application using the Developer Dashboard.

You'll receive:

- App ID
- API Key

---

### 2. Initialize the SDK

```kotlin
BackupSDK.init(
    context = this,
    appId = "YOUR_APP_ID",
    apiKey = "YOUR_API_KEY",
    baseUrl = "https://backupsdk-api.onrender.com/"
)

BackupSDK.setUserId("user_001")
```

---

### 3. Save Backup

```kotlin
BackupSDK.save("level", "5")
```

---

### 4. Restore Data

```kotlin
val backup = BackupSDK.restoreAll()
```

---

## Backend API

Base URL

```
https://backupsdk-api.onrender.com
```

Swagger Documentation

```
https://backupsdk-api.onrender.com/api-docs
```

---

## Demo Application

The repository includes a demo Android application that demonstrates how developers can integrate and use the SDK.

Features demonstrated:

- SDK initialization
- Save backup
- Restore backup
- Delete backup

---

## Developer Dashboard

The dashboard allows developers to:

- Register applications
- Receive App ID & API Key
- Monitor backup statistics
- View user backup information
