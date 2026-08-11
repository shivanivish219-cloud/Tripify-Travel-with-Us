export default function DestinationCard({ destination, onClick }) {
  const { name, imageUrl, duration, priceFrom, priceTo } = destination;

  const priceLabel = priceTo
    ? `₹${priceFrom?.toLocaleString("en-IN")} – ₹${priceTo.toLocaleString("en-IN")}`
    : `₹${priceFrom?.toLocaleString("en-IN") ?? "—"}/-`;

  return (
    <div className="text" onClick={() => onClick?.(destination)}>
      <img src={imageUrl} alt={name} loading="lazy" />
      <div className="overlay">
        <div>{name}</div>
        <div>{duration}</div>
        <div>{priceLabel}</div>
      </div>
    </div>
  );
}
