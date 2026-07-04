package com.example.backup.data

import android.content.Context
import com.example.backup.model.BackupItem

class StorageManager(context: Context) {

    private val database = BackupDatabase.getDatabase(context)
    private val dao = database.backupDao()

    suspend fun save(key: String, value: String) {
        val item = BackupItem(key = key, value = value)
        dao.save(item)
    }

    suspend fun get(key: String): String? {
        return dao.get(key)?.value
    }

    suspend fun getAll(): Map<String, String> {
        return dao.getAll().associate {
            it.key to it.value
        }
    }

    suspend fun deleteAll() {
        dao.deleteAll()
    }
}