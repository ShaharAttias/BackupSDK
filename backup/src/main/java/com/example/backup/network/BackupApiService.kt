package com.example.backup.network

import retrofit2.Response
import retrofit2.http.*

interface BackupApiService {

    @POST("api/backup")
    suspend fun saveBackup(
        @Header("x-app-id") appId: String,
        @Header("x-api-key") apiKey: String,
        @Body request: BackupRequest
    ): Response<BackupResponse>

    @GET("api/backup/{userId}")
    suspend fun getBackup(
        @Header("x-app-id") appId: String,
        @Header("x-api-key") apiKey: String,
        @Path("userId") userId: String
    ): Response<BackupResponse>

    @DELETE("api/backup/{userId}")
    suspend fun deleteBackup(
        @Header("x-app-id") appId: String,
        @Header("x-api-key") apiKey: String,
        @Path("userId") userId: String
    ): Response<DeleteResponse>
}