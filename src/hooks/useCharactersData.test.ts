//src/hooks/useCharactersData.test.ts

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useCharactersData } from "./useCharactersData";
import * as api from "../api/sw/peopleApi";
import type { Person } from "../types/sw";
import type { PaginatedResponse } from "../types/api";

// Mock pages
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
    // Create the spy inside beforeEach so it's scoped to this describe
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
    // Restore mocks so they don't leak to other test files
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  it("should initialize with page 1, load characters, and set canGoNext to true", async () => {
    const { result } = renderHook(() => useCharactersData());

    // initial state: loading true, page 1
    expect(result.current.isLoading).toBe(true);
    expect(result.current.currentPage).toBe(1);

    // wait for load to finish
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // assertions after load
    expect(result.current.characters.length).toBe(2);
    expect(result.current.canGoNext).toBe(true);
    expect(result.current.canGoPrev).toBe(false);
  });

  it("should transition to the next page and update status correctly", async () => {
    const { result } = renderHook(() => useCharactersData());

    // wait first load
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // go to next page inside act
    act(() => {
      result.current.goToNext();
    });

    // currentPage should update synchronously
    expect(result.current.currentPage).toBe(2);

    // wait for second load
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.characters.length).toBe(1);
    expect(result.current.canGoNext).toBe(false);
    expect(result.current.canGoPrev).toBe(true);
  });

  it("should handle API fetch errors", async () => {
    const { result } = renderHook(() => useCharactersData());

    // wait first load to finish
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Make the next call reject once
    vi.spyOn(api, "fetchPeoplePage").mockRejectedValueOnce(
      new Error("Test API Error")
    );

    act(() => {
      result.current.goToNext(); // will try to load page 2 (or 3 depending on implementation)
    });

    // wait until loading finished after the error
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Validate error state: match the exact message your hook sets
    expect(result.current.error).toBe(
      "Failed to load hero list. Please try again later."
    );
    // And ensure page didn't move forward unexpectedly (adjust expected behavior if your hook reverts page)
    expect(result.current.currentPage).toBe(2);
  });
});
