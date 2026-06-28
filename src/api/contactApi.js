import axiosClient from "./axiosClient";

export const sendContactMessage = (payload) =>
  axiosClient.post("/contact", payload).then((res) => res.data);
