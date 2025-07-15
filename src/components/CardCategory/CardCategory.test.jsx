import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardCategory from './CardCategory';
import '@testing-library/jest-dom';

describe('CardCategory Component', () => {
  // Test 1: Renderizado básico
  it('renderiza correctamente con las props dadas', () => {
    render(
      <CardCategory
        category="cat"
        title="Gatos"
        image="cat.png"
        onClick={() => {}}
      />
    );

    // Verifica que el título se muestra
    expect(screen.getByText('Gatos')).toBeInTheDocument();
    
    // Verifica que la imagen tiene el src correcto
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'cat.png');
    expect(image).toHaveAttribute('alt', 'Gatos');
  });

  // Test 2: Clases CSS según la categoría
  it('aplica la clase CSS correcta según la categoría', () => {
    render(
      <CardCategory
        category="dog"
        title="Perros"
        image="dog.png"
        onClick={() => {}}
      />
    );

    // Verifica que el contenedor tiene la clase correcta
    const card = screen.getByTestId('card-category');
    expect(card).toHaveClass('card-category--dog');
  });

  // Test 3: Comportamiento onClick
  it('llama a onClick cuando se hace clic', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <CardCategory
        category="cat"
        title="Gatos"
        image="cat.png"
        onClick={handleClick}
      />
    );

    // Simula un click en el componente
    await user.click(screen.getByTestId('card-category'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});