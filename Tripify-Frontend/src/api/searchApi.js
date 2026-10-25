import axiosClient from "./axiosClient";

// GET /api/search?q=maanale&lang=hi&category=hill_station
export const searchPlacesApi = (params = {}) =>
  axiosClient.get("/search", { params }).then((res) => res.data);
