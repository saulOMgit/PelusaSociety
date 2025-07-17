import { useTranslation } from 'react-i18next';
import instagram from '../../img/instagram.svg';
import instagramWhite from '../../assets/instagramWhite.svg'
import tools from '../../assets/tools.svg';
import toolsWhite from '../../assets/toolsWhite.svg'
import './footer.css'

const Footer = ({theme}) => {
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
          <img src={theme === 'light' ? instagram : instagramWhite} alt="icono instagram" className="instagram" />
        </a>

        <a href="https://huachitos.cl/docs">
          <img src={theme === 'light' ? tools : toolsWhite} alt="icono api" className="api" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
