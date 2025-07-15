import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import './FavoritesPage.css';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import PetCard from '../components/PetCard/PetCard';

const FavoritesPage = () => {
    const { favorites } = useFavorites();

    return(
        <div className="page__container">
        <NavBar />
        <div className="page__content favorites__page">
            <div className="favorites__intro">
                <h2>Favoritos</h2>
                <p>Sabemos que te llevarías a casa a todas nuestras pelusas, pero aquí puedes ver las que has marcado como finalistas para ser el nuevo miembro de tu familia 😻</p>
            </div>
            {favorites.length === 0 ? (
                <p className="favorites__page--alert">Aún no has añadido ninguna pelusa a favoritos 😢</p>
            ) : (
                <div className="favorites__grid">
                    {favorites.map((pet) => (
                        <PetCard key={pet.id} {...pet} />
                    ))}
                </div>
            )}
        </div>
        <Footer />
        </div>
    );
};

export default FavoritesPage;