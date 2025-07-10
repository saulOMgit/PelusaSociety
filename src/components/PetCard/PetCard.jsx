import React, { useState } from "react";
import './PetCard.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faHeart } from '@fortawesome/free-solid-svg-icons';

const PetCard = ({
    nombre,
    tipo,
    edad,
    genero,
    imagen,
    desc_fisica,
    desc_personalidad,
    region,
    onToggleLike,
    isLiked: initialLiked = false,
    onAdopt
}) => {

    const [isLiked, setIsLiked] = useState(initialLiked);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleLikeClick = (e) => {
        e.stopPropagation(); //evita que se voltee al hacer click en corazon
        const newLikeState = !isLiked;
        setIsLiked(newLikeState);
        if (onToggleLike) {
            onToggleLike(nombre, newLikeState);
        }
    };

    const handleAdoptClick = (e) => {
        e.stopPropagation();
        if (onAdopt) {
            onAdopt(nombre);
        }
    };

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleBackClick = (e) => {
        e.stopPropagation();
        setIsFlipped(false)
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
                                <span className="tag">{region}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="card-back">
                    <div className={`back-info ${imageContainerBackgroundClass}`}>
                        <h2 className="pet-name">{nombre}</h2>
                        <div className="tags">
                            <span className="tag">{edad}</span>
                            <span className="tag">{genero}</span>
                            <span className="tag">{region}</span>
                        </div>
                        <p className="description-text">{desc_fisica}</p>
                        <p className="description-text">{desc_personalidad}</p>
                    </div>
                </div>
            </div>

            <div className="button-container">
                <button className="adopt-button" onClick={handleAdoptClick}>
                    <FontAwesomeIcon icon={faPaw} className="paw-icon" />
                    ¡Adopta!
                </button>
            </div>
        </div>
    )
}

export default PetCard