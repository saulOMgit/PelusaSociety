import React, { useState} from "react";
import './PetCard.css'

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
                    <svg className={`heart-icon ${isLiked ? 'liked' :''}`}
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 20.3l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
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
                    <span className="paw-icon">🐾</span>
                    ¡Adopta!
                </button>
            </div>
        </div>

    )
}

export default PetCard;