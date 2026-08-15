const Destination = require("../models/Destination");

const getDestinations = async (req, res) => {
  try {
    const { type, category, popular, q } = req.query;

    const filter = {};

    // Domestic / International filter
    if (type) {
      filter.type = type;
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Popular filter
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

module.exports = {
  getDestinations,
};
