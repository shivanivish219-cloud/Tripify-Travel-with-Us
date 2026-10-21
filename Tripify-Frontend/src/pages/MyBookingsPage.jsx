import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMyBookings } from "../api/bookingsApi";
import axiosClient, { setAccessToken } from "../api/axiosClient";

const statusColors = {
  confirmed: { bg: "#f0fdf4", color: "#16a34a" },
  pending: { bg: "#fffbeb", color: "#d97706" },
  cancelled: { bg: "#fef2f2", color: "#dc2626" },
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stormStatus, setStormStatus] = useState("");

  const handleTestApiStorm = async () => {
    try {
      setStormStatus("Running 5 API storm...");
      setAccessToken("FAKE_EXPIRED_TOKEN");

      const results = await Promise.all([
        axiosClient.get("/bookings/my"),
        axiosClient.get("/auth/me"),
        axiosClient.get("/bookings/my"),
        axiosClient.get("/auth/me"),
        axiosClient.get("/bookings/my"),
      ]);

      console.log("✅ 5 API Storm results:", results);
      if (results[0]?.data?.bookings) {
        setBookings(results[0].data.bookings);
      }
      setStormStatus("Success! All 5 APIs resolved with 1 refresh call.");
    } catch (err) {
      console.error("❌ 5 API Storm failed:", err);
      setStormStatus("Failed: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchMyBookings();
        if (!cancelled) setBookings(data.bookings || []);
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.status === 401
              ? "Please log in to see your bookings."
              : "Couldn't load bookings right now. Is the backend running?",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "30px auto", padding: "0 16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <h1 style={{ margin: 0, padding: 0 }}>My Bookings 🧳</h1>
        <button
          onClick={handleTestApiStorm}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 14,
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            transition: "opacity 0.2s",
          }}
        >
          Refresh Data (Test 5 API Storm)
        </button>
      </div>

      {stormStatus && (
        <div
          style={{
            marginBottom: 16,
            padding: "8px 14px",
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 500,
            background: stormStatus.startsWith("Failed")
              ? "#fef2f2"
              : "#f0fdf4",
            color: stormStatus.startsWith("Failed") ? "#dc2626" : "#16a34a",
            border: `1px solid ${stormStatus.startsWith("Failed") ? "#fecaca" : "#bbf7d0"}`,
          }}
        >
          {stormStatus}
        </div>
      )}

      {loading && <p style={{ color: "#64748b" }}>Loading your bookings…</p>}

      {!loading && error && (
        <div style={{ textAlign: "center", padding: 40 }}>
          <p style={{ color: "#dc2626" }}>{error}</p>
          <Link to="/" style={{ color: "#2563eb" }}>
            Back to Home
          </Link>
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div style={{ textAlign: "center", padding: 40, color: "#64748b" }}>
          <p>You haven't booked any trips yet.</p>
          <Link
            to="/"
            className="btn-primary"
            style={{
              display: "inline-block",
              textDecoration: "none",
              padding: "10px 20px",
            }}
          >
            Explore Destinations
          </Link>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {bookings.map((b) => {
          const palette = statusColors[b.status] || statusColors.pending;
          return (
            <div
              key={b._id || b.bookingReference}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 18,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <div>
                <div
                  style={{ fontWeight: 700, fontSize: 17, color: "#103152" }}
                >
                  {b.destination}
                </div>
                <div style={{ color: "#64748b", fontSize: 14 }}>
                  {new Date(b.travelDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  {" · "}
                  {(b.numberOfTravellers?.adults || 1) +
                    (b.numberOfTravellers?.children || 0)}{" "}
                  traveller(s)
                </div>
                <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>
                  Ref: {b.bookingReference}
                </div>
              </div>
              <span
                style={{
                  background: palette.bg,
                  color: palette.color,
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontWeight: 600,
                  fontSize: 13,
                  textTransform: "capitalize",
                }}
              >
                {b.status || "pending"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
