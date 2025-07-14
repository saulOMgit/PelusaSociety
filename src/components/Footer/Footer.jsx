import { useTranslation } from 'react-i18next';
import instagram from '../../img/instagram.svg';
import tools from '../../img/tools.svg';
import './footer.css'

const Footer = () => {
  const { t } = useTranslation();

  const links = [
    { key: 'Comunas', href: 'https://huachitos.cl/comunas' },
    { key: 'Preguntasfrecuentes', href: 'https://huachitos.cl/preguntas-frecuentes' },
    { key: 'Terminosdelacomunidad', href: 'https://huachitos.cl/terminos-comunidad' },
    { key: 'Politicasdeprivacidad', href: 'https://huachitos.cl/politicas-privacidad' },
    { key: 'Contacto', href: 'https://github.com/saulOMgit/PelusaSociety' }
  ];

 return (
    <div className="footer"> 
      <div className="footer-container">
        {links.map(link => (
          <a key={link.key} href={link.href}>
            {t(`footer.${link.key}`)}
          </a>
        ))}

        <a href="https://www.instagram.com/huachitos.cl/#">
          <img src={instagram} alt="icono instagram" className="instagram" />
        </a>

        <a href="https://huachitos.cl/docs">
          <img src={tools} alt="icono api" className="api" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
