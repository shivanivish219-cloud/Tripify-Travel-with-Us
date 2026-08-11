const express = require("express");
const router = express.Router();

const {
  createBooking,
  fetchMyBookings,
  fetchBookingByRef,
} = require("../controllers/bookingController");
const { verifyToken } = require("../middleware/authMiddleware");

router.use(verifyToken);

router.post("/", createBooking);
router.get("/my", fetchMyBookings);
router.get("/:ref", fetchBookingByRef);

module.exports = router;
