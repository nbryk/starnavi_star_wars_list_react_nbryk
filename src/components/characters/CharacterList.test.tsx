import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CharacterList } from "./CharacterList";
import type { Person } from "../../types/sw";

// Mock CharacterCard so test focuses on CharacterList logic
vi.mock("./CharacterCard", () => ({
  CharacterCard: ({ person }: { person: Person }) => (
    <div data-testid="character-card">{person.name}</div>
  ),
}));

describe("CharacterList", () => {
  it("renders CharacterCard for each character", () => {
    const characters = [
      { name: "Luke", url: "1", gender: "male", films: [], starships: [] },
      { name: "Leia", url: "2", gender: "female", films: [], starships: [] },
    ];

    render(<CharacterList characters={characters} />);

    const cards = screen.getAllByTestId("character-card");
    expect(cards).toHaveLength(2);
    expect(screen.getByText("Luke")).toBeInTheDocument();
    expect(screen.getByText("Leia")).toBeInTheDocument();
  });

  it("shows message when no characters are provided", () => {
    render(<CharacterList characters={[]} />);
    expect(screen.getByText(/No characters found/i)).toBeInTheDocument();
  });
});
