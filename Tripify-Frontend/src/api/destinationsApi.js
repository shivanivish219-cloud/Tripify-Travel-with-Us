import axiosClient from "./axiosClient";

// params: { q, type, category, popular }
export const fetchDestinations = (params = {}) =>
  axiosClient.get("/destinations", { params }).then((res) => res.data);

export const fetchDestinationBySlug = (slug) =>
  axiosClient.get(`/destinations/${slug}`).then((res) => res.data);
