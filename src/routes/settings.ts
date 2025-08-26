const { Router } = require("express");
const requireAuth = require("../middleware/requireAuth"); // same one you used for /logs
const { Settings } = require("../models/Settings");

const router = Router();

// helper to ensure a settings doc exists
async function ensureSettings() {
  let doc = await Settings.findOne();
  if (!doc) doc = await Settings.create({});
  return doc;
}

// GET /settings  (JWT required)
router.get("/", requireAuth, async (_req: any, res: any, next: any) => {
  try {
    const doc = await ensureSettings();
    res.json(doc);
  } catch (e) { next(e); }
});

// PUT /settings  (JWT required)
router.put("/", requireAuth, async (req: any, res: any, next: any) => {
  try {
    const { loggingEnabled, whitelistPaths } = req.body ?? {};
    const doc = await ensureSettings();
    if (typeof loggingEnabled === "boolean") doc.loggingEnabled = loggingEnabled;
    if (Array.isArray(whitelistPaths)) doc.whitelistPaths = whitelistPaths;
    await doc.save();
    res.json(doc);
  } catch (e) { next(e); }
});

module.exports = router;
