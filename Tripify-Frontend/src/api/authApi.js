import axiosClient from "./axiosClient";

export const signup = (payload) =>
  axiosClient.post("/auth/signup", payload).then((res) => res.data);

export const login = (payload) =>
  axiosClient.post("/auth/login", payload).then((res) => res.data);

export const refreshTokenApi = (payload) =>
  axiosClient.post("/auth/refresh", payload).then((res) => res.data);

export const logoutApi = (payload) =>
  axiosClient.post("/auth/logout", payload).then((res) => res.data);

export const fetchMe = () =>
  axiosClient.get("/auth/me").then((res) => res.data);
