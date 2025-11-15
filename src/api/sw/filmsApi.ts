// src/api/sw/filmsApi.ts
//import { api } from "../client";
import axios from "axios";
import type { Film } from "../../types/sw.d";

/**
 * Get a single movie by full URL
 */
export async function fetchFilmByUrl(url: string): Promise<Film> {
  const response = await axios.get(url);

  return response.data;
}
