import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import './FavoritesPage.css';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import PetCard from '../components/PetCard/PetCard';
import { useTranslation } from 'react-i18next';

import useTheme from '../hooks/useTheme';
import Dropdown from '../components/Btn/Dropdown';

const FavoritesPage = () => {
    const { t } = useTranslation();
    const { favorites } = useFavorites();
    const [theme] = useTheme();

    return(
        <div className="page__container" data-theme={theme}>
        <NavBar  theme={theme}/>
        <div className="page__content favorites__page">
            <div className="favorites__intro">
                <h2 className='favorites_intro__heading'>{t('FavoritesPage.title')}</h2>
                <p className='favorites_intro__paragraph'>{t('FavoritesPage.paragraph')}</p>
            </div>
            {favorites.length === 0 ? (
                <p className="favorites__page--alert--paragraph">{t('FavoritesPage.alertParagraph')}</p>
            ) : (
                <div className="favorites__grid">
                    {favorites.map((pet) => (
                        <PetCard key={pet.id} {...pet} />
                    ))}
                </div>
            )}
        </div>
        <Dropdown></Dropdown>
        <Footer />
        </div>
    );
};

export default FavoritesPage;