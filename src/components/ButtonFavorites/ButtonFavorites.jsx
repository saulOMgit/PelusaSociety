import React from 'react'
import './ButtonFavorites.css'
import icon from '../../assets/fav.png'

const ButtonFavorites = () => {
  return (

        <div className="buttonFavorites__container">
            <img src={icon} alt="icono favoritos" className="icon"/>
            <button className="buttonFavorites">Favoritos</button>
        </div>
  )
}

export default ButtonFavorites