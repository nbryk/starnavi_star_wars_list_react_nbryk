import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { HeroImage } from "./HeroImage";

// Extract fallback URL directly from the component for stability
const FALLBACK_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY2NjY2Ii8+PC9zdmc+";

describe("HeroImage", () => {
  test("renders correct image URL based on ID", () => {
    render(<HeroImage id={5} name="Yoda" />);

    const img = screen.getByAltText("Yoda");
    expect(img).toBeInTheDocument();

    expect(img).toHaveAttribute(
      "src",
      "https://starwars-visualguide.com/assets/img/characters/5.jpg"
    );
  });

  test("falls back to placeholder when image fails to load", () => {
    render(<HeroImage id={99} name="Unknown" />);

    const img = screen.getByAltText("Unknown");

    // Simulate image loading error
    fireEvent.error(img);

    expect(img).toHaveAttribute("src", FALLBACK_URL);
    expect(img.className).toContain("object-contain");
  });
});
