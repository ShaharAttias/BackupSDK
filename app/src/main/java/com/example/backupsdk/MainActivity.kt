package com.example.backupsdk

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.backup.sdk.BackupSDK
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {

    private val appId = "test-game"
    private val userId = "user_001"

    private lateinit var txtConnection: TextView
    private lateinit var txtAppId: TextView
    private lateinit var txtUserId: TextView
    private lateinit var txtStatus: TextView
    private lateinit var txtLevel: TextView
    private lateinit var txtCoins: TextView

    private lateinit var btnSave: Button
    private lateinit var btnRestore: Button
    private lateinit var btnDelete: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        bindViews()
        setupSdk()
        setupUi()
        setupButtons()
    }

    private fun bindViews() {
        txtConnection = findViewById(R.id.txtConnection)
        txtAppId = findViewById(R.id.txtAppId)
        txtUserId = findViewById(R.id.txtUserId)
        txtStatus = findViewById(R.id.txtStatus)
        txtLevel = findViewById(R.id.txtLevel)
        txtCoins = findViewById(R.id.txtCoins)

        btnSave = findViewById(R.id.btnSave)
        btnRestore = findViewById(R.id.btnRestore)
        btnDelete = findViewById(R.id.btnDelete)
    }

    private fun setupSdk() {
        BackupSDK.init(
            context = this,
            appId = appId,
            apiKey = "02f7640d355bc0a2d6d2f19ccb011e62088872a2bb474ffe0f62e247c96e7f67",
            baseUrl = "http://10.0.2.2:3000/"
        )

        BackupSDK.setUserId(userId)
    }

    private fun setupUi() {
        txtConnection.text = "Server Status: Connected"
        txtAppId.text = "App ID: $appId"
        txtUserId.text = "User ID: $userId"
        txtStatus.text = "Waiting for action..."
        txtLevel.text = "Level: -"
        txtCoins.text = "Coins: -"
    }

    private fun setupButtons() {
        btnSave.setOnClickListener {
            saveBackup()
        }

        btnRestore.setOnClickListener {
            restoreBackup()
        }

        btnDelete.setOnClickListener {
            deleteBackup()
        }
    }

    private fun saveBackup() {
        txtStatus.text = "Saving backup..."

        BackupSDK.save("level", "5", object : BackupSDK.BackupCallback {
            override fun onSuccess(message: String) {
                BackupSDK.save("coins", "1200", object : BackupSDK.BackupCallback {
                    override fun onSuccess(message: String) {
                        txtStatus.text = "Backup saved successfully"
                        txtConnection.text = "Server Status: Connected"
                    }

                    override fun onError(error: String) {
                        txtStatus.text = "Coins save failed: $error"
                        txtConnection.text = "Server Status: Error"
                    }
                })
            }

            override fun onError(error: String) {
                txtStatus.text = "Level save failed: $error"
                txtConnection.text = "Server Status: Error"
            }
        })
    }

    private fun restoreBackup() {
        txtStatus.text = "Restoring backup..."

        BackupSDK.restoreAll(object : BackupSDK.BackupCallback {
            override fun onSuccess(message: String) {
                txtStatus.text = "Restore completed successfully"
                txtConnection.text = "Server Status: Connected"

                CoroutineScope(Dispatchers.Main).launch {
                    val level = BackupSDK.get("level")
                    val coins = BackupSDK.get("coins")

                    txtLevel.text = "Level: ${level ?: "-"}"
                    txtCoins.text = "Coins: ${coins ?: "-"}"
                }
            }

            override fun onError(error: String) {
                txtStatus.text = "Restore failed: $error"
                txtConnection.text = "Server Status: Error"
            }
        })
    }

    private fun deleteBackup() {
        txtStatus.text = "Deleting backup..."

        BackupSDK.deleteBackup(object : BackupSDK.BackupCallback {
            override fun onSuccess(message: String) {
                txtStatus.text = "Backup deleted successfully"
                txtConnection.text = "Server Status: Connected"
                txtLevel.text = "Level: -"
                txtCoins.text = "Coins: -"
            }

            override fun onError(error: String) {
                txtStatus.text = "Delete failed: $error"
                txtConnection.text = "Server Status: Error"
            }
        })
    }
}