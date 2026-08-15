import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDestinationBySlug } from "../api/destinationsApi";

export default function DestinationDetailsPage() {
  const { slug } = useParams();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDestination = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchDestinationBySlug(slug);

        setDestination(data.destination);
      } catch (err) {
        console.error("Destination details error:", err);
        setError("Destination not found.");
      } finally {
        setLoading(false);
      }
    };

    loadDestination();
  }, [slug]);

  if (loading) {
    return <p>Loading destination...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!destination) {
    return <p>Destination not found.</p>;
  }

  return (
    <div>
      <h1>{destination.name}</h1>

      <img
        src={destination.imageUrl}
        alt={destination.name}
        style={{
          width: "100%",
          maxWidth: "800px",
          height: "400px",
          objectFit: "cover",
        }}
      />

      <p>{destination.description}</p>

      <p>
        <strong>Category:</strong> {destination.category}
      </p>

      <p>
        <strong>Duration:</strong> {destination.duration}
      </p>

      <p>
        <strong>Starting Price:</strong> ₹{destination.priceFrom}
      </p>
    </div>
  );
}
