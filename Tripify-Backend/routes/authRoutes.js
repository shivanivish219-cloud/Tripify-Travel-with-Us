const express = require("express");
const router = express.Router();

const { signup, login, fetchMe, refreshToken, logout } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);
router.get("/me", verifyToken, fetchMe);

module.exports = router;

// In your main server file (server.js / app.js), mount this with:
// const authRoutes = require("./routes/authRoutes");
// app.use("/api/auth", authRoutes);
