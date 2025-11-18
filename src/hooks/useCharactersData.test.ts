import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useCharactersData } from "./useCharactersData";
import * as api from "../api/sw/peopleApi";
import type { Person } from "../types/sw";
import type { PaginatedResponse } from "../types/api";

// Mock API pages
const mockPage1: PaginatedResponse<Person> = {
  count: 82,
  next: "https://sw-api.starnavi.io/people/?page=2",
  previous: null,
  results: [
    { name: "Luke Skywalker", url: "person-1" } as Person,
    { name: "C-3PO", url: "person-2" } as Person,
  ],
};

const mockPage2: PaginatedResponse<Person> = {
  count: 82,
  next: null,
  previous: "https://sw-api.starnavi.io/people/?page=1",
  results: [{ name: "Darth Vader", url: "person-3" } as Person],
};

describe("useCharactersData", () => {
  beforeEach(() => {
    vi.spyOn(api, "fetchPeoplePage").mockImplementation((page?: number) => {
      if (page === 1 || page === undefined) return Promise.resolve(mockPage1);
      if (page === 2) return Promise.resolve(mockPage2);
      if (page === 3)
        return Promise.reject(
          new Error("API rate limit exceeded or page not found")
        );
      return Promise.resolve(mockPage1);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  it("should initialize with page 1, load characters, and set canGoNext to true", async () => {
    const { result } = renderHook(() => useCharactersData());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.currentPage).toBe(1);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.characters.length).toBe(2);
    expect(result.current.canGoNext).toBe(true);
    expect(result.current.canGoPrev).toBe(false);
  });

  it("should transition to the next page and update status correctly", async () => {
    const { result } = renderHook(() => useCharactersData());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.goToNext();
    });

    expect(result.current.currentPage).toBe(2);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.characters.length).toBe(1);
    expect(result.current.canGoNext).toBe(false);
    expect(result.current.canGoPrev).toBe(true);
  });

  it("should handle API fetch errors", async () => {
    const { result } = renderHook(() => useCharactersData());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    vi.spyOn(api, "fetchPeoplePage").mockRejectedValueOnce(
      new Error("Test API Error")
    );

    act(() => {
      result.current.goToNext();
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe(
      "Failed to load hero list. Please try again later."
    );
    // Adjust depending on your hook logic (page should stay or move)
    expect(result.current.currentPage).toBe(2);
  });
});
