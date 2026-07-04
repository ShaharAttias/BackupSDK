package com.example.backup.network

data class BackupRequest(
    val userId: String,
    val backupData: Map<String, String>
)

data class BackupResponse(
    val message: String,
    val backup: RemoteBackup?
)

data class RemoteBackup(
    val appId: String,
    val userId: String,
    val backupData: Map<String, String>
)

data class DeleteResponse(
    val message: String
)