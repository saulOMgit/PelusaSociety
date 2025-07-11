import React from 'react'
import './ButtonFavorites.css'
import icon from '../../assets/fav.png'

const ButtonFavorites = ({ onClick }) => {
  return (

        <div className="buttonFavorites__container" onClick={onClick}>
            <img src={icon} alt="icono favoritos" className="icon"/>
            <button className="buttonFavorites">Favoritos</button>
        </div>
  )
}

export default ButtonFavorites