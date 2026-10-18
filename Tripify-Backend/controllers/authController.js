const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

function signAccessToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
}

function signRefreshToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
}

// POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Only allow the two valid roles; default to explorer for anything unexpected
    const safeRole = role === "navigator" ? "navigator" : "explorer";

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: safeRole,
    });

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      success: true,
      accessToken,
      refreshToken,
      token: accessToken, // for backwards compatibility
      user: user.toSafeObject(),
    });
  } catch (err) {
    console.error("signup error:", err);
    res
      .status(500)
      .json({ success: false, message: "Signup failed. Please try again." });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      success: true,
      accessToken,
      refreshToken,
      token: accessToken, // for backwards compatibility
      user: user.toSafeObject(),
    });
  } catch (err) {
    console.error("login error:", err);
    res
      .status(500)
      .json({ success: false, message: "Login failed. Please try again." });
  }
};

// POST /api/auth/refresh
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required.",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired refresh token. Please log in again.",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({
        success: false,
        message: "Refresh token is invalid or has been revoked.",
      });
    }

    const newAccessToken = signAccessToken(user);

    return res.json({
      success: true,
      accessToken: newAccessToken,
      token: newAccessToken,
    });
  } catch (err) {
    console.error("refreshToken error:", err);
    res
      .status(500)
      .json({ success: false, message: "Could not refresh token." });
  }
};

// POST /api/auth/logout
exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      await User.findOneAndUpdate(
        { refreshToken },
        { refreshToken: null }
      );
    }

    res.json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (err) {
    console.error("logout error:", err);
    res
      .status(500)
      .json({ success: false, message: "Logout failed." });
  }
};

// GET /api/auth/me  (requires verifyToken middleware)
exports.fetchMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    res.json({ success: true, user: user.toSafeObject() });
  } catch (err) {
    console.error("fetchMe error:", err);
    res
      .status(500)
      .json({ success: false, message: "Could not load profile." });
  }
};
