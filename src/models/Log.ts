const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    method: String,
    path: String,
    query: Object,
    ip: String,
    status: Number,
    durationMs: Number,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

LogSchema.index({ createdAt: -1 });
LogSchema.index({ path: 1, method: 1, status: 1 });

module.exports = mongoose.model("Log", LogSchema);
