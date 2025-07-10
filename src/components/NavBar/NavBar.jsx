import React from 'react'
import './NavBar.css'
import img from '../../assets/positivo.svg'
import icon from '../../assets/fav.png'

const NavBar = () => {
  return (
    <>
    <header className="navbar">
        <div className="navbar__container">
        <div className="logo__container">
        <img src={img} alt="logotipo" className="logo"/>
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