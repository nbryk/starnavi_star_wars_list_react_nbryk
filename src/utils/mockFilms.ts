import { type Film } from "../types/sw";

export const mockFilms: Film[] = [
  {
    title: "A New Hope",
    url: "https://sw-api.starnavi.io/films/1/",
    episode_id: 4,
    starships: [
      "https://sw-api.starnavi.io/starships/12/", // X-wing
      "https://sw-api.starnavi.io/starships/13/", // TIE Advanced
    ],
  },
  {
    title: "The Empire Strikes Back",
    url: "https://sw-api.starnavi.io/films/2/",
    episode_id: 5,
    starships: [
      "https://sw-api.starnavi.io/starships/15/", // Executor
      "https://sw-api.starnavi.io/starships/10/", // Millennium Falcon
    ],
  },
  {
    title: "Return of the Jedi",
    url: "https://sw-api.starnavi.io/films/3/",
    episode_id: 6,
    starships: [
      "https://sw-api.starnavi.io/starships/22/",
      "https://sw-api.starnavi.io/starships/48/",
    ],
  },
  {
    title: "The Phantom Menace",
    url: "https://sw-api.starnavi.io/films/4/",
    episode_id: 1,
    starships: ["https://sw-api.starnavi.io/starships/40/"],
  },
  {
    title: "Attack of the Clones",
    url: "https://sw-api.starnavi.io/films/5/",
    episode_id: 2,
    starships: ["https://sw-api.starnavi.io/starships/59/"],
  },
  {
    title: "Revenge of the Sith",
    url: "https://sw-api.starnavi.io/films/6/",
    episode_id: 3,
    starships: [
      "https://sw-api.starnavi.io/starships/66/",
      "https://sw-api.starnavi.io/starships/74/",
    ],
  },
];
