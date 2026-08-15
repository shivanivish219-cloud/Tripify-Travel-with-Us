const Destination = require("../models/Destination");

// ==========================================
// GET ALL DESTINATIONS
// Supports:
// ?type=domestic
// ?type=international
// ?category=beach
// ?popular=true
// ?q=goa
// ==========================================

const getDestinations = async (req, res) => {
  try {
    const { type, category, popular, q } = req.query;

    const filter = {};

    // Filter by type
    if (type) {
      filter.type = type;
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter popular destinations
    if (popular === "true") {
      filter.isPopular = true;
    }

    // Search by destination name
    if (q) {
      filter.name = {
        $regex: q,
        $options: "i",
      };
    }

    const destinations = await Destination.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: destinations.length,
      destinations,
    });
  } catch (error) {
    console.error("Get destinations error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch destinations",
    });
  }
};

// ==========================================
// GET SINGLE DESTINATION BY SLUG
// Example:
// GET /api/destinations/goa
// ==========================================

const getDestinationBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const destination = await Destination.findOne({ slug });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    res.status(200).json({
      success: true,
      destination,
    });
  } catch (error) {
    console.error("Get destination by slug error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch destination",
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  getDestinations,
  getDestinationBySlug,
};
