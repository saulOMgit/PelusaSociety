import React, { useState, useRef, useEffect } from "react";
import { ChevronUp, Moon, Sun, Globe, PawPrint, LanguagesIcon, Check } from 'lucide-react';
import './Dropdown.css'
import useTheme from "../../hooks/useTheme";
import { useTranslation } from 'react-i18next'; // <-- Add this line
import BtnSelectorLanguages from "../BtnSelectorLanguages/BtnSelectorLanguages";

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('Spanish');
    const dropdownRef = useRef(null);

    const [theme, toggleTheme] = useTheme();
    const isDarkTheme = theme === 'dark';

    const { i18n } = useTranslation();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setIsOpen(false); // Close dropdown after selection
    };

    const supportedLanguages = [
        { code: 'es', name: 'Español', icon: '/src/img/spanish.svg' }, // Adjust paths as needed
        { code: 'en', name: 'English', icon: '/src/img/english.svg' }
        // Add more languages as needed
    ];

    return (
        <div className="page-wrapper">
            <div className="dropdown" ref={dropdownRef}>
                <div className="dropdown__wrapper">
                    <button onClick={() => setIsOpen(!isOpen)}
                        className={`dropdown__button ${isOpen ? 'dropdow_button--active' : ''}`}>
                        <div className="dropdown__icon">
                            {isDarkTheme ? (<PawPrint
                                size={24} // Puedes ajustar el tamaño aquí (por defecto es 24) 
                                className="dropdown__svg"
                            />) : (<PawPrint size={24} className="dropdown__svg" />)}
                        </div>
                    </button>

                    {isOpen && (
                        <div className="dropdown__menu">
                            
                                <div className="dropdown__content">
                                    <button onClick={toggleTheme}
                                        className="dropdown__item">
                                        <div className="dropdown__item-icon">
                                            {isDarkTheme ? (<Sun className="dropdow__icon-svg" />)
                                                : (<Moon className="dropdown__icon-svg " />)}
                                        </div>
                                        <span className="dropdown__item-text">
                                            {isDarkTheme ? 'Cambiar modo claro' : 'Cambiar modo oscuro'}
                                        </span>
                                    </button>
                                    <div className="dropdown__divider">
                                        <div className="dropdown__section">
                                            <div className="dropdown__section-header">
                                                <Globe className="dropdown__icon-svg" />
                                                <span className="dropdown__section-title">Idiomas</span>
                                            </div>
                                            <div className="dropdown__language-list">
                                                {supportedLanguages.map((lang) => (
                                                    <button key={lang.code}
                                                        onClick={() => handleChangeLanguage(lang.code)}
                                                        className={`dropdown__language-item ${i18n.language === lang.code ? 'dropdown__language-item--active' : ''}`}
                                                    >
                                                        <span className="dropdown__language-name">{lang.name}</span>
                                                        {i18n.language === lang.code && (
                                                            <div className="dropdown__checkmark">
                                                                <Check size={18}/>
                                                            </div>
                                                        )}
                                                    </button>
                                                )
                                                )}
                                            </div>
                                        </div>

                                    </div>
                            
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )


}

export default Dropdown;
