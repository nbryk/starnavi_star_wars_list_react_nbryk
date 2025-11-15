// src/api/sw/peopleApi.ts
import { api } from "../client";
import type { Person } from "../../types/sw";
import type { PaginatedResponse } from "../../types/api";

/**
 * Fetch a paginated list of people.
 */
export async function fetchPeoplePage(
  page: number = 1
): Promise<PaginatedResponse<Person>> {
  const response = await api.get(`/people/?page=${page}`);
  return response.data;
}

/**
 * Fetch a single person by ID.
 */
export async function fetchPerson(id: string): Promise<Person> {
  const response = await api.get(`/people/${id}/`);
  return response.data;
}
