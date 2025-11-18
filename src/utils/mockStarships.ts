import { type Starship } from "../types/sw";

export const mockStarships: Starship[] = [
  {
    name: "X-wing",
    url: "https://sw-api.starnavi.io/starships/12/",
    model: "T-65 X-wing",
    films: [
      "https://sw-api.starnavi.io/films/1/",
      "https://sw-api.starnavi.io/films/3/",
    ],
  },
  {
    name: "TIE Advanced x1",
    url: "https://sw-api.starnavi.io/starships/13/",
    model: "TIE Advanced x1",
    films: ["https://sw-api.starnavi.io/films/1/"],
  },
  {
    name: "Millennium Falcon",
    url: "https://sw-api.starnavi.io/starships/10/",
    model: "YT-1300 light freighter",
    films: [
      "https://sw-api.starnavi.io/films/2/",
      "https://sw-api.starnavi.io/films/3/",
    ],
  },
  {
    name: "Imperial Star Destroyer",
    url: "https://sw-api.starnavi.io/starships/15/",
    model: "Imperial I-class Star Destroyer",
    films: ["https://sw-api.starnavi.io/films/2/"],
  },
  {
    name: "Naboo Starfighter",
    url: "https://sw-api.starnavi.io/starships/40/",
    model: "N-1 Starfighter",
    films: ["https://sw-api.starnavi.io/films/4/"],
  },
  {
    name: "Slave I",
    url: "https://sw-api.starnavi.io/starships/21/",
    model: "Firespray-31-class",
    films: ["https://sw-api.starnavi.io/films/5/"],
  },
];
