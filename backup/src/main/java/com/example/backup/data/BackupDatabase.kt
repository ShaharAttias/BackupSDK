package com.example.backup.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.example.backup.model.BackupItem

@Database(
    entities = [BackupItem::class],
    version = 1
)
abstract class BackupDatabase : RoomDatabase() {

    abstract fun backupDao(): BackupDao

    companion object {
        @Volatile
        private var INSTANCE: BackupDatabase? = null

        fun getDatabase(context: Context): BackupDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    BackupDatabase::class.java,
                    "backup_database"
                ).build()

                INSTANCE = instance
                instance
            }
        }
    }
}