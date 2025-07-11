import React, { useState, useRef, useEffect, useCallback } from 'react';
import './PetSlider.css';
import { getPets } from '../../services/PetService';
import PetCard from '../PetCard/PetCard';

const PetSlider = ({ tipoMascota }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);
  const [petData, setPetData] = useState([]);

  // Obtener mascotas filtradas por tipo
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsFromAPI = await getPets();
        const mappedPets = petsFromAPI
          .filter(p => p.tipo === tipoMascota)
          .map(p => ({
            id: p.id,
            nombre: p.nombre,
            tipo: p.tipo,
            edad: p.edad,
            genero: p.genero,
            imagen: p.imagen,
            vacunas: p.vacunas,
            esterilizado: p.esterilizado,
            desc_fisica: p.desc_fisica.replace(/<p>|<\/p>/g, ''),
          }));
        setPetData(mappedPets);
      } catch (error) {
        console.error("No se pudieron cargar las mascotas desde la API.", error);
      }
    };

    fetchPets();
  }, [tipoMascota]);

  // Funciones de navegación
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % petData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + petData.length) % petData.length);
  };

  // Calcular y ajustar al índice de carta más cercano
  const snapToCard = useCallback(() => {
    const track = sliderRef.current;
    const card = track.querySelector('.pet-card');
    if (!card) return;

    const cardStyle = window.getComputedStyle(card);
    const cardWidth = card.offsetWidth + parseInt(cardStyle.marginRight, 10);
    const newIndex = Math.round(track.scrollLeft / cardWidth);
    setCurrentIndex(Math.max(0, Math.min(newIndex, petData.length - 1)));
  }, [petData.length]);

  // Drag con ratón
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    snapToCard();
  };

  // Drag con táctil (arreglado con listeners manuales)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleTouchStart = (e) => {
      e.preventDefault();
      setIsDragging(true);
      setStartX(e.touches[0].pageX - slider.offsetLeft);
      setScrollLeft(slider.scrollLeft);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      setIsDragging(false);
      snapToCard();
    };

    slider.addEventListener('touchstart', handleTouchStart, { passive: false });
    slider.addEventListener('touchmove', handleTouchMove, { passive: false });
    slider.addEventListener('touchend', handleTouchEnd);

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchmove', handleTouchMove);
      slider.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startX, scrollLeft, snapToCard]);

  // Scroll sincronizado al índice actual
  useEffect(() => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector('.pet-card');
      if (!card) return;

      const cardStyle = window.getComputedStyle(card);
      const cardWidth = card.offsetWidth + parseInt(cardStyle.marginRight, 10);

      sliderRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  // Resetear índice cuando cambia el tipo
  useEffect(() => {
    setCurrentIndex(0);
  }, [petData]);

  // Placeholder para lógica de favoritos/adopción
  const handleToggleLike = (nombre, isLiked) => {
    console.log(`${nombre} ${isLiked ? 'añadido a' : 'eliminado de'} favoritos`);
  };

  const handleAdopt = (nombre) => {
    console.log(`Iniciando proceso de adopción para ${nombre}`);
  };

  return (
    <div className="pet-slider-container">
      <div className="pet-slider-wrapper">
        <div
          ref={sliderRef}
          className={`pet-slider-track ${isDragging ? 'dragging' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {petData.map((pet, index) => (
            <div
              key={pet.id}
              className={`pet-card ${index === currentIndex ? 'active' : ''} ${index === currentIndex + 1 ? 'next' : ''}`}
            >
              <PetCard
                nombre={pet.nombre}
                tipo={pet.tipo}
                edad={pet.edad}
                genero={pet.genero}
                imagen={pet.imagen}
                desc_fisica={pet.desc_fisica}
                vacunas={pet.vacunas}
                esterilizado={pet.esterilizado}
                onToggleLike={handleToggleLike}
                onAdopt={handleAdopt}
                isLiked={false}
              />
            </div>
          ))}
        </div>

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
    </div>
  );
};

export default PetSlider;
