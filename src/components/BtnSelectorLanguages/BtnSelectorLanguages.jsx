import React from 'react';
import { useTranslation } from 'react-i18next'; 
import './BtnSelectorLanguages.css';
import spanish from'../../img/spanish.svg';
// import french from '../../img/french.svg'
import english from '../../img/english.svg'

function BtnSelectorLanguages() {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="language-switcher">
      <button
        className={`language-switcher__button ${i18n.language === 'es' ? 'language-switcher__button--active' : ''}`}
        onClick={() => handleChangeLanguage('es')}
      >
        <img src={spanish} alt="boton español" />

      </button>
      <button
        className={`language-switcher__button ${i18n.language === 'en' ? 'language-switcher__button--active' : ''}`}
        onClick={() => handleChangeLanguage('en')}
      >
        <img src={english} alt='botón inglés'></img>
      </button>
    </div>
  );
}

export default BtnSelectorLanguages;


