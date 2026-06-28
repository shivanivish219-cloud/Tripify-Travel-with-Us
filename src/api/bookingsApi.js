import axiosClient from "./axiosClient";

export const createBooking = (payload) =>
  axiosClient.post("/bookings", payload).then((res) => res.data);

export const fetchMyBookings = () =>
  axiosClient.get("/bookings/my").then((res) => res.data);

export const fetchBookingByRef = (ref) =>
  axiosClient.get(`/bookings/${ref}`).then((res) => res.data);
