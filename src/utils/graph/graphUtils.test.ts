//src/utils/graph/graphUtils.test.ts
import { describe, it, expect } from "vitest";
import { generateGraphData } from "./graphUtils";
import type { Person, Film, Starship } from "../../types/sw";

// Minimal mock data for testing the logic
const mockHero: Person = {
  url: "https://sw-api.starnavi.io/people/14/",
  name: "Han Solo",
  films: [4, 5, 6],
  starships: [10, 11],
} as Person;

const mockFilm1: Film = {
  url: "https://sw-api.starnavi.io/films/4/",
  title: "A New Hope",
  episode_id: 4,
  starships: [10, 12], // Includes ship 10
} as Film;

const mockFilm2: Film = {
  url: "https://sw-api.starnavi.io/films/5/",
  title: "The Empire Strikes Back",
  episode_id: 5,
  starships: [13, 14], // No matching ships
} as Film;

const mockShip1: Starship = {
  url: "https://sw-api.starnavi.io/starships/10/",
  name: "Millennium Falcon",
  // ...
} as Starship;

const mockShip2: Starship = {
  url: "https://sw-api.starnavi.io/starships/11/",
  name: "TIE Fighter",
  // ...
} as Starship;

const mockFilms = [mockFilm1, mockFilm2];
const mockStarships = [mockShip1, mockShip2];

describe("generateGraphData", () => {
  it("should correctly generate nodes and edges for the hero, films, and starships", () => {
    const result = generateGraphData(mockHero, mockFilms, mockStarships);

    // Check nodes count and IDs
    expect(result.nodes.length).toBe(1 + 2 + 2); // 1 Hero + 2 Films + 2 Starships
    expect(result.nodes.map((n) => n.id)).toEqual([
      "person-14",
      "film-4",
      "film-5",
      "starship-10",
      "starship-11",
    ]);

    // Check edges from Hero to Films
    const heroToFilmEdges = result.edges.filter(
      (e) => e.source === "person-14"
    );
    expect(heroToFilmEdges.length).toBe(2);
    expect(heroToFilmEdges.some((e) => e.target === "film-4")).toBe(true);

    // Check edges from Films to Starships (only matching ships)
    const filmToShipEdges = result.edges.filter((e) =>
      e.source.startsWith("film-")
    );

    expect(filmToShipEdges.length).toBe(1);

    expect(filmToShipEdges[0].source).toBe("film-4");
    expect(filmToShipEdges[0].target).toBe("starship-10");
    expect(filmToShipEdges[0].label).toContain("Used in A New Hope");
  });

  it("should return empty nodes and edges if input arrays are empty", () => {
    const emptyResult = generateGraphData(mockHero, [], []);
    expect(emptyResult.nodes.length).toBe(1); // Only hero
    expect(emptyResult.edges.length).toBe(0);
  });
});
