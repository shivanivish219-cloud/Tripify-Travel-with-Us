// ==============================================================================
// Tripify Intelligent Search Engine
// Supports: Multilingual, Levenshtein Distance (<= 2), Soundex/Phonetic,
// Semantic Tags, Language Detection, Did-You-Mean Suggestions & Related Places
// ==============================================================================

// Sample In-Memory Database adhering to places, place_translations, place_tags
const PLACES_DATA = [
  {
    id: "PLACE_101",
    slug: "manali",
    state: "Himachal Pradesh",
    category: "hill_station",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
    priceFrom: 13499,
    isActive: true,
    tags: ["hill_station", "snowfall", "adventure", "honeymoon", "family"],
    hotels: [
      { name: "Solang Valley Resort", pricePerNight: 4500, roomsAvailable: 8 },
      { name: "Snow Peak Retreat", pricePerNight: 3200, roomsAvailable: 4 }
    ],
    translations: {
      en: {
        name: "Manali",
        description: "Popular Himalayan resort town famous for snow-capped peaks, Solang Valley, and adventure sports.",
        keywords: ["manali", "maanale", "manalee", "manali hill station", "manali tour"]
      },
      hi: {
        name: "मनाली",
        description: "हिमाचल प्रदेश की हसीन वादियों, सोलांग वैली और बर्फबारी के लिए विश्व प्रसिद्ध पर्वतीय स्थल।",
        keywords: ["मनाली", "मनालि", "मनाली बर्फबारी", "मनाली हिल स्टेशन"]
      },
      "hi-Latn": {
        name: "Manali",
        description: "Himachal ka sabse sundar hill station jahan barf aur pahad dekhne milte hain.",
        keywords: ["maanali", "manali trip", "manali ghumne ki jagah", "snowfall wali jagah", "barf wali jagah"]
      }
    }
  },
  {
    id: "PLACE_102",
    slug: "shimla",
    state: "Himachal Pradesh",
    category: "hill_station",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80",
    priceFrom: 11999,
    isActive: true,
    tags: ["hill_station", "snowfall", "heritage", "family", "honeymoon"],
    hotels: [
      { name: "The Oberoi Cecil Shimla", pricePerNight: 8500, roomsAvailable: 5 },
      { name: "Radisson Hotel Shimla", pricePerNight: 4200, roomsAvailable: 12 }
    ],
    translations: {
      en: {
        name: "Shimla",
        description: "The Queen of Hills known for colonial architecture, Mall Road, and historic toy train.",
        keywords: ["shimla", "simla", "shimala", "shimla mall road", "queen of hills"]
      },
      hi: {
        name: "शिमला",
        description: "पहाड़ों की रानी शिमला अपने सुहावने मौसम, माल रोड और टॉय ट्रेन के लिए प्रसिद्ध।",
        keywords: ["शिमला", "शिमला हिल्स", "शिमला ट्रिप"]
      },
      "hi-Latn": {
        name: "Shimla",
        description: "Pahadon ki rani, Mall road aur thand ke mausam ke liye mashhoor jagah.",
        keywords: ["simla", "sheemla", "shimla tour", "thand wali jagah"]
      }
    }
  },
  {
    id: "PLACE_103",
    slug: "goa",
    state: "Goa",
    category: "beach",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
    priceFrom: 15999,
    isActive: true,
    tags: ["beach", "nightlife", "adventure", "honeymoon", "budget_10k"],
    hotels: [
      { name: "Taj Fort Aguada Resort", pricePerNight: 12000, roomsAvailable: 6 },
      { name: "Calangute Beach Shack Hotel", pricePerNight: 2200, roomsAvailable: 15 }
    ],
    translations: {
      en: {
        name: "Goa",
        description: "India's coastal paradise famed for golden sand beaches, nightlife, shacks, and water sports.",
        keywords: ["goa", "gova", "goaa", "goa beaches", "north goa", "south goa"]
      },
      hi: {
        name: "गोवा",
        description: "खूबसूरत समुद्र तट, जीवंत नाइटलाइफ़ और रोमांचक वॉटर स्पोर्ट्स का केंद्र।",
        keywords: ["गोवा", "गोआ", "गोवा बीच", "गोवा ट्रिप"]
      },
      "hi-Latn": {
        name: "Goa",
        description: "Beaches, parties aur water sports ke liye India ki sabse famous jagah.",
        keywords: ["gova", "goa trip", "beach wali jagah", "samundar kinare"]
      }
    }
  },
  {
    id: "PLACE_104",
    slug: "jaipur",
    state: "Rajasthan",
    category: "heritage",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80",
    priceFrom: 7999,
    isActive: true,
    tags: ["heritage", "culture", "family", "budget_10k"],
    hotels: [
      { name: "ITC Rajputana Jaipur", pricePerNight: 6500, roomsAvailable: 7 },
      { name: "Hotel Hawa Mahal Heritage", pricePerNight: 2800, roomsAvailable: 10 }
    ],
    translations: {
      en: {
        name: "Jaipur",
        description: "The Pink City rich in royal heritage, historic forts, grand palaces, and vibrant bazaars.",
        keywords: ["jaipur", "jaypur", "jaipoor", "pink city", "hawa mahal"]
      },
      hi: {
        name: "जयपुर",
        description: "गुलाबी नगर जयपुर, अपने ऐतिहासिक किलों, हवा महल और शाही विरासत के लिए विख्यात।",
        keywords: ["जयपुर", "जयपूर", "गुलाबी नगर", "जयपुर महल"]
      },
      "hi-Latn": {
        name: "Jaipur",
        description: "Pink city jahan rajputana itihaas, mahal aur qile dekhne ko milte hain.",
        keywords: ["jaypur", "jaipoor", "jaipur tour", "mahal dekhne ki jagah"]
      }
    }
  },
  {
    id: "PLACE_105",
    slug: "kerala",
    state: "Kerala",
    category: "beach",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    priceFrom: 14499,
    isActive: true,
    tags: ["beach", "nature", "honeymoon", "family", "budget_10k"],
    hotels: [
      { name: "Kumarakom Lake Resort", pricePerNight: 9500, roomsAvailable: 3 },
      { name: "Varkala Cliff Beach Stay", pricePerNight: 2400, roomsAvailable: 11 }
    ],
    translations: {
      en: {
        name: "Kerala",
        description: "God's Own Country renowned for tranquil backwaters, Ayurveda retreats, and palm-lined beaches.",
        keywords: ["kerala", "kerla", "kairala", "gods own country", "alleppey", "munnar"]
      },
      hi: {
        name: "केरल",
        description: "ईश्वर का अपना देश, शांत बैकवाटर्स, हरियाली और मनमोहक समुद्र तटों की भूमि।",
        keywords: ["केरल", "केरला", "केरल बैकवाटर्स", "केरल टूर"]
      },
      "hi-Latn": {
        name: "Kerala",
        description: "Backwaters, houseboats aur hariyali se bhari shandar jagah.",
        keywords: ["kerla", "kairala", "kerala trip", "backwaters wali jagah"]
      }
    }
  }
];

// 1. Language Detection Helper
function detectLanguage(text) {
  if (!text) return "en";
  // Check for Devanagari script (Hindi characters \u0900 to \u097F)
  if (/[\u0900-\u097F]/.test(text)) {
    return "hi";
  }
  // Check for common Hinglish / Latin Hindi patterns
  const hinglishTokens = ["wali", "wala", "jagah", "ghumne", "ke", "liye", "sundar", "pahad", "barf", "mausam"];
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);
  if (words.some((w) => hinglishTokens.includes(w))) {
    return "hi-Latn";
  }
  return "en";
}

// 2. Levenshtein Distance Algorithm (Edit distance between two strings)
function getLevenshteinDistance(a, b) {
  if (!a || !b) return (a || b).length;
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // deletion
          dp[i][j - 1],     // insertion
          dp[i - 1][j - 1]  // substitution
        );
      }
    }
  }
  return dp[m][n];
}

// 3. Soundex Algorithm for Phonetic Matching ("simla" -> "S540", "shimla" -> "S540")
function getSoundex(str) {
  if (!str) return "";
  const s = str.toUpperCase().replace(/[^A-Z]/g, "");
  if (!s) return "";

  const codes = {
    B: 1, F: 1, P: 1, V: 1,
    C: 2, G: 2, J: 2, K: 2, Q: 2, S: 2, X: 2, Z: 2,
    D: 3, T: 3,
    L: 4,
    M: 5, N: 5,
    R: 6
  };

  let soundex = s[0];
  let prevCode = codes[s[0]] || 0;

  for (let i = 1; i < s.length && soundex.length < 4; i++) {
    const code = codes[s[i]];
    if (code !== undefined) {
      if (code !== prevCode) {
        soundex += code;
        prevCode = code;
      }
    } else {
      prevCode = 0;
    }
  }

  while (soundex.length < 4) {
    soundex += "0";
  }
  return soundex;
}

// 4. Main Search Function
function searchPlaces({ q = "", lang, category } = {}) {
  const query = q.trim();
  const detectedLang = lang || detectLanguage(query);
  const normalizedQuery = query.toLowerCase();
  const querySoundex = getSoundex(normalizedQuery);

  let didYouMean = null;
  const scoredPlaces = [];

  if (!query) {
    // If no query, return active places matching category if provided
    let results = PLACES_DATA.filter((p) => p.isActive);
    if (category) {
      results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    return {
      query: "",
      detectedLang,
      didYouMean: null,
      results,
      related: [],
      categoryResults: results
    };
  }

  // Iterate over places and evaluate matches
  for (const place of PLACES_DATA) {
    if (!place.isActive) continue;

    let bestScore = 0; // Higher is better
    let matchedName = place.translations.en.name;
    let isTypo = false;

    // Check tags (e.g. "snowfall", "snowfall wali jagah", "beach")
    for (const tag of place.tags) {
      const cleanTag = tag.replace("_", " ").toLowerCase();
      if (normalizedQuery.includes(cleanTag) || cleanTag.includes(normalizedQuery)) {
        bestScore = Math.max(bestScore, 85);
      }
    }

    // Check all language translations (en, hi, hi-Latn)
    for (const [lKey, tData] of Object.entries(place.translations)) {
      const transName = tData.name.toLowerCase();

      // 1. Exact match
      if (transName === normalizedQuery) {
        bestScore = Math.max(bestScore, 100);
        matchedName = tData.name;
      }

      // 2. Starts with / Substring
      if (transName.startsWith(normalizedQuery) || transName.includes(normalizedQuery)) {
        bestScore = Math.max(bestScore, 90);
        matchedName = tData.name;
      }

      // 3. Keywords match (Exact or contains)
      for (const kw of tData.keywords) {
        const kwLower = kw.toLowerCase();
        if (kwLower === normalizedQuery) {
          bestScore = Math.max(bestScore, 95);
          matchedName = tData.name;
          // If query was a known misspelling keyword (like "maanale")
          if (normalizedQuery !== place.translations.en.name.toLowerCase()) {
            isTypo = true;
          }
        } else if (kwLower.includes(normalizedQuery) || normalizedQuery.includes(kwLower)) {
          bestScore = Math.max(bestScore, 80);
        }

        // 4. Levenshtein Distance (<= 2)
        const levDist = getLevenshteinDistance(normalizedQuery, kwLower);
        if (levDist <= 2 && normalizedQuery.length >= 3) {
          const score = 85 - levDist * 10;
          if (score > bestScore) {
            bestScore = score;
            matchedName = tData.name;
            if (levDist > 0) isTypo = true;
          }
        }

        // 5. Soundex / Phonetic Match
        if (querySoundex && querySoundex === getSoundex(kwLower)) {
          bestScore = Math.max(bestScore, 75);
          matchedName = tData.name;
          if (normalizedQuery !== kwLower) isTypo = true;
        }
      }

      // Levenshtein on translated name directly
      const nameDist = getLevenshteinDistance(normalizedQuery, transName);
      if (nameDist <= 2 && normalizedQuery.length >= 3) {
        const score = 90 - nameDist * 10;
        if (score > bestScore) {
          bestScore = score;
          matchedName = tData.name;
          if (nameDist > 0) isTypo = true;
        }
      }
    }

    if (bestScore > 50) {
      scoredPlaces.push({
        place,
        score: bestScore,
        matchedName,
        isTypo
      });
    }
  }

  // Sort by score descending
  scoredPlaces.sort((a, b) => b.score - a.score);

  // Filter by category if requested
  let results = scoredPlaces.map((s) => s.place);
  if (category) {
    results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  // Identify "Did you mean [Name]?"
  if (scoredPlaces.length > 0 && scoredPlaces[0].isTypo) {
    const topMatch = scoredPlaces[0].place;
    const standardName = topMatch.translations.en.name;
    if (standardName.toLowerCase() !== normalizedQuery) {
      didYouMean = standardName;
    }
  }

  // Get Related Results (same category or shared tags)
  let related = [];
  if (results.length > 0) {
    const primary = results[0];
    related = PLACES_DATA.filter((p) => p.id !== primary.id && p.category === primary.category);
  }

  // Get Category Results
  const matchedCategory = results[0]?.category || category;
  const categoryResults = matchedCategory
    ? PLACES_DATA.filter((p) => p.category === matchedCategory)
    : [];

  return {
    query,
    detectedLang,
    didYouMean,
    count: results.length,
    results,
    related,
    categoryResults
  };
}

module.exports = {
  searchPlaces,
  detectLanguage,
  getLevenshteinDistance,
  getSoundex,
  PLACES_DATA
};

