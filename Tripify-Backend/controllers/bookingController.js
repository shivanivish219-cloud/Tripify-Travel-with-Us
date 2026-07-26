const Booking = require("../models/Booking");

// Rough fallback pricing if the frontend ever forgets to send `amount`
const FALLBACK_PRICE_PER_TRAVELLER = 9999;

// POST /api/bookings
// Handles BOTH flows from the frontend:
//   - BookingModal "Confirm Booking (Pay Later)" -> paymentStatus defaults to "pending"
//   - PaymentPage after simulated payment       -> sends paymentStatus: "paid" + paymentMethod
exports.createBooking = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      destination,
      packageType,
      travelDate,
      returnDate,
      numberOfTravellers,
      specialRequests,
      amount,
      paymentStatus,
      paymentMethod,
    } = req.body;

    if (!fullName || !email || !phone || !destination || !travelDate) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required booking fields.",
      });
    }

    const travellerCount =
      (numberOfTravellers?.adults || 1) + (numberOfTravellers?.children || 0);

    const booking = await Booking.create({
      user: req.user.id,
      fullName,
      email,
      phone,
      destination,
      packageType,
      travelDate,
      returnDate: returnDate || undefined,
      numberOfTravellers,
      specialRequests,
      amount: amount || travellerCount * FALLBACK_PRICE_PER_TRAVELLER,
      paymentStatus: paymentStatus === "paid" ? "paid" : "pending",
      paymentMethod: paymentStatus === "paid" ? paymentMethod || null : null,
    });

    res.status(201).json({
      success: true,
      bookingReference: booking.bookingReference,
      booking,
    });
  } catch (err) {
    console.error("createBooking error:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Could not save your booking. Please try again.",
      });
  }
};

// GET /api/bookings/my
exports.fetchMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, bookings });
  } catch (err) {
    console.error("fetchMyBookings error:", err);
    res
      .status(500)
      .json({ success: false, message: "Could not load your bookings." });
  }
};

// GET /api/bookings/:ref
exports.fetchBookingByRef = async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingReference: req.params.ref });

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found." });
    }

    // Only the booking owner or a navigator (admin) can view it
    const isOwner = booking.user.toString() === req.user.id;
    const isNavigator = req.user.role === "navigator";

    if (!isOwner && !isNavigator) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied." });
    }

    res.json({ success: true, booking });
  } catch (err) {
    console.error("fetchBookingByRef error:", err);
    res
      .status(500)
      .json({ success: false, message: "Could not load this booking." });
  }
};
