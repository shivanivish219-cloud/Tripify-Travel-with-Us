import axios from "axios";

// In production, set VITE_API_URL in your .env (e.g. https://your-backend.onrender.com/api)
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT automatically if present
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("tripify_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
