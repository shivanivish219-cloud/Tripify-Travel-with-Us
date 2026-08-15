import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDestinationBySlug } from "../api/destinationsApi";
import "./DestinationDetailsPage.css";

export default function DestinationDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDestination = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchDestinationBySlug(slug);

        if (data.success) {
          setDestination(data.destination);
        } else {
          setError("Destination not found.");
        }
      } catch (err) {
        console.error("Destination details error:", err);
        setError("Unable to load destination.");
      } finally {
        setLoading(false);
      }
    };

    loadDestination();
  }, [slug]);

  if (loading) {
    return (
      <div className="destination-state">
        <p>Loading destination...</p>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="destination-state">
        <h2>Destination not found</h2>
        <button onClick={() => navigate("/destinations")}>
          Back to Destinations
        </button>
      </div>
    );
  }

  return (
    <main className="destination-details-page">
      {/* Hero Section */}
      <section className="destination-hero">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="destination-hero-image"
        />

        <div className="destination-hero-overlay">
          <div className="destination-hero-content">
            <span className="destination-type">
              {destination.type === "international"
                ? "International"
                : "Domestic"}
            </span>

            <h1>{destination.name}</h1>

            <p>{destination.description}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="destination-content">
        <div className="destination-main">
          <h2>About {destination.name}</h2>

          <p className="destination-description">{destination.description}</p>

          <div className="destination-info-grid">
            <div className="destination-info-card">
              <span>📍</span>
              <div>
                <small>Destination</small>
                <strong>{destination.name}</strong>
              </div>
            </div>

            <div className="destination-info-card">
              <span>🏷️</span>
              <div>
                <small>Category</small>
                <strong>{destination.category}</strong>
              </div>
            </div>

            <div className="destination-info-card">
              <span>🕐</span>
              <div>
                <small>Duration</small>
                <strong>{destination.duration}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <aside className="destination-booking-card">
          <span className="starting-label">Starting from</span>

          <div className="destination-price">
            ₹{destination.priceFrom?.toLocaleString("en-IN")}
            <span>/-</span>
          </div>

          <p>Per person</p>

          <button
            className="destination-book-button"
            onClick={() => navigate("/")}
          >
            Plan Your Trip
          </button>

          <button
            className="destination-back-button"
            onClick={() => navigate("/destinations")}
          >
            ← Back to Destinations
          </button>
        </aside>
      </section>
    </main>
  );
}
