import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: process.env.API_BASE_URL || "https://gelc-backend.onrender.com",
});
// const api = axios.create({ baseURL: "http://localhost:3333" });

api.interceptors.request.use(async (config) => {
  let token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
