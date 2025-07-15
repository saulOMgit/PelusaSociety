//import { Routes, Route } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import { FavoritesProvider } from './context/FavoritesContext';
import AdoptPage from './pages/AdoptPage';

function App() {
  return (
  <FavoritesProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/favoritos" element={<FavoritesPage />} />
      <Route path="/adopt" element={<AdoptPage />} />
    </Routes>
  </FavoritesProvider>
  );
 
}

export default App;