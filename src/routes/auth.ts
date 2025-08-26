const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { signJwt } = require("../utils/jwt");

const r = Router();

/** POST /auth/login { email, password } */
r.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ message: "Email & password required" });

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = signJwt({ sub: user.id, email: user.email, role: user.role });
  res.json({ token, user: { email: user.email } });
});

/** POST /auth/seed-admin (dev only) */
r.post("/seed-admin", async (_req: any, res: any) => {
  const email = "admin@gmail.com";
  const passwordHash = await bcrypt.hash("admin123", 10);
  await User.updateOne({ email }, { email, passwordHash, role: "admin" }, { upsert: true });
  res.json({ ok: true, email, password: "admin123" });
});

module.exports = r;
