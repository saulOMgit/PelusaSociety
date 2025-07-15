import React from 'react'
import './ButtonFavorites.css'
import iconLight from '../../assets/favDark.png'
import iconDark from '../../assets/fLight.png'

const ButtonFavorites = ({ onClick, theme }) => {

  return (

        <div className="buttonFavorites__container" onClick={onClick}>
            <img src={theme === 'light' ? iconLight : iconDark} alt="icono favoritos" className="icon"/>
            <button className="buttonFavorites">Favoritos</button>
        </div>
        
  )
}

export default ButtonFavorites