import { createContext, useContext, useReducer, useEffect } from "react";
import { favoritesReducer, initialState } from "./FavoritesReducer";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    initialState,
    () => {
      // Aquí cargamos desde localStorage al iniciar
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : initialState;
    }
  );

  // Cada vez que favorites cambie, lo guardamos en localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
