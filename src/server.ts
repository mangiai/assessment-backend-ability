require("dotenv/config");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const logRequests = require("./middleware/logRequest");

const authRoutes = require("./routes/auth");
const logsRoutes = require("./routes/logs");
const proxyRoutes = require("./routes/proxy");
const settingsRoutes = require("./routes/settings");


const PORT = Number(process.env.PORT || 4000);
const ALLOWED = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .filter(Boolean);

async function start() {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing");
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Mongo connected");

  const app = express();
  app.use(helmet());
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(
    cors({
      origin(origin, cb) {
        if (!origin) return cb(null, true);
        cb(null, ALLOWED.includes(origin));
      },
      credentials: true,
    })
  );
  app.use(logRequests());  

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.use("/auth", authRoutes); // POST /auth/login, POST /auth/seed-admin
  app.use("/logs", logsRoutes); // GET /logs (JWT required)
  app.use("/proxy", proxyRoutes); // e.g. /proxy/users, /proxy/posts
  app.use("/settings", settingsRoutes); // GET /settings, PUT /settings
  app.set("trust proxy", true);        // get real IPs when behind a proxy


  app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});
