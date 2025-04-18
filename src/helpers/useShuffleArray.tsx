"use client";
import { useEffect, useState } from "react";

export const useShuffleArray = (array: any[]) => {
  const [shuffledArray, setShuffledArray] = useState<any[]>(array);

  useEffect(() => {
    // Make sure to shuffle the array only on the client (after mounting)
    if (typeof window !== "undefined") {
      // Create a copy of the array to avoid mutation
      const newArray = [...array];

      // Shuffle array using the Fisher-Yates algorithm
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }

      setShuffledArray(newArray);
    }
  }, [array]); // Re-run the effect if the input array changes

  return shuffledArray;
};
