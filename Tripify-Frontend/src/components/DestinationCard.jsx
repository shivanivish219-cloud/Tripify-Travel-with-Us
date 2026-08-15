import { useNavigate } from "react-router-dom";

export default function DestinationCard({ destination, onClick }) {
  const navigate = useNavigate();

  const { name, slug, imageUrl, duration, priceFrom, priceTo } = destination;

  const priceLabel = priceTo
    ? `₹${priceFrom?.toLocaleString("en-IN")} – ₹${priceTo.toLocaleString(
        "en-IN",
      )}`
    : `₹${priceFrom?.toLocaleString("en-IN") ?? "—"}/-`;

  const handleCardClick = () => {
    if (slug) {
      navigate(`/destinations/${slug}`);
    }
  };

  return (
    <div className="text" onClick={handleCardClick}>
      <img src={imageUrl} alt={name} loading="lazy" />

      <div className="overlay">
        <div>{name}</div>
        <div>{duration}</div>
        <div>{priceLabel}</div>
      </div>
    </div>
  );
}
