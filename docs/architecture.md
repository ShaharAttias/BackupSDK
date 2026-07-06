# Architecture

BackupSDK follows a client-server architecture that separates the Android application, the SDK, and the backend infrastructure.

This layered design allows developers to integrate cloud backup functionality without implementing their own backend services.

---

## High-Level Architecture

```text
Android Application
        │
        ▼
      BackupSDK
        │
        ▼
 StorageManager (Local)
        │
        ▼
   ServerManager
        │
        ▼
 Retrofit + REST API
        │
        ▼
 Node.js / Express
        │
        ▼
     MongoDB
        │
        ▼
 Developer Portal
```

---

## Android Application

The Android application interacts only with BackupSDK.

It never communicates directly with the backend server or the database. All backup operations are handled internally by the SDK, making integration simple while hiding networking and storage complexity from the application.

---

## BackupSDK

BackupSDK serves as the main entry point for developers.

Its responsibilities include:

- SDK initialization
- Local data management
- Sending backup requests
- Restoring backup data
- Deleting backup data
- Managing user identification
- Communicating with the backend server

---

## StorageManager

Before synchronizing data with the backend, BackupSDK stores application data locally using the `StorageManager` component.

During every save operation, the SDK synchronizes the complete local dataset with the backend server, ensuring that the cloud backup remains up to date.

---

## ServerManager

`ServerManager` is responsible for configuring Retrofit, creating the API service, and managing communication with the backend server.

It is initialized once during SDK setup and reused throughout the application's lifecycle.

---

## Retrofit

BackupSDK uses Retrofit as its networking layer.

Retrofit converts SDK operations into HTTP requests and automatically parses server responses into Kotlin objects.

---

## Backend Server

The backend is implemented using Node.js and Express.

Its responsibilities include:

- Validating App ID and API Key
- Processing backup requests
- Handling backup retrieval requests
- Deleting backups
- Providing application statistics

---

## MongoDB

MongoDB stores backup documents for every registered application and user.

Its flexible document model allows BackupSDK to store different application data without requiring a predefined schema.

---

## Developer Portal

The Developer Portal provides developers with a web interface for managing registered applications and viewing backup statistics.

It allows developers to:

- Register applications
- View application statistics
- Monitor backup activity

---

## Design Principles

The architecture was designed to keep the Android application independent of the backend implementation. All communication with the server is handled internally by the SDK, allowing developers to focus only on integrating the public SDK API.

BackupSDK follows several design principles:

- Separation of Concerns
- Client-Server Architecture
- REST-based Communication
- Modular Design
- Scalable Backend
- Simple Public SDK API