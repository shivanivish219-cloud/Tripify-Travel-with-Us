const Destination = require("../models/Destination");
const { searchPlaces } = require("../services/searchService");

// ==============================================================================
// GET /api/search?q=maanale&lang=hi&category=hill_station
// ==============================================================================
const search = async (req, res) => {
  try {
    const { q = "", lang, category } = req.query;

    const filter = {};
    if (category) {
      filter.category = category;
    }

    if (q && q.trim()) {
      const regex = { $regex: q.trim(), $options: "i" };
      filter.$or = [
        { name: regex },
        { hindiName: regex },
        { keywords: regex },
        { tags: regex },
      ];
    }

    // Query MongoDB Atlas Destinations collection
    const destinations = await Destination.find(filter).sort({ isPopular: -1, priceFrom: 1 });

    // Also run fuzzy analysis to detect typos & "did you mean"
    const fuzzyOutput = searchPlaces({ q, lang, category });

    return res.status(200).json({
      success: true,
      query: q,
      didYouMean: fuzzyOutput.didYouMean,
      detectedLang: fuzzyOutput.detectedLang,
      count: destinations.length,
      destinations,
      results: destinations.length > 0 ? destinations : fuzzyOutput.results,
      related: fuzzyOutput.related,
      categoryResults: fuzzyOutput.categoryResults,
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
