package com.example.backup.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "backup_items")
data class BackupItem(
    @PrimaryKey
    val key: String,
    val value: String
)