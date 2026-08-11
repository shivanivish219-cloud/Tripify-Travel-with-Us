// Dashboard API layer — all admin-dashboard network calls live here.
// If you already have a shared axios instance (e.g. src/api/axiosInstance.js
// with baseURL + auth token interceptor from your existing Tripify setup),
// import that instead of raw axios so the auth token is attached automatically.

import axios from "axios";
import axiosClient from "./axiosClient";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const dashboardClient = axios.create({
  baseURL: `${API_BASE}/admin`,
});

// Attach auth token on every request (adjust key name to match your AuthContext)
dashboardClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// GET /api/admin/kpis?range=30d
export const fetchKpis = async (range = "30d") => {
  const { data } = await dashboardClient.get("/kpis", { params: { range } });
  return data;
};

// GET /api/admin/revenue-trend?range=30d
export const fetchRevenueTrend = async (range = "30d") => {
  const { data } = await dashboardClient.get("/revenue-trend", {
    params: { range },
  });
  return data;
};

// GET /api/admin/booking-trend?range=30d
export const fetchBookingTrend = async (range = "30d") => {
  const { data } = await dashboardClient.get("/booking-trend", {
    params: { range },
  });
  return data;
};

// GET /api/admin/popular-packages
export const fetchPopularPackages = async () => {
  const { data } = await dashboardClient.get("/popular-packages");
  return data;
};

// GET /api/admin/recent-bookings?limit=8
export const fetchRecentBookings = async (limit = 8) => {
  const { data } = await dashboardClient.get("/recent-bookings", {
    params: { limit },
  });
  return data;
};
