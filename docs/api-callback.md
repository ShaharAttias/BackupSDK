# BackupCallback

BackupSDK uses the `BackupCallback` interface to notify the application when an asynchronous operation completes.

The callback can be supplied to operations such as `save()`, `restoreAll()`, and `deleteBackup()`.

All callback methods are invoked on the Android main thread, making it safe to update the user interface.

---

# Interface

```kotlin
interface BackupCallback {

    fun onSuccess(message: String)

    fun onError(error: String)

}
```

---

# onSuccess()

Called when the requested operation completes successfully.

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| message | String | Success message returned by the SDK. |

---

## Example

```kotlin
BackupSDK.save(
    key = "theme",
    value = "dark",
    callback = object : BackupSDK.BackupCallback {

        override fun onSuccess(message: String) {
            Log.d("Backup", message)
        }

        override fun onError(error: String) {
            Log.e("Backup", error)
        }

    }
)
```

---

# onError()

Called when an operation cannot be completed successfully.

The callback provides an error message describing the reason for the failure.

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| error | String | Description of the error. |

---

## Possible Error Scenarios

The callback may report errors in situations such as:

- SDK has not been initialized.
- User ID has not been set.
- App ID is missing.
- API Key is missing.
- No backup data was found.
- Server is unavailable.
- Network request failed.
- Backup operation failed.

---

## Best Practices

- Always implement both callback methods.
- Display meaningful error messages to the user when appropriate.
- Log errors during development to simplify debugging.