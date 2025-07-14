import React, { useState, useCallback, useMemo } from "react";
import './PetCard.css'
import Btn from '../Btn/Btn'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faHeart } from '@fortawesome/free-solid-svg-icons';

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
    nombre,
    tipo,
    edad,
    genero,
    imagen,
    desc_fisica,
    vacunas,
    esterilizado,
    onToggleLike,
    isLiked = false,
    onAdopt
}) => {
    // Solo necesitamos estado para el flip de la carta
    const [isFlipped, setIsFlipped] = useState(false);

    // ✅ Handlers memoizados
    const handleLikeClick = useCallback((e) => {
        e.stopPropagation();
        // Llamar directamente al callback del padre con el estado contrario
        if (onToggleLike) {
            onToggleLike(nombre, !isLiked);
        }
    }, [onToggleLike, nombre, isLiked]);

    const handleAdoptClick = useCallback(() => {
        if (onAdopt) {
            onAdopt({ nombre, imagen });
        }
    }, [onAdopt, nombre, imagen]);

    const handleCardClick = useCallback(() => {
        setIsFlipped(prev => !prev);
    }, []);

    const handleBackClick = useCallback((e) => {
        e.stopPropagation();
        setIsFlipped(false);
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