// src/api/client.ts

import axios from "axios";
import { ENV } from "../config/evn";

// // Base URL for all Star Wars API requests
// export const api = axios.create({
//   baseURL: ENV.API_BASE_URL,
//   timeout: ENV.API_TIMEOUT,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
// Base URL for all Star Wars API requests

/**
 * Axios instance for all Star Wars API requests.
 * Using a local proxy path as baseURL for easier development.
 */
export const api = axios.create({
  baseURL: "/api/", // Local proxy path
  timeout: ENV.API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});
