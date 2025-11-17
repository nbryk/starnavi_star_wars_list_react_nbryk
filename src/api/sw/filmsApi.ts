// src/api/sw/filmsApi.ts

import { api } from "../client"; // Use the configured Axios client
import type { Film } from "../../types/sw.d";
import { throttledPromiseAll } from "../utils";

/**
 * Fetch a single film by its relative path (e.g., 'films/1/').
 */
export async function fetchFilmByPath(path: string): Promise<Film> {
  // The 'api' client will prepend the base URL
  const response = await api.get(path);
  return response.data;
}

/**
 * Fetch multiple films in parallel with concurrency limit.
 * Limits to 3 simultaneous requests.
 */
export async function fetchFilmsByPaths(paths: string[]): Promise<Film[]> {
  return throttledPromiseAll(paths, fetchFilmByPath, 3);
}
