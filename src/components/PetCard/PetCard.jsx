import React, { useCallback, useMemo, useState } from "react";
import { useFavorites } from '../../context/FavoritesContext'
import './PetCard.css'
import Btn from '../Btn/Btn'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

// Función de comparación optimizada
const petCardPropsAreEqual = (prevProps, nextProps) => {
  // Lista de props primitivas a comparar
  const propsToCompare = [
    'nombre', 'tipo', 'edad', 'genero', 'imagen', 
    'desc_fisica', 'vacunas', 'esterilizado', 'isLiked'
  ];
  
  // Comparación rápida de props primitivas
  for (const prop of propsToCompare) {
    if (prevProps[prop] !== nextProps[prop]) {
      return false;
    }
  }
  
  return true;
};

const PetCard = React.memo(({
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
    const isLiked = favorites.some((pet) => pet.id === id); // usa la prop "id"


    const [isFlipped, setIsFlipped] = useState(false);

    //const isLiked = favorites.some(pet => pet.id === id);


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

    const handleCardClick = useCallback(() => {
        setIsFlipped(prev => !prev);
    }, []);

    // Clases BEM memoizadas
    const imageContainerClass = useMemo(() => {
        let baseClass = 'adoption-card__image-container';
        if (tipo === 'Perro') {
            baseClass += ' adoption-card__image-container--dog';
        } else if (tipo === 'Gato') {
            baseClass += ' adoption-card__image-container--cat';
        }
        return baseClass;
    }, [tipo]);

    const cardInnerClass = useMemo(() => {
        return `adoption-card__inner ${isFlipped ? 'adoption-card__inner--flipped' : ''}`;
    }, [isFlipped]);

    const heartIconClass = useMemo(() => {
        return `adoption-card__heart-icon ${isLiked ? 'adoption-card__heart-icon--liked' : ''}`;
    }, [isLiked]);

    const backInfoClass = useMemo(() => {
        let baseClass = 'adoption-card__back-info';
        if (tipo === 'Perro') {
            baseClass += ' adoption-card__image-container--dog';
        } else if (tipo === 'Gato') {
            baseClass += ' adoption-card__image-container--cat';
        }
        return baseClass;
    }, [tipo]);

    // Objeto petData memoizado para evitar recreación
    const petData = useMemo(() => ({
        nombre,
        imagen
    }), [nombre, imagen]);

    return (
        <div className="adoption-card">
            <div className={cardInnerClass} onClick={handleCardClick}>
                <div className="adoption-card__front">
                    <div className={imageContainerClass}>
                        <img
                            src={imagen}
                            alt={`${nombre}`}
                            className="adoption-card__pet-image"
                        />

                        <button onClick={handleLikeClick} className="adoption-card__heart-button">
                            <FontAwesomeIcon icon={faHeart} className={heartIconClass} />
                        </button>

                        <div className="adoption-card__text-overlay">
                            <h2 className="adoption-card__pet-name">{nombre}</h2>
                            <div className="adoption-card__tags">
                                <span className="adoption-card__tag">{edad}</span>
                                <span className="adoption-card__tag">{genero}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="adoption-card__back">
                    <div className={backInfoClass}>
                        <h2 className="adoption-card__pet-name">{nombre}</h2>
                        <div className="adoption-card__tags">
                            {esterilizado ? <span className="adoption-card__tag">Esterilizado</span> : ''}
                            {vacunas ? <span className="adoption-card__tag">Vacunado</span> : ''}
                        </div>
                        <p className="adoption-card__description-text">{desc_fisica}</p>
                    </div>
                </div>
            </div>
            <div className="adoption-card__button-container">
                <Btn
                    onClick={handleAdoptClick}
                    petData={petData}
                />
            </div>
        </div>
    );
}, petCardPropsAreEqual);

PetCard.displayName = 'PetCard';

export default PetCard;