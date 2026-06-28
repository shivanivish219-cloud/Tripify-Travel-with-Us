import axiosClient from "./axiosClient";

export const signup = (payload) =>
  axiosClient.post("/auth/signup", payload).then((res) => res.data);

export const login = (payload) =>
  axiosClient.post("/auth/login", payload).then((res) => res.data);

export const fetchMe = () =>
  axiosClient.get("/auth/me").then((res) => res.data);
