import { useState, useEffect } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event) => setMatches(event.matches);

    setMatches(mediaQueryList.matches); // Inizializza il valore
    mediaQueryList.addEventListener("change", handleChange); // Aggiungi listener

    return () => mediaQueryList.removeEventListener("change", handleChange); // Pulisci
  }, [query]);

  return matches;
};