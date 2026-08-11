// Live weather widget — uses OpenWeatherMap's free tier.
// Get a free API key at https://openweathermap.org/api (takes 2 minutes,
// no credit card needed) and put it in your .env as VITE_OPENWEATHER_KEY.
//
// If no key is set, this silently fails and the Navbar simply hides the
// weather strip — the app still works fine without it.

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeatherByCity(city) {
  if (!API_KEY) return null;
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather lookup failed");
  const data = await res.json();
  return {
    city: data.name,
    tempC: Math.round(data.main.temp),
    description: data.weather?.[0]?.description || "",
    icon: data.weather?.[0]?.icon || "01d",
  };
}

export async function fetchWeatherByCoords(lat, lon) {
  if (!API_KEY) return null;
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather lookup failed");
  const data = await res.json();
  return {
    city: data.name,
    tempC: Math.round(data.main.temp),
    description: data.weather?.[0]?.description || "",
    icon: data.weather?.[0]?.icon || "01d",
  };
}

// Maps OpenWeatherMap icon codes to a simple emoji so we don't need
// another image request just for the navbar strip.
export function weatherEmoji(iconCode) {
  const map = {
    "01": "☀️", "02": "🌤️", "03": "☁️", "04": "☁️",
    "09": "🌧️", "10": "🌦️", "11": "⛈️", "13": "❄️", "50": "🌫️",
  };
  return map[iconCode?.slice(0, 2)] || "🌍";
}
