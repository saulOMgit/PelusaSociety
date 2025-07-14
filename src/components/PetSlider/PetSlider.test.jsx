import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PetSlider from './PetSlider';

// Mock de datos de prueba
const mockPets = [
  { id: '1', nombre: 'Pepita', tipo: 'Perro', imagen: 'pepita.jpg' },
  { id: '2', nombre: 'Beckham', tipo: 'Gato', imagen: 'beckham.jpg' },
];

// Mock global de fetch antes de cada test
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { id: '3', nombre: 'Luna', tipo: 'Perro', imagen: 'luna.jpg' }
      ])
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('PetSlider', () => {
  it('renderiza correctamente con las mascotas proporcionadas', () => {
    render(<PetSlider tipoMascota="Perro" muestra={mockPets} />);
    
    // Verifica que las mascotas se muestran
    expect(screen.getByText('Pepita')).toBeInTheDocument();
    expect(screen.getByText('Beckham')).toBeInTheDocument();
    
    // Verifica que los botones de navegación existen
    expect(screen.getByLabelText('Mascota anterior')).toBeInTheDocument();
    expect(screen.getByLabelText('Siguiente mascota')).toBeInTheDocument();
  });
});


