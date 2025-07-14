import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import './FavoritesPage.css';
import PetCard from '../components/PetCard/PetCard';

const FavoritesPage = () => {
    const { favorites } = useFavorites();

    return(
        <div className="favorites-page">
            <div className="favorites-intro">
                <h2>Favoritos</h2>
                <p>Sabemos que te llevarías a casa a todas nuestras pelusas, pero aquí puedes ver las que has marcado como finalistas para ser el nuevo miembro de tu familia 😻</p>
            </div>

            {favorites.length === 0 ? (
                <p>Aún no has añadido ninguna pelusa a favoritos</p>
            ) : (
                <div className="favorites-grid">
                    {favorites.map((pet) => (
                        <PetCard key={pet.id} {...pet} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;