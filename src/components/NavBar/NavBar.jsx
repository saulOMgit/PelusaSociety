import React from 'react'
import './NavBar.css'
import imgLight from '../../assets/azul.svg'
import imgDark from '../../assets/negativo.svg'
import iconLight from '../../assets/fav.png'
import iconDark from '../../assets/fLight.png'
import img from '../../assets/azul.svg'
import ButtonFavorites from '../ButtonFavorites/ButtonFavorites'
import BtnSelectorLanguages from '../BtnSelectorLanguages/BtnSelectorLanguages'

const NavBar = ({theme}) => { 

  return (
    <>
    <header className="navbar">
        <div className="navbar__container">
            <div className="logo__container">
             <img src={theme === 'light' ? imgLight : imgDark} alt="logotipo" className="logo"/>
            </div>
            <div className="buttonFavorites__container">
                <img src={theme === 'light' ? iconLight : iconDark} alt="icono favoritos" className="icon"/>
                <button className="buttonFavorites">Favoritos</button>
            </div>
            <ButtonFavorites />
             <BtnSelectorLanguages />
        </div>
    </header>
    </>
  )
}

export default NavBar