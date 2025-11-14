//src/components/characters/HeroImage.tsx

import React from "react";

interface HeroImageProps {
  id: number; // Character ID used in the image URL
  name: string; // Used for the alt attribute
  className?: string;
}

export const HeroImage: React.FC<HeroImageProps> = ({
  id,
  name,
  className = "",
}) => {
  const baseUrl = "https://starwars-visualguide.com/assets/img/characters";

  /**
   * Simple gray placeholder (base64 SVG) used if the image fails to load.
   */
  const fallback =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY2NjY2Ii8+PC9zdmc+";

  return (
    <img
      src={`${baseUrl}/${id}.jpg`}
      alt={name}
      className={className}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = fallback;
      }}
      style={{ borderRadius: 8, objectFit: "cover" }}
    />
  );
};
