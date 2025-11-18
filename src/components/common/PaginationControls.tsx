export interface PaginationControlsProps {
  currentPage: number;
  canGoNext: boolean; // Whether the "Next" button should be enabled
  canGoPrev: boolean; // Whether the "Previous" button should be enabled
  onNext: () => void; // Handler for going to the next page
  onPrev: () => void; // Handler for going to the previous page
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  canGoNext,
  canGoPrev,
  onNext,
  onPrev,
}) => {
  return (
    <div className="flex justify-center items-center space-x-4 p-4 mt-8 bg-gray-100 rounded-lg shadow">
      {/* Previous button */}
      <button
        onClick={onPrev}
        disabled={!canGoPrev}
        className={`px-4 py-2 text-white font-semibold rounded-md transition-colors ${
          canGoPrev
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        &larr; Previous
      </button>

      {/* Current page indicator */}
      <span className="text-lg font-bold text-gray-700">
        Page {currentPage}
      </span>

      {/* Next button */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`px-4 py-2 text-white font-semibold rounded-md transition-colors ${
          canGoNext
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Next &rarr;
      </button>
    </div>
  );
};
