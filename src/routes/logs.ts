const { Router } = require("express");
const requireAuth = require("../middleware/requireAuth");
const Logs = require("../models/Log");  // <- default import, model name "Logs"

const router = Router();

router.get("/", requireAuth, async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const filter: any = {};

    // filter by path if provided
    if (req.query.path) {
      filter.path = { $regex: req.query.path as string, $options: "i" };
    }

    // filter by date range if provided
    const from = req.query.from ? new Date(req.query.from as string) : null;
    const to = req.query.to ? new Date(req.query.to as string) : null;
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = from;
      if (to) filter.createdAt.$lte = to;
    }

    // get logs with pagination
    const total = await Logs.countDocuments(filter);
    const data = await Logs.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json({
      data,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ message: "Failed to fetch logs" });
  }
});

module.exports = router;
