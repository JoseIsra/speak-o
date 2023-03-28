import { useState, useMemo, useEffect } from 'react';
import speeches from '../data/speeches.json';

export function useGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const updateIndex = () => {
    setCurrentIndex((currentIndex) => currentIndex + 1);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [currentIndex]);

  const resetIndex = () => {
    setCurrentIndex(0);
  };

  const currentCharacter = useMemo(() => {
    return speeches.characters[currentIndex % speeches.characters.length];
  }, [currentIndex]);

  return {
    resetIndex,
    loading,
    currentCharacter,
    updateIndex,
    currentIndex,
    totalCharacters: speeches.characters.length,
  };
}
