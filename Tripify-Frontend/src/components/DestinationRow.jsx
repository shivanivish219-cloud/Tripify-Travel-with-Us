import DestinationCard from "./DestinationCard";

export default function DestinationRow({ title, destinations, onCardClick }) {
  return (
    <>
      <h1>{title}</h1>
      <div className="img-box">
        {destinations.map((dest) => (
          <DestinationCard
            key={dest.slug || dest.name}
            destination={dest}
            onClick={onCardClick}
          />
        ))}
      </div>
    </>
  );
}
