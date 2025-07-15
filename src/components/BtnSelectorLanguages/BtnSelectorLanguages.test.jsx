import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Para los matchers extendidos como toBeInTheDocument
import { useTranslation } from 'react-i18next'; // Importa useTranslation real
import BtnSelectorLanguages from './BtnSelectorLanguages';

// Mockea useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('BtnSelectorLanguages', () => {
  const changeLanguageMock = jest.fn(); // Mockea la función changeLanguage

  beforeEach(() => {
    // Restablece el mock antes de cada test
    useTranslation.mockReturnValue({
      i18n: {
        language: 'es', // Idioma inicial por defecto para los tests
        changeLanguage: changeLanguageMock,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpia todos los mocks después de cada test
  });

  test('renderiza ambos botones de idioma', () => {
    render(<BtnSelectorLanguages />);

    // Verifica que los botones de español e inglés están en el documento
    expect(screen.getByAltText('boton español')).toBeInTheDocument();
    expect(screen.getByAltText('botón inglés')).toBeInTheDocument();
  });

  test('llama a changeLanguage con "es" cuando se hace clic en el botón de español', () => {
    render(<BtnSelectorLanguages />);

    const spanishButton = screen.getByAltText('boton español').closest('button');
    fireEvent.click(spanishButton);

    // Verifica que changeLanguage fue llamado con 'es'
    expect(changeLanguageMock).toHaveBeenCalledTimes(1);
    expect(changeLanguageMock).toHaveBeenCalledWith('es');
  });

  test('llama a changeLanguage con "en" cuando se hace clic en el botón de inglés', () => {
    render(<BtnSelectorLanguages />);

    const englishButton = screen.getByAltText('botón inglés').closest('button');
    fireEvent.click(englishButton);

    // Verifica que changeLanguage fue llamado con 'en'
    expect(changeLanguageMock).toHaveBeenCalledTimes(1);
    expect(changeLanguageMock).toHaveBeenCalledWith('en');
  });

  test('el botón de español tiene la clase activa cuando el idioma actual es "es"', () => {
    // Sobreescribe el idioma inicial para este test si es necesario, aunque ya está en 'es'
    useTranslation.mockReturnValue({
      i18n: {
        language: 'es',
        changeLanguage: changeLanguageMock,
      },
    });
    render(<BtnSelectorLanguages />);

    const spanishButton = screen.getByAltText('boton español').closest('button');
    expect(spanishButton).toHaveClass('language-switcher__button--active');

    const englishButton = screen.getByAltText('botón inglés').closest('button');
    expect(englishButton).not.toHaveClass('language-switcher__button--active');
  });

  test('el botón de inglés tiene la clase activa cuando el idioma actual es "en"', () => {
    // Para este test, mockeamos el idioma inicial a 'en'
    useTranslation.mockReturnValue({
      i18n: {
        language: 'en',
        changeLanguage: changeLanguageMock,
      },
    });
    render(<BtnSelectorLanguages />);

    const englishButton = screen.getByAltText('botón inglés').closest('button');
    expect(englishButton).toHaveClass('language-switcher__button--active');

    const spanishButton = screen.getByAltText('boton español').closest('button');
    expect(spanishButton).not.toHaveClass('language-switcher__button--active');
  });
});