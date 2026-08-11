import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DestinationCard from "../components/DestinationCard";
import { fetchDestinations } from "../api/destinationsApi";
import { fallbackDestinations } from "../assets/fallbackDestinations";

const typeOptions = [
  { value: "", label: "All" },
  { value: "domestic", label: "Domestic" },
  { value: "international", label: "International" },
];

const categoryOptions = [
  { value: "", label: "Any category" },
  { value: "beach", label: "Beach" },
  { value: "hill", label: "Hill Station" },
  { value: "heritage", label: "Heritage" },
  { value: "adventure", label: "Adventure" },
  { value: "wildlife", label: "Wildlife" },
  { value: "pilgrimage", label: "Pilgrimage" },
];

export default function DestinationsPage({ onCardClick }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const type = searchParams.get("type") || "";

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const data = await fetchDestinations({
          category: category || undefined,
          type: type || undefined,
        });
        if (!cancelled) {
          setDestinations(data.destinations || []);
          setUsedFallback(false);
        }
      } catch {
        if (!cancelled) {
          // Filter the local fallback set the same way the backend would.
          const filtered = fallbackDestinations.filter(
            (d) =>
              (!category || d.category === category) &&
              (!type || d.type === type),
          );
          setDestinations(filtered);
          setUsedFallback(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [category, type]);

  function updateFilter(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 16px" }}>
      <h1 style={{ padding: "10px 0" }}>Explore Destinations</h1>

      <div
        style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}
      >
        <select
          value={type}
          onChange={(e) => updateFilter("type", e.target.value)}
          style={selectStyle}
        >
          {typeOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select
          value={category}
          onChange={(e) => updateFilter("category", e.target.value)}
          style={selectStyle}
        >
          {categoryOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {loading && <p style={{ color: "#64748b" }}>Loading destinations…</p>}

      {usedFallback && !loading && (
        <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 10 }}>
          Showing offline sample data — connect the backend for live results.
        </p>
      )}

      {!loading && destinations.length === 0 && (
        <p style={{ color: "#64748b" }}>
          No destinations match these filters yet.
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gap: 24,
        }}
      >
        {destinations.map((d) => (
          <DestinationCard
            key={d.slug || d.name}
            destination={d}
            onClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
}

const selectStyle = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "1.5px solid #e2e8f0",
  fontSize: 14,
};
