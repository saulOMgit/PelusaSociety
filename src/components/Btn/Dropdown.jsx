import React, { useState, useRef, useEffect } from "react";
import { ChevronUp, Moon, Sun, Globe, PawPrint, LanguagesIcon, Check } from 'lucide-react';
import './Dropdown.css'
import '../../hooks/useTheme'
import useTheme from "../../hooks/useTheme";

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('Spanish');
    const dropdownRef = useRef(null);

    const [theme, toggleTheme] = useTheme();
    const isDarkTheme = theme === 'dark';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const language = ['English', 'Spanish'];
    const changeLanguage = (selectedLanguage) => {
        setCurrentLanguage(selectedLanguage);
        setIsOpen(false)
    }

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
                                                {language.map((language) => (
                                                    <button key={language}
                                                        onClick={() => changeLanguage(language)}
                                                        className={`dropdown__language-item ${currentLanguage === language ? 'dropdown__language-item--active' : ''}`}
                                                    >
                                                        <span className="dropdown__language-name">{language}</span>
                                                        {currentLanguage === language && (
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
