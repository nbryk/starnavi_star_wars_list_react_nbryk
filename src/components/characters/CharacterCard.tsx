//src/components/characters/CharacterCard.tsx

import { Link } from "react-router-dom";
import type { Person } from "../../types/sw";
import { HeroImage } from "./HeroImage";

/**
 * Extracts numeric ID from SW API URL
 * Example: "https://.../people/1/" → 1
 */
const getIdFromUrl = (url: string): number => {
  const idString = url.split("/").filter(Boolean).pop();
  return idString ? parseInt(idString, 10) : 0;
};

interface CharacterCardProps {
  person: Person;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ person }) => {
  const personId = getIdFromUrl(person.url);
  const detailPath = `/characters/${personId}`;

  return (
    <div
      className="
    bg-white rounded-lg shadow-xl p-4
    flex flex-col items-center
    border border-gray-200
    transition-transform duration-300 hover:scale-[1.03]"
    >
      {/* Character image with fallback */}
      <HeroImage
        id={personId}
        name={person.name}
        className="w-full aspect-square object-cover mb-4 rounded-md"
      />

      {/* Basic info */}
      <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2 text-center">
        {person.name}
      </h3>
      <p className="text-sm text-gray-500 mb-4">Gender: {person.gender}</p>

      {/* Link to details page */}
      <Link
        to={detailPath}
        className="w-full text-center py-2 px-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-600 transition duration-150"
      >
        View Details
      </Link>
    </div>
  );
};
