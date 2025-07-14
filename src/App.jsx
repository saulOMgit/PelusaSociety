import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
  <FavoritesProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/favoritos" element={<FavoritesPage />} />
    </Routes>
  </FavoritesProvider>
  );
}

export default App;