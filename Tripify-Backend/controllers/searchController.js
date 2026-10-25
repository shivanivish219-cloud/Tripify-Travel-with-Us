const { searchPlaces } = require("../services/searchService");

// ==============================================================================
// GET /api/search?q=maanale&lang=hi&category=hill_station
// ==============================================================================
const search = async (req, res) => {
  try {
    const { q = "", lang, category } = req.query;

    const searchOutput = searchPlaces({ q, lang, category });

    return res.status(200).json({
      success: true,
      ...searchOutput,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the search request.",
    });
  }
};

module.exports = {
  search,
};

