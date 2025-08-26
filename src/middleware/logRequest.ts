const Log = require("../models/Log");

function logRequests() {
  return (req: any, res: any, next: any) => {
    const start = Date.now();

    res.on("finish", async () => {
      try {
        await Log.create({
          method: req.method,
          path: req.originalUrl || req.url || req.path,
          query: req.query,
          ip:
            (req.headers["x-forwarded-for"] as string) ||
            req.ip ||
            req.socket.remoteAddress ||
            "",
          status: res.statusCode,
          durationMs: Date.now() - start,
        });
      } catch (err) {
        console.error("Failed to save log:", err);
      }
    });

    next();
  };
}

module.exports = logRequests;
