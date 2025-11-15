//src/components/characters/HeroImage.tsx

import React, { useState } from "react";

interface HeroImageProps {
  id: number; // Character ID used in the image URL
  name: string; // Used for the alt attribute
  className?: string;
}

const BASE_URL = "https://starwars-visualguide.com/assets/img/characters";

/**
 * Simple gray placeholder (base64 SVG) used if the image fails to load.
 */
const FALLBACK_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY2NjY2Ii8+PC9zdmc+";

export const HeroImage: React.FC<HeroImageProps> = ({
  id,
  name,
  className = "",
}) => {
  // Actual image URL
  const initialSrc = `${BASE_URL}/${id}.jpg`;
  const [imgSrc, setImgSrc] = useState(initialSrc);

  // Prevents infinite onError loop if fallback also fails
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(FALLBACK_URL);
      setHasError(true);
    }
  };

  // When using fallback, adjust object-fit for better display
  const finalClassName = hasError ? `${className} object-contain` : className;

  return (
    <img
      src={imgSrc}
      alt={name}
      className={finalClassName}
      onError={handleError}
      style={{ borderRadius: 8 }}
    />
  );
};
