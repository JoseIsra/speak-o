import { useState, useMemo } from 'react';
import speeches from '../data/speeches.json';

export function useCharacter() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateIndex = () => {
    setCurrentIndex((currentIndex) => currentIndex + 1);
  };

  const currentCharacter = useMemo(() => {
    return speeches.characters[currentIndex % speeches.characters.length];
  }, [currentIndex]);

  return {
    currentCharacter,
    updateIndex,
    currentIndex,
    totalCharacters: speeches.characters.length,
  };
}
