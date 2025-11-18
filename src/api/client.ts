import axios from "axios";
import { ENV } from "../config/evn";

// Base URL for all Star Wars API requests
const BASE_URL = import.meta.env.PROD ? ENV.API_BASE_URL : "/api/";
/**
 * Axios instance for all Star Wars API requests.
 * Using a local proxy path as baseURL for easier development.
 */
export const api = axios.create({
  baseURL: BASE_URL, // Local proxy path
  timeout: ENV.API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});
