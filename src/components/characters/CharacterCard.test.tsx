import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CharacterCard } from "./CharacterCard";

// Mock HeroImage to isolate this component
vi.mock("./HeroImage", () => ({
  HeroImage: ({ name }: { name: string }) => (
    <div data-testid="hero-image">Mock Image: {name}</div>
  ),
}));

describe("CharacterCard", () => {
  const mockCharacter = {
    name: "Leia Organa",
    url: "https://sw-api.starnavi.io/people/5/",
    gender: "female",
    films: [1, 2],
    starships: [5, 6],
  };

  // Helper wrapper for components that use routing (Link/NavLink)
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it("should display the character name and link to the correct detail page", () => {
    renderWithRouter(<CharacterCard person={mockCharacter} />);

    expect(screen.getByText("Leia Organa")).toBeInTheDocument();

    const linkElement = screen.getByRole("link");

    expect(linkElement).toHaveAttribute("href", "/characters/5");
  });

  it("should handle character data with missing properties gracefully", () => {
    const partialCharacter = {
      name: "Wedge Antilles",
      url: "https://sw-api.starnavi.io/people/18/",
      gender: "male",
      films: [],
      starships: [],
    };

    renderWithRouter(<CharacterCard person={partialCharacter} />);

    expect(screen.getByText("Wedge Antilles")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/characters/18");
  });
});
