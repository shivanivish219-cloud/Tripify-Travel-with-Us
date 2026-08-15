const express = require("express");

const router = express.Router();

// Admin analytics endpoint
router.get("/", async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Admin analytics is working",
    });
  } catch (error) {
    console.error("Admin analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load admin analytics",
    });
  }
});

module.exports = router;
