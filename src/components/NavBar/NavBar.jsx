import React from 'react'
import './NavBar.css'
import imgLight from '../../assets/azul.svg'
import imgDark from '../../assets/negativo.svg'
import icon from '../../assets/fav.png'

const NavBar = ({theme}) => {
  return (
    <>
    <header className="navbar">
        <div className="navbar__container">
            <div className="logo__container">
             <img src={theme === 'light' ? imgLight : imgDark} alt="logotipo" className="logo"/>
            </div>
            <div className="buttonFavorites__container">
                <img src={icon} alt="icono favoritos" className="icon"/>
                <button className="buttonFavorites">Favoritos</button>
            </div>
        </div>
    </header>
    </>
  )
}

export default NavBar