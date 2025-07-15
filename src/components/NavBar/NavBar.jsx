import React from 'react'
import './NavBar.css'
import imgLight from '../../assets/azul.svg'
import imgDark from '../../assets/negativo.svg'
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
            <ButtonFavorites theme={theme}/>
             <BtnSelectorLanguages />
        </div>
    </header>
    </>
  )
}

export default NavBar