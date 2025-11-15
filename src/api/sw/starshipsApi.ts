// src/api/sw/starshipsApi.ts
import axios from "axios";
import type { Starship } from "../../types/sw.d";

/**
 * Get a single starship by full URL (який приходить у зв'язках Person.starships).
 */
export async function fetchStarshipByUrl(url: string): Promise<Starship> {
  const response = await axios.get(url);

  return response.data;
}
