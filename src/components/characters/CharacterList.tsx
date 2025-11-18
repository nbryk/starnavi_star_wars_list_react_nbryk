import { CharacterCard } from "./CharacterCard";
import type { Person } from "../../types/sw";

interface CharacterListProps {
  characters: Person[];
}

export const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  if (characters.length === 0) {
    return (
      <p className="text-center text-xl text-gray-500">No characters found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {characters.map((person) => (
        <CharacterCard key={person.url} person={person} />
      ))}
    </div>
  );
};
