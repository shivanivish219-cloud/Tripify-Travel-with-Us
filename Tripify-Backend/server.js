const dns = require("dns");

// MongoDB Atlas SRV/DNS resolution
dns.setServers(["8.8.8.8"]);
dns.setDefaultResultOrder("ipv4first");

// Load environment variables FIRST
require("dotenv").config();

// Validate required environment variables
const validateEnvironment = require("./config/envValidator");
validateEnvironment();

const express = require("express");
const cors = require("cors");

// Database
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminAnalyticsRoutes = require("./routes/adminAnalytics");

// Rate limiter
const { generalLimiter } = require("./middleware/rateLimiter");

const app = express();

// ===============================
// Database Connection
// ===============================

connectDB();

// ===============================
// Global Middleware
// ===============================

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://tripifyjourney.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// Parse JSON request bodies
app.use(express.json());

// General API rate limiter
app.use("/api/", generalLimiter);

// ===============================
// Health Check
// ===============================

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

// ===============================
// API Routes
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/admin", adminAnalyticsRoutes);

// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
