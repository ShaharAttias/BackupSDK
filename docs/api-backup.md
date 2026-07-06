# Backup Operations

BackupSDK provides a simple API for saving, restoring, retrieving, and deleting application data.

All backup operations require the SDK to be initialized and a valid User ID to be configured.

---

# save()

Stores a key-value pair locally and synchronizes the updated backup with the BackupSDK backend.

## Syntax

```kotlin
BackupSDK.save(
    key = "theme",
    value = "dark"
)
```

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| key | String | Unique key used to identify the stored value. |
| value | String | Value associated with the specified key. |
| callback | BackupCallback? | Optional callback for success or error notifications. |

---

## Description

The SDK stores the value locally using `StorageManager`.

After the local storage is updated, the SDK synchronizes the complete dataset with the backend server using the BackupSDK REST API.

All synchronization is performed asynchronously using Kotlin Coroutines.

---

## Example

```kotlin
BackupSDK.save(
    key = "username",
    value = "Shahar"
)
```

---

## Notes

- Requires SDK initialization.
- Requires a valid User ID.
- Automatically synchronizes the updated backup with the backend.
- Save operations are synchronized internally to prevent concurrent writes.

---

# get()

Returns a locally stored value associated with the specified key.

This function reads data only from the local storage and does not communicate with the backend server.

## Syntax

```kotlin
val username = BackupSDK.get("username")
```

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| key | String | Key of the requested value. |

---

## Returns

`String?`

Returns the stored value if it exists; otherwise returns `null`.

---

## Example

```kotlin
val theme = BackupSDK.get("theme")
```

---

## Notes

- Reads data only from local storage.
- Does not perform any network request.

---

# restoreAll()

Downloads the user's backup from the backend server and restores all stored values into the local storage.

## Syntax

```kotlin
BackupSDK.restoreAll()
```

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| callback | BackupCallback? | Optional callback for success or failure notifications. |

---

## Description

The SDK requests the user's backup from the backend server.

If backup data exists, every stored key-value pair is restored into the local storage.

---

## Example

```kotlin
BackupSDK.restoreAll()
```

---

## Notes

- Requires SDK initialization.
- Requires a valid User ID.
- Restores every key-value pair stored on the backend server.

---

# deleteBackup()

Deletes the user's backup from the backend server and clears the local storage.

## Syntax

```kotlin
BackupSDK.deleteBackup()
```

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| callback | BackupCallback? | Optional callback for success or failure notifications. |

---

## Description

The SDK sends a delete request to the backend server and clears the locally stored backup data.

The result of the server operation is returned through the optional callback.

---

## Example

```kotlin
BackupSDK.deleteBackup()
```

---

## Notes

- Requires SDK initialization.
- Requires a valid User ID.
- Removes the local backup data and requests deletion of the remote backup.