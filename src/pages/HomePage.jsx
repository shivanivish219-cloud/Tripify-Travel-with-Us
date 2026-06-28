import { useState, useEffect } from "react";
import Banner from "../components/Banner";
import DestinationRow from "../components/DestinationRow";
import GroupOfferBanner from "../components/GroupOfferBanner";
import InterestLinks from "../components/InterestLinks";
import { fetchDestinations } from "../api/destinationsApi";
import { fallbackDestinations } from "../assets/fallbackDestinations";

export default function HomePage({ onCardClick, onOpenContact }) {
  const [destinations, setDestinations] = useState(fallbackDestinations);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchDestinations();
        if (!cancelled && data.destinations?.length) {
          setDestinations(data.destinations);
        }
      } catch {
        // Backend not running yet — fallbackDestinations already in state.
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const domestic = destinations.filter((d) => d.type === "domestic");
  const international = destinations.filter((d) => d.type === "international");

  return (
    <>
      <Banner />

      <DestinationRow
        title="Top Destinations"
        destinations={domestic}
        onCardClick={(d) => onCardClick(d.name)}
      />

      <GroupOfferBanner onCallUs={onOpenContact} />

      <InterestLinks />

      <DestinationRow
        title="Explore Internationals"
        destinations={international}
        onCardClick={(d) => onCardClick(d.name)}
      />

      {loading && (
        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 13 }}>
          Loading live destinations…
        </p>
      )}
    </>
  );
}
