// models/Settings.ts
const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  loggingEnabled: { type: Boolean, default: true },
  whitelistPaths: { type: [String], default: [] },
});

const Settings = mongoose.model("Settings", SettingsSchema);
module.exports = { Settings };
