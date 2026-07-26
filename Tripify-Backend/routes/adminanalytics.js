const express = require("express");
const router = express.Router();

const {
  getKpis,
  getRevenueTrend,
  getBookingTrend,
  getPopularPackages,
  getRecentBookings,
} = require("../controllers/adminAnalyticsController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

router.use(verifyToken, requireRole("navigator"));

router.get("/kpis", getKpis);
router.get("/revenue-trend", getRevenueTrend);
router.get("/booking-trend", getBookingTrend);
router.get("/popular-packages", getPopularPackages);
router.get("/recent-bookings", getRecentBookings);

module.exports = router;
