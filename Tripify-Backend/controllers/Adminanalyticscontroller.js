const Booking = require("../models/Booking");
const User = require("../models/User");

const RANGE_TO_DAYS = { "7d": 7, "30d": 30, "90d": 90 };

const getRangeStart = (range) => {
  const days = RANGE_TO_DAYS[range] || 30;
  const start = new Date();
  start.setDate(start.getDate() - days);
  return start;
};

const pctChange = (curr, prev) => {
  if (!prev) return curr ? 100 : 0;
  return Number((((curr - prev) / prev) * 100).toFixed(1));
};

// GET /api/admin/kpis?range=30d
exports.getKpis = async (req, res) => {
  try {
    const range = req.query.range || "30d";
    const start = getRangeStart(range);
    const prevStart = new Date(start);
    prevStart.setDate(prevStart.getDate() - RANGE_TO_DAYS[range]);

    const [currentAgg] = await Booking.aggregate([
      { $match: { createdAt: { $gte: start }, paymentStatus: "paid" } },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$amount" },
          bookings: { $sum: 1 },
        },
      },
    ]);

    const [prevAgg] = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: prevStart, $lt: start },
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$amount" },
          bookings: { $sum: 1 },
        },
      },
    ]);

    const travelersCount = await User.countDocuments({ role: "explorer" });
    const prevTravelersCount = await User.countDocuments({
      role: "explorer",
      createdAt: { $lt: start },
    });

    res.json({
      revenue: {
        value: currentAgg?.revenue || 0,
        changePercent: pctChange(
          currentAgg?.revenue || 0,
          prevAgg?.revenue || 0,
        ),
      },
      bookings: {
        value: currentAgg?.bookings || 0,
        changePercent: pctChange(
          currentAgg?.bookings || 0,
          prevAgg?.bookings || 0,
        ),
      },
      travelers: {
        value: travelersCount,
        changePercent: pctChange(travelersCount, prevTravelersCount),
      },
      // No review/rating system yet — placeholder until one exists
      rating: { value: 0, changePercent: 0 },
    });
  } catch (err) {
    console.error("getKpis error:", err);
    res.status(500).json({ message: "Failed to load KPIs" });
  }
};

// GET /api/admin/revenue-trend?range=30d
exports.getRevenueTrend = async (req, res) => {
  try {
    const start = getRangeStart(req.query.range || "30d");

    const data = await Booking.aggregate([
      { $match: { createdAt: { $gte: start }, paymentStatus: "paid" } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, date: "$_id", revenue: 1 } },
    ]);

    res.json(data);
  } catch (err) {
    console.error("getRevenueTrend error:", err);
    res.status(500).json({ message: "Failed to load revenue trend" });
  }
};

// GET /api/admin/booking-trend?range=30d
exports.getBookingTrend = async (req, res) => {
  try {
    const start = getRangeStart(req.query.range || "30d");

    const data = await Booking.aggregate([
      { $match: { createdAt: { $gte: start } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          bookings: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, date: "$_id", bookings: 1 } },
    ]);

    res.json(data);
  } catch (err) {
    console.error("getBookingTrend error:", err);
    res.status(500).json({ message: "Failed to load booking trend" });
  }
};

// GET /api/admin/popular-packages
// There's no separate Package collection yet — this groups by the
// `destination` string stored directly on each booking.
exports.getPopularPackages = async (req, res) => {
  try {
    const data = await Booking.aggregate([
      { $match: { paymentStatus: { $ne: "cancelled" } } },
      { $group: { _id: "$destination", bookings: { $sum: 1 } } },
      { $sort: { bookings: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: "$_id",
          location: "$_id",
          bookings: 1,
        },
      },
    ]);

    res.json(data);
  } catch (err) {
    console.error("getPopularPackages error:", err);
    res.status(500).json({ message: "Failed to load popular packages" });
  }
};

// GET /api/admin/recent-bookings?limit=8
exports.getRecentBookings = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 8;

    const bookings = await Booking.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    const formatted = bookings.map((b) => ({
      id: b._id,
      travelerName: b.fullName,
      destination: b.destination,
      amount: b.amount,
      status: b.paymentStatus, // "pending" | "paid" | "cancelled"
      date: b.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("getRecentBookings error:", err);
    res.status(500).json({ message: "Failed to load recent bookings" });
  }
};
