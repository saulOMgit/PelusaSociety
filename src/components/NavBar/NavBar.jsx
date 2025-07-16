import React from 'react'
import './NavBar.css'
import imgLight from '../../assets/azul.svg'
import imgDark from '../../assets/negativo.svg'
import ButtonFavorites from '../ButtonFavorites/ButtonFavorites'
import { Link } from 'react-router-dom'

const NavBar = ({theme}) => { 

  return (
    <>
    <header className="navbar">
        <div className="navbar__container">
            <div className="logo__container">
              <Link to="/">
             <img src={theme === 'light' ? imgLight : imgDark} alt="logotipo" className="logo"/>
             </Link>
            </div>
            <ButtonFavorites theme={theme}/>
             
        </div>
    </header>
    </>
  )
}

export default NavBar