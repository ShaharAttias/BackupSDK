package com.example.backup.sdk

import android.content.Context
import android.util.Log
import com.example.backup.data.StorageManager
import com.example.backup.network.BackupRequest
import com.example.backup.network.ServerManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.coroutines.withContext

object BackupSDK {

    interface BackupCallback {
        fun onSuccess(message: String)
        fun onError(error: String)
    }

    private var storageManager: StorageManager? = null
    private var appId: String? = null
    private var apiKey: String? = null
    private var userId: String? = null

    private val saveMutex = Mutex()

    fun init(
        context: Context,
        appId: String,
        apiKey: String,
        baseUrl: String
    ) {
        this.appId = appId
        this.apiKey = apiKey
        storageManager = StorageManager(context)
        ServerManager.init(baseUrl)
    }

    fun setUserId(userId: String) {
        this.userId = userId
    }

    fun save(key: String, value: String, callback: BackupCallback? = null) {
        CoroutineScope(Dispatchers.IO).launch {
            saveMutex.withLock {
                try {
                    val currentStorage = storageManager
                        ?: throw IllegalStateException("BackupSDK is not initialized")

                    val currentUserId = userId
                        ?: throw IllegalStateException("User ID is not set")

                    val currentAppId = appId
                        ?: throw IllegalStateException("App ID is missing")

                    val currentApiKey = apiKey
                        ?: throw IllegalStateException("API key is missing")

                    currentStorage.save(key, value)
                    val allData = currentStorage.getAll()

                    Log.d(
                        "BackupSDK_NETWORK",
                        "Sending to server: appId=$currentAppId userId=$currentUserId data=$allData"
                    )

                    val response = ServerManager.api.saveBackup(
                        appId = currentAppId,
                        apiKey = currentApiKey,
                        request = BackupRequest(
                            userId = currentUserId,
                            backupData = allData
                        )
                    )

                    Log.d("BackupSDK_NETWORK", "Response code: ${response.code()}")
                    Log.d("BackupSDK_NETWORK", "Response body: ${response.body()}")

                    withContext(Dispatchers.Main) {
                        if (response.isSuccessful) {
                            callback?.onSuccess("Backup saved successfully")
                        } else {
                            callback?.onError("Save failed: ${response.code()}")
                        }
                    }

                } catch (e: Exception) {
                    Log.e("BackupSDK_NETWORK", "Save error", e)

                    withContext(Dispatchers.Main) {
                        callback?.onError(e.message ?: "Unknown save error")
                    }
                }
            }
        }
    }

    suspend fun get(key: String): String? {
        return withContext(Dispatchers.IO) {
            storageManager?.get(key)
        }
    }

    fun restoreAll(callback: BackupCallback? = null) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val currentStorage = storageManager
                    ?: throw IllegalStateException("BackupSDK is not initialized")

                val currentUserId = userId
                    ?: throw IllegalStateException("User ID is not set")

                val currentAppId = appId
                    ?: throw IllegalStateException("App ID is missing")

                val currentApiKey = apiKey
                    ?: throw IllegalStateException("API key is missing")

                val response = ServerManager.api.getBackup(
                    appId = currentAppId,
                    apiKey = currentApiKey,
                    userId = currentUserId
                )

                if (response.isSuccessful) {
                    val remoteData = response.body()
                        ?.backup
                        ?.backupData

                    if (remoteData != null) {
                        remoteData.forEach { (key, value) ->
                            currentStorage.save(key, value)
                        }

                        Log.d("BackupSDK_RESTORE", "Restore completed: $remoteData")

                        withContext(Dispatchers.Main) {
                            callback?.onSuccess("Restore completed successfully")
                        }
                    } else {
                        Log.d("BackupSDK_RESTORE", "No backup data found")

                        withContext(Dispatchers.Main) {
                            callback?.onError("No backup data found")
                        }
                    }
                } else {
                    Log.e("BackupSDK_RESTORE", "Restore failed: ${response.code()}")

                    withContext(Dispatchers.Main) {
                        callback?.onError("Restore failed: ${response.code()}")
                    }
                }

            } catch (e: Exception) {
                Log.e("BackupSDK_RESTORE", "Restore error", e)

                withContext(Dispatchers.Main) {
                    callback?.onError(e.message ?: "Unknown restore error")
                }
            }
        }
    }

    fun deleteBackup(callback: BackupCallback? = null) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val currentStorage = storageManager
                    ?: throw IllegalStateException("BackupSDK is not initialized")

                val currentUserId = userId
                    ?: throw IllegalStateException("User ID is not set")

                val currentAppId = appId
                    ?: throw IllegalStateException("App ID is missing")

                val currentApiKey = apiKey
                    ?: throw IllegalStateException("API key is missing")

                val response = ServerManager.api.deleteBackup(
                    appId = currentAppId,
                    apiKey = currentApiKey,
                    userId = currentUserId
                )

                currentStorage.deleteAll()

                withContext(Dispatchers.Main) {
                    if (response.isSuccessful) {
                        callback?.onSuccess("Backup deleted successfully")
                    } else {
                        callback?.onError("Delete failed: ${response.code()}")
                    }
                }

            } catch (e: Exception) {
                Log.e("BackupSDK_DELETE", "Delete backup error", e)

                withContext(Dispatchers.Main) {
                    callback?.onError(e.message ?: "Unknown delete error")
                }
            }
        }
    }
}