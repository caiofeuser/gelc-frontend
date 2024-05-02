import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "https://gelc-backend.onrender.com",
  // baseURL: "http://localhost:3333",
  // headers: {
  //   "Content-Type": "application/json",
  // },
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
