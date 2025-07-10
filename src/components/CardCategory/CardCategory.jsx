import React from 'react'
import './CardCategory.css'

const CardCategory = ({ category, image, title, onClick }) => {
  return (
<div className={`card-category card-category--${category}`} onClick={onClick}>
    <h2 className="card-category__title">{title}</h2>
    <div className="card-category__image-container">
    <img src={image} alt={title} className="card-category__image" />
    </div>
    </div>
  )
}

export default CardCategory