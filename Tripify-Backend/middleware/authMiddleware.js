const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Reads "Authorization: Bearer <token>", verifies it, attaches { id, role } to req.user
exports.verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided." });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};

// Usage: router.use(verifyToken, requireRole("producer"))
exports.requireRole = (role) => (req, res, next) => {
  if (req.user?.role !== role) {
    return res
      .status(403)
      .json({
        success: false,
        message: "You don't have access to this resource.",
      });
  }
  next();
};
