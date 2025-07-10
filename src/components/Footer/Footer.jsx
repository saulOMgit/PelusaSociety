import React from 'react';
import './Footer.css';
import instagram from '../../img/instagram.svg';
import tools from '../../img/tools.svg';


const Footer = () => {
      return (
    <footer className='footer'>
    <div className='links-container'>
        <a href="https://huachitos.cl/comunas">Comunas</a>
        <a href="https://huachitos.cl/favoritos">Favoritos</a>
        <a href="https://huachitos.cl/preguntas-frecuentes">Preguntas Frecuentes</a>
        <a href="https://huachitos.cl/terminos-comunidad">Términos de la comunidad</a>
        <a href="https://huachitos.cl/politicas-privacidad">Políticas de privacidad</a>
        <a href="https://huachitos.cl/kit-marca">Kit de marca</a>
        <a href="https://github.com/saulOMgit/PelusaSociety">contacto</a>
        <a href='https://www.instagram.com/huachitos.cl/#'><img src={instagram} alt="icono instagram"  className="instagram" /></a>
        <a href='https://huachitos.cl/docs'><img src={tools} alt='icono api' className='api' /></a>
    </div>  
    </footer>
  );

 
}

export default Footer;
