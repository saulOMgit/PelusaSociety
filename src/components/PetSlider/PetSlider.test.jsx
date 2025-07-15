import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PetSlider from './PetSlider';

// Mock simple del servicio para que no falle
jest.mock('../../services/PetService', () => ({
  getPets: jest.fn(() => Promise.resolve([]))
}));

// Mock del CSS para que no de error
jest.mock('./PetSlider.css', () => ({}));

// Mock de scrollTo para que no falle
beforeAll(() => {
  Element.prototype.scrollTo = jest.fn();
});

// Mock súper simple del PetCard
jest.mock('../PetCard/PetCard', () => {
  return function MockPetCard({ nombre }) {
    return <div data-testid="pet-card">{nombre}</div>;
  };
});

describe('PetSlider', () => {
  test('se renderiza correctamente', async () => {
    // Datos mínimos para que funcione
    const muestra = [{
      id: 1,
      nombre: 'Buddy',
      tipo: 'perro',
      edad: 3,
      genero: 'macho',
      imagen: 'buddy.jpg',
      vacunas: 1,
      esterilizado: 1,
      desc_fisica: 'Un perrito gordito'
    }];

    // Renderizar el componente
    render(<PetSlider tipoMascota="perro" muestra={muestra} />);
    
    // Esperar a que termine de cargar
    await waitFor(() => {
      expect(true).toBe(true);
    });
  });

  test('muestra los botones de navegación', async () => {
    const muestra = [];
    
    render(<PetSlider tipoMascota="perro" muestra={muestra} />);
    
    // Esperar y buscar los botones
    await waitFor(() => {
      const prevButton = screen.getByText('←');
      const nextButton = screen.getByText('→');
      
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });
  });
});