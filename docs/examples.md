# Usage Examples

This page demonstrates practical BackupSDK integration scenarios.

Unlike the API Reference, these examples show how BackupSDK can be used in real application flows.

---

## Example 1 — Save User Preferences

An application can save user settings such as theme, language, and notification preferences.

```kotlin
BackupSDK.setUserId("user123")

BackupSDK.save("theme", "dark")
BackupSDK.save("language", "English")
BackupSDK.save("notifications", "enabled")
```

---

## Example 2 — Restore User Preferences

After reinstalling the app or switching devices, the application can restore the user's saved data.

```kotlin
BackupSDK.setUserId("user123")

BackupSDK.restoreAll(
    callback = object : BackupSDK.BackupCallback {
        override fun onSuccess(message: String) {
            Log.d("Backup", message)
        }

        override fun onError(error: String) {
            Log.e("Backup", error)
        }
    }
)

val theme = BackupSDK.get("theme")
val language = BackupSDK.get("language")
val notifications = BackupSDK.get("notifications")
```

---

## Example 3 — Save Game Progress

A game can save progress data so players can continue from the same point later.

```kotlin
BackupSDK.setUserId("player42")

BackupSDK.save("level", "15")
BackupSDK.save("coins", "5400")
BackupSDK.save("lives", "3")
BackupSDK.save("lastCheckpoint", "forest_stage_2")
```

---

## Example 4 — Shopping Application Data

A shopping application can preserve user-specific data such as cart items, favorites, and delivery preferences.

```kotlin
BackupSDK.setUserId("user789")

BackupSDK.save("favoriteProduct", "Running Shoes")
BackupSDK.save("cartItemCount", "3")
BackupSDK.save("deliveryCity", "Tel Aviv")
BackupSDK.save("preferredPayment", "Credit Card")
```

---

## Example 5 — Delete User Backup

When a user logs out, deletes an account, or requests data removal, the application can delete the saved backup.

```kotlin
BackupSDK.setUserId("user123")

BackupSDK.deleteBackup(
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

## Notes

- BackupSDK should be initialized once before using these examples.
- A User ID must be set before saving, restoring, or deleting backup data.
- Values are stored as strings, so complex objects should be converted to strings before saving.