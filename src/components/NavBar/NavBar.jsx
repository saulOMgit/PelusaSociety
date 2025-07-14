import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NavBar.css'
import img from '../../assets/azul.svg'
import ButtonFavorites from '../ButtonFavorites/ButtonFavorites'

const NavBar = () => { 
  const navigate = useNavigate()

  return (
    <>
    <header className="navbar">
        <div className="navbar__container">
            <div className="logo__container">
             <img src={img} alt="logotipo" className="logo"/>
            </div>
            <ButtonFavorites onClick={() => navigate('/favoritos')}/>
        </div>
    </header>
    </>
  )
}

export default NavBar