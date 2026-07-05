# Architecture

BackupSDK is designed as a client-server solution that separates the Android application, the SDK, and the backend infrastructure.

This architecture allows developers to integrate cloud backup functionality without implementing their own backend services.

---

## High-Level Architecture

```text
Android Application
        │
        ▼
    BackupSDK
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
   REST API (HTTPS)
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

## Android Application

The Android application interacts only with BackupSDK.

The application never communicates directly with the backend server or the database.

This simplifies the integration process and keeps networking logic inside the SDK.

---

## BackupSDK

BackupSDK acts as the main entry point for developers.

It is responsible for:

- SDK initialization
- Local data management
- Sending backup requests
- Restoring backup data
- Deleting backups
- Managing user identification
- Handling communication with the backend

---

## Local StorageManager

Before synchronizing data with the server, BackupSDK stores the data locally using the StorageManager component.

This allows the SDK to maintain a local copy of the application data while keeping the cloud backup synchronized.

---

## ServerManager

ServerManager is responsible for configuring Retrofit and creating the API client.

It initializes the server connection and provides access to all backend endpoints.

The SDK initializes ServerManager only once during application startup.

---

## Retrofit

BackupSDK uses Retrofit to communicate with the backend REST API.

Retrofit converts SDK function calls into HTTP requests and automatically parses server responses.

---

## Backend Server

The backend is implemented using Node.js and Express.

Its responsibilities include:

- Authenticating applications
- Processing backup requests
- Restoring user data
- Deleting backups
- Returning backup status
- Providing application statistics

---

## MongoDB

MongoDB stores backup documents for every registered application and user.

The flexible document structure makes it suitable for storing different application data without requiring a fixed schema.

---

## Developer Dashboard

The Dashboard provides developers with a visual interface for monitoring their applications.

It allows developers to:

- View registered applications
- Monitor backup statistics
- Analyze stored backups
- Track SDK usage

---

## Design Principles

BackupSDK follows several design principles:

- Separation of concerns
- Simple SDK interface
- Client-server architecture
- REST-based communication
- Modular design
- Scalable backend

---

## What's Next?

Continue to **API Reference** to learn how each BackupSDK function works.