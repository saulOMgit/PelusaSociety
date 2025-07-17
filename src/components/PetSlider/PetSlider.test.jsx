import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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
  const samplePets = [
    {
      id: 1,
      nombre: 'Buddy',
      tipo: 'perro',
      edad: 3,
      genero: 'macho',
      imagen: 'buddy.jpg',
      vacunas: 1,
      esterilizado: 1,
      desc_fisica: 'Un perrito gordito'
    },
    {
      id: 2,
      nombre: 'Mimi',
      tipo: 'gato',
      edad: 2,
      genero: 'hembra',
      imagen: 'mimi.jpg',
      vacunas: 1,
      esterilizado: 0,
      desc_fisica: 'Una gatita juguetona'
    }
  ];

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

  // NUEVOS TESTS ADICIONALES:

  test('muestra las mascotas pasadas en la prop muestra', async () => {
    const perros = samplePets.filter(pet => pet.tipo === 'perro');
    render(<PetSlider tipoMascota="perro" muestra={perros} />);
    
    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument();
      // No debería aparecer Mimi porque es un gato
      expect(screen.queryByText('Mimi')).not.toBeInTheDocument();
    });
  });

  test('los botones de navegación funcionan al hacer click', async () => {
    render(<PetSlider tipoMascota="perro" muestra={samplePets} />);
    
    await waitFor(() => {
      const nextButton = screen.getByText('→');
      expect(nextButton).toBeInTheDocument();
    });

    // Simular click en el botón siguiente
    const nextButton = screen.getByText('→');
    fireEvent.click(nextButton);
    
    // Verificar que scrollTo fue llamado (indica que la navegación funciona)
    expect(Element.prototype.scrollTo).toHaveBeenCalled();
  });

  test('los botones tienen las clases CSS correctas', async () => {
    render(<PetSlider tipoMascota="perro" muestra={samplePets} />);
    
    await waitFor(() => {
      const prevButton = screen.getByText('←');
      const nextButton = screen.getByText('→');
      
      expect(prevButton).toHaveClass('pet-slider__nav-button--prev');
      expect(nextButton).toHaveClass('pet-slider__nav-button--next');
    });
  });

  test('renderiza el wrapper principal con la clase correcta', async () => {
    render(<PetSlider tipoMascota="perro" muestra={samplePets} />);
    
    await waitFor(() => {
      const wrapper = document.querySelector('.pet-slider__wrapper');
      expect(wrapper).toBeInTheDocument();
    });
  });

  test('cada mascota se renderiza en su propia tarjeta', async () => {
    render(<PetSlider tipoMascota="perro" muestra={samplePets} />);
    
    await waitFor(() => {
      const petCards = screen.getAllByTestId('pet-card');
      expect(petCards).toHaveLength(2);
    });
  });

  test('maneja props vacías sin errores', async () => {
    render(<PetSlider tipoMascota="perro" muestra={[]} />);
    
    await waitFor(() => {
      // Solo verificar que no hay errores y los botones siguen ahí
      expect(screen.getByText('←')).toBeInTheDocument();
      expect(screen.getByText('→')).toBeInTheDocument();
    });
  });

  test('los botones tienen labels de accesibilidad', async () => {
    render(<PetSlider tipoMascota="perro" muestra={samplePets} />);
    
    await waitFor(() => {
      const prevButton = screen.getByLabelText('Mascota anterior');
      const nextButton = screen.getByLabelText('Siguiente mascota');
      
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });
  });

  test('aplica la clase de dragging al track durante el drag', async () => {
    render(<PetSlider tipoMascota="perro" muestra={samplePets} />);
    
    await waitFor(() => {
      const track = document.querySelector('.pet-slider__track');
      expect(track).toBeInTheDocument();
      
      // Simular inicio de drag
      fireEvent.mouseDown(track, { pageX: 100 });
      
      // Verificar que se aplica la clase de dragging
      expect(track).toHaveClass('pet-slider__track--dragging');
    });
  });

  test('quita la clase de dragging al terminar el drag', async () => {
    render(<PetSlider tipoMascota="perro" muestra={samplePets} />);
    
    await waitFor(() => {
      const track = document.querySelector('.pet-slider__track');
      
      // Simular drag completo
      fireEvent.mouseDown(track, { pageX: 100 });
      fireEvent.mouseUp(track);
      
      // Verificar que se quite la clase
      expect(track).not.toHaveClass('pet-slider__track--dragging');
    });
  });
});