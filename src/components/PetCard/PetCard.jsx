import React, { useState} from "react";
import './PetCard.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faHeart } from '@fortawesome/free-solid-svg-icons'; 


const PetCard = ({ 
    name, 
    image, 
    age,
    breed, 
    gender,
    onToggleLike,
    isLiked: initialLiked = false,
    onAdopt,
    type,
}) => {

    const [isLiked, setIsLiked] = useState(initialLiked);

    const handleLikeClick = () => {
        const newLikeState = !isLiked;
        setIsLiked(newLikeState);
        if (onToggleLike) {
            onToggleLike(name, newLikeState);
        }
    };

    const handleAdoptClick = () => {
        if (onAdopt) {
            onAdopt(name);
        }
    };

    const imageContainerBackgroundClass =
        type === 'dog' ? 'dog-image-background' : type === 'cat' ? 'cat-image-background' : '';
    
    return (
        <div className="adoption-card">
            <div className={`image-container ${imageContainerBackgroundClass}`}>
                <img
                 src={image}
                 alt={`${name} - ${breed}`} 
                 className="pet-image"
                />

                <button onClick={handleLikeClick} className="heart-button">
                    <FontAwesomeIcon icon={faHeart} className={`heart-icon ${isLiked ? 'liked' :''}`} />
                    
                </button>

                <div className="text-overlay">
                    <h2 className="pet-name">{name}</h2>
                    <div className="tags">
                        <span className="tag">{age}</span>
                        <span className="tag">{gender}</span>
                        <span className="tag">{breed}</span>
                        
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

export default PetCard;