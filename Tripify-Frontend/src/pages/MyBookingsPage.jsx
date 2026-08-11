import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMyBookings } from "../api/bookingsApi";

const statusColors = {
  confirmed: { bg: "#f0fdf4", color: "#16a34a" },
  pending: { bg: "#fffbeb", color: "#d97706" },
  cancelled: { bg: "#fef2f2", color: "#dc2626" },
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
              : "Couldn't load bookings right now. Is the backend running?"
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
      <h1 style={{ padding: 0 }}>My Bookings 🧳</h1>

      {loading && <p style={{ color: "#64748b" }}>Loading your bookings…</p>}

      {!loading && error && (
        <div style={{ textAlign: "center", padding: 40 }}>
          <p style={{ color: "#dc2626" }}>{error}</p>
          <Link to="/" style={{ color: "#2563eb" }}>Back to Home</Link>
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div style={{ textAlign: "center", padding: 40, color: "#64748b" }}>
          <p>You haven't booked any trips yet.</p>
          <Link to="/" className="btn-primary" style={{ display: "inline-block", textDecoration: "none", padding: "10px 20px" }}>
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
                <div style={{ fontWeight: 700, fontSize: 17, color: "#103152" }}>
                  {b.destination}
                </div>
                <div style={{ color: "#64748b", fontSize: 14 }}>
                  {new Date(b.travelDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  {" · "}
                  {(b.numberOfTravellers?.adults || 1) + (b.numberOfTravellers?.children || 0)} traveller(s)
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
