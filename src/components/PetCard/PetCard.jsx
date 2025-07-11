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
    isLiked = false, // ✅ Usar directamente la prop, no estado local
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

    // ✅ Clase CSS memoizada
    const imageContainerBackgroundClass = useMemo(() => {
        return tipo === 'Perro' ? 'dog-image-background' : 
               tipo === 'Gato' ? 'cat-image-background' : '';
    }, [tipo]);

    // ✅ Objeto petData memoizado para evitar recreación
    const petData = useMemo(() => ({
        nombre,
        imagen
    }), [nombre, imagen]);

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
                            {esterilizado && <span className="tag">Esterilizado</span>}
                            {vacunas && <span className="tag">Vacunado</span>}
                        </div>
                        <p className="description-text">{desc_fisica}</p>
                    </div>
                </div>
            </div>
            <div className="button-container">
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