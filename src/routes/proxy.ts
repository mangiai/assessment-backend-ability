const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const Log = require("../models/Log");

const target = "https://jsonplaceholder.typicode.com";
const r = Router();

r.use(
  "/",
  createProxyMiddleware({
    target,
    changeOrigin: true,
    selfHandleResponse: false,
    onProxyReq(_proxyReq, req) {
      // start timer for this request
      (req as any)._start = performance.now();
    },
    async onProxyRes(proxyRes, req) {
      const durationMs = Math.round(
        performance.now() - ((req as any)._start || performance.now())
      );

      const method = req.method || "GET";
      // keep the incoming path so your frontend can filter by "/proxy/users"
      const path = (req as any).originalUrl || req.url || "";
      const query = req.query || {};
      const ip =
        (req.headers["x-forwarded-for"] as string) ||
        req.socket.remoteAddress ||
        "";
      const status = proxyRes.statusCode ?? 0;

      try {
        await Log.create({
          method,
          path,
          query,
          ip,
          status,
          durationMs, // <-- schema field name
          // createdAt is added automatically by your schema timestamps
        });
      } catch (e) {
        console.error("log save failed:", e);
      }
    },
    // If this router is mounted at app.use("/proxy", r), forward without the /proxy prefix:
    // pathRewrite: { "^/proxy": "" },
    pathRewrite: (p) => p,
  })
);

module.exports = r;
