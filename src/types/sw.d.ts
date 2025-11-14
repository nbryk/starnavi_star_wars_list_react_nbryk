// src/types/sw.d.ts

/**
 * Star Wars character
 */
export interface Person {
  name: string;
  url: string; // API resource URL
  gender: string;
  films: string[]; // Array of film URLs the character appears in
  starships: string[]; // Array of starship URLs the character has piloted
}

/**
 * Star Wars film
 */
export interface Film {
  title: string;
  url: string; // API resource URL
  episode_id: number; // Important for sorting films in chronological order
  starships: string[]; // Array of starship URLs appearing in the film
}

/**
 * Star Wars starship
 */
export interface Starship {
  name: string;
  url: string; // API resource URL
  model: string;
  films: string[]; // Array of film URLs the starship appears in
}
