import React from 'react'
import './NavBar.css'
import img from '../../assets/azul.svg'
import ButtonFavorites from '../ButtonFavorites/ButtonFavorites'

const NavBar = () => { 

  return (
    <>
    <header className="navbar">
        <div className="navbar__container">
            <div className="logo__container">
             <img src={img} alt="logotipo" className="logo"/>
            </div>
            <ButtonFavorites 
            onClick={() => }/>
        </div>
    </header>
    </>
  )
}

export default NavBar