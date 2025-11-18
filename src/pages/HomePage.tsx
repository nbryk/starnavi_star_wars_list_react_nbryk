import { CharacterList } from "../components/characters/CharacterList";
import { PaginationControls } from "../components/common/PaginationControls";
import { useCharactersData } from "../hooks/useCharactersData";

const HomePage: React.FC = () => {
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

  if (error) {
    return (
      <div className="text-center p-8 text-red-600 font-bold">{error}</div>
    );
  }

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
