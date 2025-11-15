// src/api/client.ts
import axios from "axios";
import { ENV } from "../config/evn";

// Base URL for all Star Wars API requests
export const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});
