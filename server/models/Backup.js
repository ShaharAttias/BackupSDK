const mongoose = require("mongoose");

const backupSchema = new mongoose.Schema(
  {
    appId: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    backupData: {
      type: Object,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

backupSchema.index({ appId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Backup", backupSchema);