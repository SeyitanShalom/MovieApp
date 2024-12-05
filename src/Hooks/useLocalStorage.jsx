import React, { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [Favorites, setFavourites] = useState(
    localStorage.getItem(key) ? localStorage.getItem(key) : "initialValue"
  );
  useEffect(() => {
    localStorage.setItem(key, Favorites);
  }, [Favorites]);
  return [favourites, key];
}
