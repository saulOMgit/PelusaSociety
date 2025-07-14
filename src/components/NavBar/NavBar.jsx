import React from 'react'
import './NavBar.css'
import img from '../../assets/azul.svg'
import icon from '../../assets/fav.png'
import { useTranslation } from 'react-i18next'
import BtnSelectorLanguages from '../BtnSelectorLanguages/BtnSelectorLanguages'

const NavBar = () => {
  const { t } = useTranslation();

  return (
    <>
      <header className="navbar">
        <div className="navbar__container">
          <div className="logo__container">
            <img src={img} alt="logotipo" className="logo"/>
          </div>

          <div className="buttonFavorites__container">
            <img src={icon} alt="icono favoritos" className="icon"/>
            <button className="buttonFavorites">{t('favorites')}</button>
          </div>

          <BtnSelectorLanguages />
        </div>
      </header>
    </>
  )
}

export default NavBar
