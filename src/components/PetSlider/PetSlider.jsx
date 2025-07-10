import React, { useState, useRef, useEffect } from 'react';
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

  // Datos de la API filtrados por tipo
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsFromAPI = await getPets();
        const mappedPets = petsFromAPI
          .filter(p => p.tipo === tipoMascota) // Filtrar por tipo
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
            desc_personalidad: p.desc_personalidad.replace(/<[^>]*>/g, ''),
          }));
        setPetData(mappedPets);
      } catch (error) {
        console.error("No se pudieron cargar las mascotas desde la API.", error);
      }
    };

    fetchPets();
  }, [tipoMascota]); // Añadir tipoMascota como dependencia

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
    // Prevenir comportamientos por defecto que pueden interferir con el arrastre
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
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

  // Resetear el índice cuando cambien los datos filtrados
  useEffect(() => {
    setCurrentIndex(0);
  }, [petData]);

  // Funciones placeholder para like y adopción, eliminar tras integrar la lógica:
  const handleToggleLike = (nombre, isLiked) => {
    console.log(`${nombre} ${isLiked ? 'añadido a' : 'eliminado de'} favoritos`);
  };

  const handleAdopt = (nombre) => {
    console.log(`Iniciando proceso de adopción para ${nombre}`);
  };

//

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
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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
                isLiked={false} // Puedes implementar lógica para recordar favoritos
              />
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

    </div>
  );
};

export default PetSlider;