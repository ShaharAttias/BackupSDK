# API Reference

The BackupSDK API provides a simple and consistent interface for integrating cloud backup functionality into Android applications.

The SDK exposes a small set of public methods that handle initialization, data synchronization, restoration, and backup management while hiding the networking and storage implementation from the application.

---

## Initialization

Before using any BackupSDK operation, initialize the SDK with your application credentials and backend server URL.

Initialization prepares the SDK, configures the networking layer, and creates the local storage manager.

---

## User Management

Before performing backup operations, set the current user identifier.

The User ID associates backup data with a specific application user and is required for save, restore, and delete operations.

---

## Backup Operations

BackupSDK provides methods for managing application data in the cloud.

The available operations include:

- Save key-value data
- Restore all backup data
- Delete backup data
- Read locally stored values

All cloud operations communicate with the backend server through the BackupSDK REST API.

---

## Callback

Backup operations execute asynchronously.

Applications can implement the `BackupCallback` interface to receive notifications when an operation completes successfully or when an error occurs.

Callbacks allow the application to update the user interface without blocking the main thread.

---

## API Workflow

A typical BackupSDK workflow consists of the following steps:

1. Initialize the SDK.
2. Set the current user.
3. Save application data.
4. Restore data when needed.
5. Read restored values if required.
6. Handle operation results through callbacks.

---

## Public API

BackupSDK exposes the following public methods:

| Method | Description |
|---------|-------------|
| `init()` | Initializes the SDK. |
| `setUserId()` | Sets the current user identifier. |
| `save()` | Saves data locally and synchronizes it with the backend. |
| `get()` | Retrieves a locally stored value. |
| `restoreAll()` | Restores backup data from the server. |
| `deleteBackup()` | Deletes the backup from both the server and local storage. |