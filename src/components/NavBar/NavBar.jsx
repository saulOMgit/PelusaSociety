import React from 'react'
import './NavBar.css'
import img from '../../assets/positivo.svg'

const NavBar = () => {
  return (
    <>
    <header className="navbar">
        <div className="logo__container">
        <img src={img} alt="logotipo" className="logo"/>
        </div>
    </header>
    </>
  )
}

export default NavBar