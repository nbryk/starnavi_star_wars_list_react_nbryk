//src/hooks/useHeroDetails.ts

import { useEffect, useState } from "react";
import type { Film, Person, Starship } from "../types/sw";
import { fetchPerson } from "../api/sw/peopleApi";
import { fetchFilmsByPaths } from "../api/sw/filmsApi";
import { fetchStarshipsByPaths } from "../api/sw/starshipsApi";
import { generatePathsFromIds } from "../utils/apiUtils";

/**
 * Custom hook to fetch hero details including related films and starships.
 */
export const useHeroDetails = (heroId: string | undefined) => {
  const [hero, setHero] = useState<Person | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Validate that heroId exists
    if (!heroId) return;

    // Reset state and start loading
    setIsLoading(true);
    setError(null);

    const loadHero = async () => {
      try {
        // Fetch hero data
        const heroData = await fetchPerson(heroId);
        setHero(heroData);

        // Convert numeric IDs to API paths
        const filmUrls = generatePathsFromIds("films", heroData.films);
        const starshipUrls = generatePathsFromIds(
          "starships",
          heroData.starships
        );

        // Fetch related films and starships in parallel
        const [loadedFilms, loadedStarships] = await Promise.all([
          fetchFilmsByPaths(filmUrls),
          fetchStarshipsByPaths(starshipUrls),
        ]);

        setFilms(loadedFilms);
        setStarships(loadedStarships);
      } catch (e) {
        console.error("Hero loading error:", e);
        setError("Failed to load hero details.");
        setHero(null);
        setFilms([]);
        setStarships([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadHero();
  }, [heroId]);

  return {
    hero,
    films,
    starships,
    isLoading,
    error,
  };
};
