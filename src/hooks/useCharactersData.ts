//src/hooks/useCharactersData.ts
import { useEffect, useState } from "react";
import type { Person } from "../types/sw";
import { fetchPeoplePage } from "../api/sw/peopleApi";

export const useCharactersData = () => {
  // Characters for the current page
  const [characters, setCharacters] = useState<Person[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Loading & error state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Whether pagination buttons should be enabled
  const [canGoNext, setCanGoNext] = useState<boolean>(true);
  const [canGoPrev, setCanGoPrev] = useState<boolean>(false);

  // Pagination actions
  const goToNext = () => setCurrentPage((c) => c + 1);
  const goToPrev = () => setCurrentPage((c) => Math.max(1, c - 1));

  useEffect(() => {
    setError(null);
    setIsLoading(true);

    const loadCharacters = async () => {
      try {
        const peoplePage = await fetchPeoplePage(currentPage);

        setCharacters(peoplePage.results);
        setCanGoNext(!!peoplePage.next);
        setCanGoPrev(!!peoplePage.previous);
      } catch (err) {
        console.error("Error loading characters:", err);

        setError("Failed to load hero list. Please try again later.");
        setCharacters([]);
      } finally {
        setIsLoading(false);
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    loadCharacters();
  }, [currentPage]);

  return {
    characters,
    currentPage,
    isLoading,
    error,
    canGoNext,
    canGoPrev,
    goToNext,
    goToPrev,
  };
};
