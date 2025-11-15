// src/pages/HomePage.tsx

import { CharacterList } from "../components/characters/CharacterList";
import { PaginationControls } from "../components/common/PaginationControls";
import { useCharactersData } from "../hooks/useCharactersData";
//import { mockCharacters } from "../utils/mockData";

const HomePage: React.FC = () => {
  // Load paginated characters using a custom hook
  const {
    characters,
    isLoading,
    error,
    currentPage,
    canGoNext,
    canGoPrev,
    goToNext,
    goToPrev,
  } = useCharactersData();

  // Initial loading state
  if (isLoading && currentPage === 1) {
    return <div className="text-center p-8">Loading heroes...</div>;
  }

  // Display error message if fetching failed
  if (error) {
    return (
      <div className="text-center p-8 text-red-600 font-bold">{error}</div>
    );
  }

  // Temporary mock data; will be replaced with API-based fetching
  //const characters = mockCharacters;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-yellow-500">
        Star Wars Heroes Directory
      </h1>

      <CharacterList characters={characters} />

      <PaginationControls
        currentPage={currentPage}
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
        onNext={goToNext}
        onPrev={goToPrev}
      />
    </div>
  );
};

export default HomePage;
