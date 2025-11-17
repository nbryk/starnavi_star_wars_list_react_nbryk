// src/api/sw/starshipsApi.ts
import { api } from "../client";
import type { Starship } from "../../types/sw.d";
import { throttledPromiseAll } from "../utils";

/**
 * Fetch a single starship by its full URL (as returned in Person.starships).
 */
export async function fetchStarshipByPath(path: string): Promise<Starship> {
  const response = await api.get(path);

  return response.data;
}

/**
 * Fetch multiple starships in parallel with concurrency limit.
 * Limits to 3 simultaneous requests.
 */
export async function fetchStarshipsByPaths(
  paths: string[]
): Promise<Starship[]> {
  return throttledPromiseAll(paths, fetchStarshipByPath, 3);
}
