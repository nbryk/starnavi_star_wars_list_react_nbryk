import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PaginationControls } from "./PaginationControls";

describe("PaginationControls", () => {
  let mockOnPrev: ReturnType<typeof vi.fn>;
  let mockOnNext: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnPrev = vi.fn();
    mockOnNext = vi.fn();
  });

  it("should display the correct current page number", () => {
    render(
      <PaginationControls
        currentPage={5}
        canGoPrev={true}
        canGoNext={true}
        onPrev={mockOnPrev as () => void}
        onNext={mockOnNext as () => void}
      />
    );
    expect(screen.getByText(/Page 5/i)).toBeInTheDocument();
  });

  it("should disable the Previous button when canGoPrev is false", () => {
    render(
      <PaginationControls
        currentPage={1}
        canGoPrev={false}
        canGoNext={true}
        onPrev={mockOnPrev as () => void}
        onNext={mockOnNext as () => void}
      />
    );
    const prevButton = screen.getByRole("button", { name: /Previous/i });
    expect(prevButton).toBeDisabled();
  });

  it("should disable the Next button when canGoNext is false", () => {
    render(
      <PaginationControls
        currentPage={10}
        canGoPrev={true}
        canGoNext={false}
        onPrev={mockOnPrev as () => void}
        onNext={mockOnNext as () => void}
      />
    );
    const nextButton = screen.getByRole("button", { name: /Next/i });
    expect(nextButton).toBeDisabled();
  });

  it("should call onNext when the Next button is clicked", () => {
    render(
      <PaginationControls
        currentPage={5}
        canGoPrev={true}
        canGoNext={true}
        onPrev={mockOnPrev as () => void}
        onNext={mockOnNext as () => void}
      />
    );

    const nextButton = screen.getByRole("button", { name: /Next/i });
    fireEvent.click(nextButton);

    expect(mockOnNext).toHaveBeenCalledTimes(1);
    expect(mockOnPrev).not.toHaveBeenCalled();
  });

  it("should call onPrev when the Previous button is clicked", () => {
    render(
      <PaginationControls
        currentPage={5}
        canGoPrev={true}
        canGoNext={true}
        onPrev={mockOnPrev as () => void}
        onNext={mockOnNext as () => void}
      />
    );

    const prevButton = screen.getByRole("button", { name: /Previous/i });
    fireEvent.click(prevButton);

    expect(mockOnPrev).toHaveBeenCalledTimes(1);
    expect(mockOnNext).not.toHaveBeenCalled();
  });
});
