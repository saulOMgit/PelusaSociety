import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PetCard from './PetCard';

// Mock simple del contexto de favoritos
const mockDispatch = jest.fn();
jest.mock('../../context/FavoritesContext', () => ({
  useFavorites: () => ({
    favorites: [],
    dispatch: mockDispatch
  })
}));

// Mock simple del botón
jest.mock('../Btn/Btn', () => {
  return function MockBtn({ onClick, petData }) {
    return <button onClick={() => onClick(petData)}>Adoptar</button>;
  };
});

// Mock simple de FontAwesome
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span>♥</span>
}));

describe('PetCard - Tests Básicos', () => {
  const petData = {
    id: 1,
    nombre: 'Jacinto',
    tipo: 'Perro',
    edad: '2 años',
    genero: 'Macho',
    imagen: 'https://ejemplo.com/jacinto.jpg',
    desc_fisica: 'Un perrito gordito',
    vacunas: true,
    esterilizado: true,
    onAdopt: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza el nombre de la mascota', () => {
    render(<PetCard {...petData} />);
    expect(screen.getAllByText('Jacinto')[0]).toBeInTheDocument();
  });

  test('renderiza la edad y sexo', () => {
    render(<PetCard {...petData} />);
    expect(screen.getByText('2 años')).toBeInTheDocument();
    expect(screen.getByText('Macho')).toBeInTheDocument();
  });

  test('renderiza la imagen con alt text correcto', () => {
    render(<PetCard {...petData} />);
    const image = screen.getByAltText('Jacinto');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', petData.imagen);
  });

  test('voltea la tarjeta al hacer clic', () => {
    const { container } = render(<PetCard {...petData} />);
    const card = container.querySelector('.adoption-card__inner');
    
    fireEvent.click(card);
    
    expect(card).toHaveClass('adoption-card__inner--flipped');
  });

  test('muestra información del reverso al voltear', () => {
    const { container } = render(<PetCard {...petData} />);
    const card = container.querySelector('.adoption-card__inner');
    
    fireEvent.click(card);
    
    expect(screen.getByText('Esterilizado')).toBeInTheDocument();
    expect(screen.getByText('Vacunado')).toBeInTheDocument();
    expect(screen.getByText('Un perrito gordito')).toBeInTheDocument();
  });

  test('llama a onAdopt cuando se hace clic en adoptar', () => {
    render(<PetCard {...petData} />);
    const adoptButton = screen.getByText('Adoptar');
    
    fireEvent.click(adoptButton);
    
    expect(petData.onAdopt).toHaveBeenCalledWith({
      nombre: 'Jacinto',
      imagen: 'https://ejemplo.com/jacinto.jpg'
    });
  });

  test('despacha acción de favorito al hacer clic en corazón', () => {
    render(<PetCard {...petData} />);
    const heartButton = screen.getByText('♥').closest('button');
    
    fireEvent.click(heartButton);
    
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'TOGGLE_FAVORITE',
      payload: expect.objectContaining({
        id: 1,
        nombre: 'Jacinto'
      })
    });
  });
});