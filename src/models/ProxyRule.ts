import mongoose from "mongoose";

const proxyRuleSchema = new mongoose.Schema(
  {
    loggingEnabled: { type: Boolean, default: true },
    whitelist: { type: [String], default: [] }, // e.g. ["/users", "/posts"]
  },
  { timestamps: true }
);

export default mongoose.model("ProxyRule", proxyRuleSchema);
