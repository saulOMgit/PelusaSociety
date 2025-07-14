import React, { useState } from "react";
import { useFavorites } from '../../context/FavoritesContext'
import './PetCard.css'
import Btn from '../Btn/Btn'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faHeart } from '@fortawesome/free-solid-svg-icons';

const PetCard = ({
    id,
    nombre,
    tipo,
    edad,
    genero,
    imagen,
    desc_fisica,
    vacunas,
    esterilizado,
    onAdopt
}) => {

    const { favorites, dispatch } = useFavorites();

    const [isFlipped, setIsFlipped] = useState(false);

    const isLiked = favorites.some(pet => pet.id === id);


    const handleLikeClick = (e) => {
        e.stopPropagation(); //evita que se voltee al hacer click en corazon

        dispatch({
            type: "TOGGLE_FAVORITE",
            payload: {
                id,
                nombre,
                tipo,
                edad,
                genero,
                imagen,
                desc_fisica,
                vacunas,
                esterilizado
            }
        });
    };

    const handleAdoptClick = (petData) => {
        // e.stopPropagation();
        if (onAdopt) onAdopt(petData);
    };

    const handleCardClick = () => setIsFlipped(!isFlipped);
    const handleBackClick = (e) => {
        e.stopPropagation();
        setIsFlipped(false);
    };

    const imageContainerBackgroundClass =
        tipo === 'Perro' ? 'dog-image-background' : tipo === 'Gato' ? 'cat-image-background' : '';

    return (
        <div className="adoption-card">
            <div className={`card-inner ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
                <div className="card-front">
                    <div className={`image-container ${imageContainerBackgroundClass}`}>
                        <img
                            src={imagen}
                            alt={`${nombre}`}
                            className="pet-image"
                        />

                        <button onClick={handleLikeClick} className="heart-button">
                            <FontAwesomeIcon icon={faHeart} className={`heart-icon ${isLiked ? 'liked' : ''}`} />
                        </button>

                        <div className="text-overlay">
                            <h2 className="pet-name">{nombre}</h2>
                            <div className="tags">
                                <span className="tag">{edad}</span>
                                <span className="tag">{genero}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-back">
                    <div className={`back-info ${imageContainerBackgroundClass}`}>
                        <h2 className="pet-name">{nombre}</h2>
                        <div className="tags">
                            {esterilizado ? <span className="tag">Esterilizado</span> : ''}
                            {vacunas ? <span className="tag">Vacunado</span> : ''}
                        </div>
                        <p className="description-text">{desc_fisica}</p>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <Btn
                    onClick={handleAdoptClick}
                    petData={{ nombre, imagen}}
                />
                {/* <button className="adopt-button" onClick={handleAdoptClick}>
                    <FontAwesomeIcon icon={faPaw} className="paw-icon" />
                    ¡Adopta!
                </button> */}
            </div>
        </div>
    )
}

export default PetCard