import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useHeroDetails } from "./useHeroDetails";
import type { Person, Film, Starship } from "../types/sw";

import * as peopleApi from "../api/sw/peopleApi";
import * as filmsApi from "../api/sw/filmsApi";
import * as starshipsApi from "../api/sw/starshipsApi";
import * as apiUtils from "../utils/apiUtils";

const mockHero: Person = {
  url: "https://sw-api.starnavi.io/people/14/",
  name: "Han Solo",
  gender: "male",
  films: [4, 5],
  starships: [10, 11],
};

const mockFilms: Film[] = [
  {
    url: "https://sw-api.starnavi.io/films/4/",
    title: "A New Hope",
    episode_id: 4,
    starships: [10],
  },
  {
    url: "https://sw-api.starnavi.io/films/5/",
    title: "Empire Strikes Back",
    episode_id: 5,
    starships: [11],
  },
];

const mockStarships: Starship[] = [
  {
    url: "https://sw-api.starnavi.io/starships/10/",
    name: "Millennium Falcon",
  } as Starship,
  {
    url: "https://sw-api.starnavi.io/starships/11/",
    name: "Slave I",
  } as Starship,
];

describe("useHeroDetails", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches hero, films, and starships correctly", async () => {
    vi.spyOn(peopleApi, "fetchPerson").mockResolvedValue(mockHero);
    vi.spyOn(apiUtils, "generatePathsFromIds").mockImplementation((type, ids) =>
      ids.map((id) => `/${type}/${id}/`)
    );
    vi.spyOn(filmsApi, "fetchFilmsByPaths").mockResolvedValue(mockFilms);
    vi.spyOn(starshipsApi, "fetchStarshipsByPaths").mockResolvedValue(
      mockStarships
    );

    const { result } = renderHook(() => useHeroDetails("14"));

    // Wait until loading finishes
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.hero).toEqual(mockHero);
    expect(result.current.films).toEqual(mockFilms);
    expect(result.current.starships).toEqual(mockStarships);
  });

  it("handles API errors gracefully", async () => {
    vi.spyOn(peopleApi, "fetchPerson").mockRejectedValue(
      new Error("Test API Error")
    );

    const { result } = renderHook(() => useHeroDetails("14"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe("Failed to load hero details.");
    expect(result.current.hero).toBeNull();
    expect(result.current.films).toEqual([]);
    expect(result.current.starships).toEqual([]);
  });

  it("does nothing if heroId is undefined", () => {
    const { result } = renderHook(() => useHeroDetails(undefined));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hero).toBeNull();
    expect(result.current.films).toEqual([]);
    expect(result.current.starships).toEqual([]);
  });
});
