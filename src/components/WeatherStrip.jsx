import { useState, useEffect } from "react";
import { fetchWeatherByCoords, fetchWeatherByCity, weatherEmoji } from "../api/weatherApi";

export default function WeatherStrip() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              try {
                const data = await fetchWeatherByCoords(
                  pos.coords.latitude,
                  pos.coords.longitude
                );
                if (!cancelled) setWeather(data);
              } catch {
                /* silently hide widget */
              }
            },
            async () => {
              // Permission denied — fall back to a default city
              try {
                const data = await fetchWeatherByCity("Mumbai");
                if (!cancelled) setWeather(data);
              } catch {
                /* silently hide widget */
              }
            },
            { timeout: 5000 }
          );
        } else {
          const data = await fetchWeatherByCity("Mumbai");
          if (!cancelled) setWeather(data);
        }
      } catch {
        /* no API key or network issue — widget just won't render */
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!weather) return null;

  return (
    <span className="weather-strip">
      <span className="wx-icon">{weatherEmoji(weather.icon)}</span>
      {weather.city}, {weather.tempC}°C
    </span>
  );
}
