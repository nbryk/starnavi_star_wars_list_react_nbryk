//src/utils/mockData.ts
import type { PaginatedResponse } from "../types/api";
import type { Person } from "../types/sw";

// Mock list of characters for testing and UI development without API calls
export const mockCharacters: Person[] = [
  {
    name: "Luke Skywalker",
    url: "https://sw-api.starnavi.io/people/1/",
    gender: "male",
    films: [
      "https://sw-api.starnavi.io/films/1/",
      "https://sw-api.starnavi.io/films/2/",
      "https://sw-api.starnavi.io/films/3/",
    ],
    starships: [
      "https://sw-api.starnavi.io/starships/12/",
      "https://sw-api.starnavi.io/starships/22/",
    ],
  },
  {
    name: "C-3PO",
    url: "https://sw-api.starnavi.io/people/2/",
    gender: "n/a",
    films: [
      "https://sw-api.starnavi.io/films/1/",
      "https://sw-api.starnavi.io/films/2/",
      "https://sw-api.starnavi.io/films/3/",
    ],
    starships: [],
  },
  {
    name: "R2-D2",
    url: "https://sw-api.starnavi.io/people/3/",
    gender: "n/a",
    films: [
      "https://sw-api.starnavi.io/films/1/",
      "https://sw-api.starnavi.io/films/2/",
      "https://sw-api.starnavi.io/films/3/",
    ],
    starships: [],
  },
  {
    name: "Darth Vader",
    url: "https://sw-api.starnavi.io/people/4/",
    gender: "male",
    films: ["https://sw-api.starnavi.io/films/1/"],
    starships: ["https://sw-api.starnavi.io/starships/13/"],
  },
  {
    name: "Leia Organa",
    url: "https://sw-api.starnavi.io/people/5/",
    gender: "female",
    films: [
      "https://sw-api.starnavi.io/films/1/",
      "https://sw-api.starnavi.io/films/2/",
    ],
    starships: [],
  },
  {
    name: "Owen Lars",
    url: "https://sw-api.starnavi.io/people/6/",
    gender: "male",
    films: ["https://sw-api.starnavi.io/films/1/"],
    starships: [],
  },
  {
    name: "Beru Whitesun lars",
    url: "https://sw-api.starnavi.io/people/7/",
    gender: "female",
    films: ["https://sw-api.starnavi.io/films/1/"],
    starships: [],
  },
  {
    name: "R5-D4",
    url: "https://sw-api.starnavi.io/people/8/",
    gender: "n/a",
    films: ["https://sw-api.starnavi.io/films/1/"],
    starships: [],
  },
  {
    name: "Biggs Darklighter",
    url: "https://sw-api.starnavi.io/people/9/",
    gender: "male",
    films: ["https://sw-api.starnavi.io/films/1/"],
    starships: ["https://sw-api.starnavi.io/starships/12/"],
  },
  {
    name: "Obi-Wan Kenobi",
    url: "https://sw-api.starnavi.io/people/10/",
    gender: "male",
    films: [
      "https://sw-api.starnavi.io/films/1/",
      "https://sw-api.starnavi.io/films/2/",
    ],
    starships: ["https://sw-api.starnavi.io/starships/48/"],
  },
  {
    name: "Yoda",
    url: "https://sw-api.starnavi.io/people/11/",
    gender: "male",
    films: [
      "https://sw-api.starnavi.io/films/2/",
      "https://sw-api.starnavi.io/films/3/",
    ],
    starships: [],
  },
  {
    name: "Palpatine",
    url: "https://sw-api.starnavi.io/people/12/",
    gender: "male",
    films: [
      "https://sw-api.starnavi.io/films/1/",
      "https://sw-api.starnavi.io/films/3/",
    ],
    starships: [],
  },
];

// Mock Paginated API response for testing list pages
export const mockPeopleResponse: PaginatedResponse<Person> = {
  count: mockCharacters.length,
  next: "https://sw-api.starnavi.io/people/?page=2",
  previous: null,
  results: mockCharacters,
};
