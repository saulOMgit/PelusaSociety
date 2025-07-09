import React from 'react'
import './CardCategory.css'

const CardCategory = ({ category, image, title }) => {
  return (
    <div className={`card-category ${category}`}>
    <h2 className="title">{title}</h2>
    <img src={image} alt={title} className="card-image" />
    </div>
  )
}

export default CardCategory