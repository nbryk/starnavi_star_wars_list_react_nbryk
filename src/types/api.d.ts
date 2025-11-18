export interface PaginatedResponse<T> {
  count: number; // total number of items
  next: string | null; // URL of next page, or null if last page
  previous: string | null; // URL of previous page, or null if first page
  results: T[]; // array of items of type T
}

export type FetchStatus = "idle" | "loading" | "success" | "error"; // network request state
