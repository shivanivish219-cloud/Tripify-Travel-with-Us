import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { searchPlacesApi } from "../api/searchApi";

// Offline fallback dataset for Fuse.js
const LOCAL_SEARCH_DATA = [
  {
    id: "PLACE_101",
    slug: "manali",
    name: "Manali",
    nameHi: "मनाली",
    nameHiLatn: "Manali",
    state: "Himachal Pradesh",
    category: "hill_station",
    categoryLabel: "Hill Station",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
    priceFrom: 13499,
    tags: ["hill_station", "snowfall", "adventure", "honeymoon", "family"],
    keywords: ["manali", "maanale", "manalee", "manali hill station", "मनाली", "snowfall wali jagah", "barf wali jagah"],
    description: "Popular Himalayan resort town famous for snow-capped peaks and Solang Valley."
  },
  {
    id: "PLACE_102",
    slug: "shimla",
    name: "Shimla",
    nameHi: "शिमला",
    nameHiLatn: "Shimla",
    state: "Himachal Pradesh",
    category: "hill_station",
    categoryLabel: "Hill Station",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80",
    priceFrom: 11999,
    tags: ["hill_station", "snowfall", "heritage", "family", "honeymoon"],
    keywords: ["shimla", "simla", "shimala", "queen of hills", "शिमला", "thand wali jagah"],
    description: "The Queen of Hills known for colonial architecture and Mall Road."
  },
  {
    id: "PLACE_103",
    slug: "goa",
    name: "Goa",
    nameHi: "गोवा",
    nameHiLatn: "Goa",
    state: "Goa",
    category: "beach",
    categoryLabel: "Beach",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
    priceFrom: 15999,
    tags: ["beach", "nightlife", "adventure", "honeymoon", "budget_10k"],
    keywords: ["goa", "gova", "goaa", "goa beaches", "गोवा", "beach wali jagah", "samundar kinare"],
    description: "India's coastal paradise famed for beaches, nightlife, and water sports."
  },
  {
    id: "PLACE_104",
    slug: "jaipur",
    name: "Jaipur",
    nameHi: "जयपुर",
    nameHiLatn: "Jaipur",
    state: "Rajasthan",
    category: "heritage",
    categoryLabel: "Heritage",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80",
    priceFrom: 7999,
    tags: ["heritage", "culture", "family", "budget_10k"],
    keywords: ["jaipur", "jaypur", "jaipoor", "pink city", "जयपुर", "hawa mahal"],
    description: "The Pink City rich in royal heritage, historic forts, and palaces."
  },
  {
    id: "PLACE_105",
    slug: "kerala",
    name: "Kerala",
    nameHi: "केरल",
    nameHiLatn: "Kerala",
    state: "Kerala",
    category: "beach",
    categoryLabel: "Beach",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    priceFrom: 14499,
    tags: ["beach", "nature", "honeymoon", "family", "budget_10k"],
    keywords: ["kerala", "kerla", "kairala", "gods own country", "केरल", "backwaters wali jagah"],
    description: "God's Own Country with serene backwaters, palm-fringed beaches, and greenery."
  }
];

const categoryBadgeStyles = {
  hill_station: { bg: "#e0f2fe", color: "#0369a1", label: "🏔️ Hill Station" },
  beach: { bg: "#fef3c7", color: "#b45309", label: "🏖️ Beach" },
  heritage: { bg: "#fce7f3", color: "#be185d", label: "🏛️ Heritage" },
  adventure: { bg: "#dcfce7", color: "#15803d", label: "🏕️ Adventure" }
};

export default function SearchBox({ onSelectDestination, placeholder = "Search destinations (e.g. maanale, simla, snowfall wali jagah...)" }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [related, setRelated] = useState([]);
  const [didYouMean, setDidYouMean] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Initialize Fuse.js for client-side fallback
  const fuse = useMemo(() => {
    return new Fuse(LOCAL_SEARCH_DATA, {
      keys: [
        { name: "name", weight: 0.4 },
        { name: "nameHi", weight: 0.3 },
        { name: "keywords", weight: 0.4 },
        { name: "tags", weight: 0.2 },
        { name: "category", weight: 0.2 }
      ],
      threshold: 0.4, // typo tolerance
      distance: 100,
      minMatchCharLength: 2,
      includeScore: true
    });
  }, []);

  // Debounced search (300ms)
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setRelated([]);
      setDidYouMean(null);
      setIsOpen(false);
      return;
    }

    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        // 1. Try Backend API first
        const data = await searchPlacesApi({ q: trimmed });
        if (data.success) {
          setResults(data.results || []);
          setRelated(data.related || []);
          setDidYouMean(data.didYouMean || null);
          setIsOpen(true);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Backend search unavailable, falling back to Fuse.js:", err.message);
      }

      // 2. Client-side Fuse.js Fallback
      const fuseResults = fuse.search(trimmed);
      const matchedPlaces = fuseResults.map((r) => r.item);
      setResults(matchedPlaces);

      // Simple did-you-mean heuristic for fallback
      if (matchedPlaces.length > 0 && matchedPlaces[0].name.toLowerCase() !== trimmed.toLowerCase()) {
        setDidYouMean(matchedPlaces[0].name);
      } else {
        setDidYouMean(null);
      }

      // Related places fallback (same category)
      if (matchedPlaces.length > 0) {
        const primaryCat = matchedPlaces[0].category;
        setRelated(LOCAL_SEARCH_DATA.filter((p) => p.id !== matchedPlaces[0].id && p.category === primaryCat));
      } else {
        setRelated([]);
      }

      setIsOpen(true);
      setLoading(false); 
    }, 300);

    return () => clearTimeout(debounceTimerRef.current);
  }, [query, fuse]);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (place) => {
    const slug = place.slug || (place.translations?.en?.name || place.name).toLowerCase();
    navigate(`/destinations/${slug}`);
    setQuery("");
    setResults([]);
    setIsOpen(false);
    onSelectDestination?.(slug, place);
  };

  const handleAcceptSuggestion = (suggestedName) => {
    setQuery(suggestedName);
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%", maxWidth: 540 }}>
      {/* Search Input Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ffffff",
          border: "1.5px solid #cbd5e1",
          borderRadius: 24,
          padding: "8px 16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          transition: "all 0.2s ease"
        }}
      >
        <span style={{ color: "#64748b", marginRight: 10, fontSize: 16 }}>🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            fontSize: 14,
            color: "#1e293b",
            background: "transparent"
          }}
        />
        {loading && (
          <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: 8 }}>⏳</span>
        )}
        {query && (
          <button
            onClick={() => setQuery("")}
            style={{
              background: "transparent",
              border: "none",
              color: "#94a3b8",
              cursor: "pointer",
              fontSize: 16,
              marginLeft: 6
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: 8,
            backgroundColor: "#ffffff",
            borderRadius: 14,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e2e8f0",
            maxHeight: 450,
            overflowY: "auto",
            zIndex: 1000
          }}
        >
          {/* Typo Correction Banner ("Did you mean...") */}
          {didYouMean && (
            <div
              style={{
                padding: "10px 16px",
                background: "#f0fdf4",
                borderBottom: "1px solid #bbf7d0",
                fontSize: 13,
                color: "#166534",
                display: "flex",
                alignItems: "center",
                gap: 8
              }}
            >
              <span>Did you mean</span>
              <button
                onClick={() => handleAcceptSuggestion(didYouMean)}
                style={{
                  background: "#dcfce7",
                  border: "1px solid #86efac",
                  borderRadius: 12,
                  padding: "2px 10px",
                  fontWeight: 700,
                  color: "#15803d",
                  cursor: "pointer",
                  fontSize: 13
                }}
              >
                "{didYouMean}" ?
              </button>
            </div>
          )}

          {/* Results List */}
          {results.length === 0 ? (
            <div style={{ padding: "20px 16px", textAlign: "center", color: "#64748b", fontSize: 14 }}>
              No destinations matching "{query}". Try "Manali", "Goa", or "snowfall".
            </div>
          ) : (
            <div>
              <div style={{ padding: "8px 16px 4px", fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>
                Matching Destinations
              </div>
              {results.map((place) => {
                const enName = place.translations?.en?.name || place.name;
                const hiName = place.translations?.hi?.name || place.nameHi;
                const badge = categoryBadgeStyles[place.category] || { bg: "#f1f5f9", color: "#475569", label: place.category };

                return (
                  <div
                    key={place.id || place.slug}
                    onClick={() => handleSelect(place)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 16px",
                      cursor: "pointer",
                      borderBottom: "1px solid #f1f5f9",
                      transition: "background-color 0.15s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <img
                      src={place.image || place.imageUrl}
                      alt={enName}
                      style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {/* English + Hindi Multilingual Display */}
                        <span style={{ fontWeight: 600, fontSize: 15, color: "#0f172a" }}>
                          {enName}
                        </span>
                        {hiName && (
                          <span style={{ fontSize: 13, color: "#64748b" }}>
                            ({hiName})
                          </span>
                        )}
                        {/* Category Badge */}
                        <span
                          style={{
                            background: badge.bg,
                            color: badge.color,
                            padding: "2px 8px",
                            borderRadius: 10,
                            fontSize: 11,
                            fontWeight: 600
                          }}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                        {place.state} • ⭐ {place.rating} • ₹{place.priceFrom?.toLocaleString("en-IN")} onwards
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Related Destinations Section */}
          {related.length > 0 && (
            <div style={{ borderTop: "1.5px solid #e2e8f0", backgroundColor: "#fafafa" }}>
              <div style={{ padding: "8px 16px 4px", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                Related Destinations ({related[0]?.category?.replace("_", " ")})
              </div>
              {related.slice(0, 3).map((place) => {
                const enName = place.translations?.en?.name || place.name;
                const hiName = place.translations?.hi?.name || place.nameHi;
                return (
                  <div
                    key={"rel-" + (place.id || place.slug)}
                    onClick={() => handleSelect(place)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 16px",
                      cursor: "pointer",
                      fontSize: 13
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <span style={{ color: "#2563eb" }}>📍</span>
                    <span style={{ fontWeight: 500, color: "#1e293b" }}>{enName}</span>
                    {hiName && <span style={{ color: "#94a3b8", fontSize: 12 }}>({hiName})</span>}
                    <span style={{ marginLeft: "auto", fontSize: 12, color: "#64748b" }}>⭐ {place.rating}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

