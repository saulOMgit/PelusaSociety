import React, { useState, useRef, useEffect, useCallback } from 'react';
import './PetSlider.css';
import { getPets } from '../../services/PetService';
import PetCard from '../PetCard/PetCard';

const PetSlider = ({ tipoMascota, muestra }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);
  const [petData, setPetData] = useState([]);
  const [likedPets, setLikedPets] = useState(new Set());

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
        setPetData([...muestra, ...mappedPets]);
      } catch (error) {
        console.error("No se pudieron cargar las mascotas desde la API.", error);
      }
    };

    fetchPets();
  }, [tipoMascota, muestra]);

  // ✅ Callbacks memoizados
  const handleToggleLike = useCallback((nombre, isLiked) => {
    console.log(`${nombre} ${isLiked ? 'añadido a' : 'eliminado de'} favoritos`);
    setLikedPets(prev => {
      const newSet = new Set(prev);
      if (isLiked) {
        newSet.add(nombre);
      } else {
        newSet.delete(nombre);
      }
      return newSet;
    });
  }, []);

  const handleAdopt = useCallback((petData) => {
    console.log(`Iniciando proceso de adopción para ${petData.nombre}`);
    // Aquí iría la lógica de adopción
  }, []);

  // Funciones de navegación
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % petData.length);
  }, [petData.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + petData.length) % petData.length);
  }, [petData.length]);

  // Calcular y ajustar al índice de carta más cercano
  const snapToCard = useCallback(() => {
    const cardWidth = 240;
    const track = sliderRef.current;
    if (!track) return;
    
    const newIndex = Math.round(track.scrollLeft / cardWidth);
    setCurrentIndex(Math.max(0, Math.min(newIndex, petData.length - 1)));
  }, [petData.length]);

  // Drag con ratón
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    snapToCard();
  }, [isDragging, snapToCard]);

  // Drag con táctil
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let touchMoved = false;

    const handleTouchStart = (e) => {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
      touchMoved = false;
    };

    const handleTouchMove = (e) => {
      const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      if (Math.abs(walk) > 5) {
        touchMoved = true;
        e.preventDefault();
        sliderRef.current.scrollLeft = scrollLeft - walk;
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      if (touchMoved) {
        snapToCard();
      }
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
      const cardWidth = 240;
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
                isLiked={likedPets.has(pet.nombre)}
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

export default React.memo(PetSlider);