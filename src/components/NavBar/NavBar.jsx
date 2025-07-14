import React from 'react'
import './NavBar.css'
import img from '../../assets/azul.svg'

import icon from '../../assets/fav.png'
import { useTranslation } from 'react-i18next'
import BtnSelectorLanguages from '../BtnSelectorLanguages/BtnSelectorLanguages'

const NavBar = () => {
  const { t } = useTranslation();

// Parte combinada
import ButtonFavorites from '../ButtonFavorites/ButtonFavorites'

const NavBar = () => { 

  return (
    <>
      <header className="navbar">
        <div className="navbar__container">
            <img src={img} alt="logotipo" className="logo"/>
          </div>

          <div className="buttonFavorites__container">
            <img src={icon} alt="icono favoritos" className="icon"/>
            <button className="buttonFavorites">{t('favorites')}</button>
          </div>

          <BtnSelectorLanguages />
// Parte combinada
            <div className="logo__container">
             <img src={img} alt="logotipo" className="logo"/>
            </div>
            <ButtonFavorites />
        </div>
      </header>
    </>
  )
}

export default NavBar
