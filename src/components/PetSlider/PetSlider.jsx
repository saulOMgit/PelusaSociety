import React, { useState, useRef, useEffect } from 'react';
import './PetSlider.css';

const PetSlider = ({ pets = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);

  // Datos de ejemplo
  const defaultPets = [
    {
      id: 1,
      name: "Pepita",
      age: "4 años",
      breed: "Pug",
      gender: "Hembra",
      image: "/api/placeholder/200/200"
    },
    {
      id: 2,
      name: "Copito",
      age: "6 años",
      breed: "Samoyedo",
      gender: "Macho",
      image: "/api/placeholder/200/200"
    },
    {
      id: 3,
      name: "Luna",
      age: "2 años",
      breed: "Golden",
      gender: "Hembra",
      image: "/api/placeholder/200/200"
    },
    {
      id: 4,
      name: "Max",
      age: "3 años",
      breed: "Labrador",
      gender: "Macho",
      image: "/api/placeholder/200/200"
    },
    {
      id: 5,
      name: "Bella",
      age: "5 años",
      breed: "Husky",
      gender: "Hembra",
      image: "/api/placeholder/200/200"
    }
  ];

  const petData = pets.length > 0 ? pets : defaultPets;

  // Navegar a la siguiente ficha
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % petData.length);
  };

  // Navegar a la ficha anterior
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + petData.length) % petData.length);
  };

  // Manejar inicio de arrastre
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  // Manejar movimiento durante arrastre
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Manejar fin de arrastre
  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    snapToCard();
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    snapToCard();
  };

  // Ajustar a la carta más cercana
  const snapToCard = () => {
    const cardWidth = 240; // Ancho de cada carta + margen
    const newIndex = Math.round(sliderRef.current.scrollLeft / cardWidth);
    setCurrentIndex(Math.max(0, Math.min(newIndex, petData.length - 1)));
  };

  // Efecto para mantener sincronizado el scroll con el índice
  useEffect(() => {
    if (sliderRef.current) {
      const cardWidth = 240;
      sliderRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <div className="pet-slider-container">
      {/* Header */}
      <div className="pet-slider-header">
        <h2 className="pet-slider-title">¡Haz el match perfecto!</h2>
        <p className="pet-slider-subtitle">
          ¡Desliza para ver más pelusas!
        </p>
      </div>

      {/* Slider */}
      <div className="pet-slider-wrapper">
        <div
          ref={sliderRef}
          className={`pet-slider-track ${isDragging ? 'dragging' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {petData.map((pet, index) => (
            <div
              key={pet.id}
              className={`pet-card ${index === currentIndex ? 'active' : ''} ${index === currentIndex + 1 ? 'next' : ''}`}
            >
              <div className="pet-card-inner">
                <div className="pet-card-image">
                  <img src={pet.image} alt={pet.name} />
                </div>
                <div className="pet-card-info">
                  <h3>{pet.name}</h3>
                  <div className="pet-card-details">
                    <span>{pet.age}</span>
                    <span>{pet.breed}</span>
                    <span>{pet.gender}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <button
          onClick={prevSlide}
          className="pet-slider-nav prev"
          aria-label="Mascota anterior"
        >
          ←
        </button>

        <button
          onClick={nextSlide}
          className="pet-slider-nav next"
          aria-label="Siguiente mascota"
        >
          →
        </button>
      </div>

      {/* Footer */}
      <div className="pet-slider-footer">
        <button className="pet-slider-adopt-btn">
          <span>🐾</span> ¡Adopta!
        </button>
      </div>
    </div>
  );
};

export default PetSlider;