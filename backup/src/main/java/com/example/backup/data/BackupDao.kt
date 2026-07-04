package com.example.backup.data

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.backup.model.BackupItem

@Dao
interface BackupDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun save(item: BackupItem)

    @Query("SELECT * FROM backup_items WHERE `key` = :key")
    suspend fun get(key: String): BackupItem?

    @Query("SELECT * FROM backup_items")
    suspend fun getAll(): List<BackupItem>

    @Query("DELETE FROM backup_items")
    suspend fun deleteAll()
}