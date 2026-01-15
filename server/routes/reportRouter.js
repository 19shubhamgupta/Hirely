// reportRouter.js
const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

// GET /api/reports/:reportId
router.get("/:reportId", async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json({ report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
