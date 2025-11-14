// src/pages/HomePage.tsx

import { CharacterList } from "../components/characters/CharacterList";
import { mockCharacters } from "../utils/mockData";

const HomePage: React.FC = () => {
  // Temporary mock data; will be replaced with API-based fetching
  const characters = mockCharacters;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Star Wars Characters
      </h1>

      <CharacterList characters={characters} />

      {/* TODO: Replace mock characters with real API fetching */}
    </div>
  );
};

export default HomePage;
