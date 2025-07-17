import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import './PetSlider.css';
import { getPets } from '../../services/PetService';
import PetCard from '../PetCard/PetCard';

const PetSlider = ({ tipoMascota, muestra }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragState, setDragState] = useState({ startX: 0, scrollLeft: 0 });
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
        setPetData([...muestra, ...mappedPets]);
      } catch (error) {
        console.error("No se pudieron cargar las mascotas desde la API.", error);
      }
    };

    fetchPets();
  }, [tipoMascota, muestra]);

  // Navegación simplificada
  const navigate = useCallback((direction) => {
    setCurrentIndex(prev => 
      direction === 'next' 
        ? (prev + 1) % petData.length
        : (prev - 1 + petData.length) % petData.length
    );
  }, [petData.length]);

  // Snap to card
  const snapToCard = useCallback(() => {
    const track = sliderRef.current;
    if (!track) return;
  // Cambia la card activa según la posición en el scroll  
    const newIndex = Math.round(track.scrollLeft / 240);
    setCurrentIndex(Math.max(0, Math.min(newIndex, petData.length - 1)));
  }, [petData.length]);

  // Manejo unificado de drag (ratón y táctil)
  const handleDragStart = useCallback((clientX) => {
    setIsDragging(true);
    setDragState({
      startX: clientX - sliderRef.current.offsetLeft,
      scrollLeft: sliderRef.current.scrollLeft
    });
  }, []);

  const handleDragMove = useCallback((clientX) => {
    if (!isDragging) return;
    const x = clientX - sliderRef.current.offsetLeft;
    const walk = (x - dragState.startX) * 2;
    sliderRef.current.scrollLeft = dragState.scrollLeft - walk;
  }, [isDragging, dragState]);

  const handleDragEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      snapToCard();
    }
  }, [isDragging, snapToCard]);

  // Eventos del ratón
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    handleDragStart(e.pageX);
  }, [handleDragStart]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      e.preventDefault();
      handleDragMove(e.pageX);
    }
  }, [isDragging, handleDragMove]);

  // Eventos táctiles
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let touchMoved = false;

    const handleTouchStart = (e) => {
      handleDragStart(e.touches[0].pageX);
      touchMoved = false;
    };

    const handleTouchMove = (e) => {
      handleDragMove(e.touches[0].pageX);
      if (isDragging && Math.abs(e.touches[0].pageX - dragState.startX) > 5) {
        touchMoved = true;
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      if (touchMoved) handleDragEnd();
    };

    slider.addEventListener('touchstart', handleTouchStart, { passive: false });
    slider.addEventListener('touchmove', handleTouchMove, { passive: false });
    slider.addEventListener('touchend', handleTouchEnd);

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchmove', handleTouchMove);
      slider.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleDragStart, handleDragMove, handleDragEnd, isDragging, dragState]);

  // Sincroniza la posición del scroll con el índice activo
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: currentIndex * 240,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  // Reinicia índice cuando cambia el tipo
  useEffect(() => setCurrentIndex(0), [petData]);

  // Generadores de clases BEM
  const getCardClasses = useCallback((index) => {
    const classes = ['pet-slider__card'];
    if (index === currentIndex) classes.push('pet-slider__card--active');
    if (index === currentIndex + 1) classes.push('pet-slider__card--next');
    return classes.join(' ');
  }, [currentIndex]);

  const trackClasses = useMemo(() => 
    `pet-slider__track ${isDragging ? 'pet-slider__track--dragging' : ''}`,
    [isDragging]
  );

  return (
    <div className="pet-slider">
      <div className="pet-slider__wrapper">
        <div
          ref={sliderRef}
          className={trackClasses}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          {petData.map((pet, index) => (
            <div key={pet.id} className={getCardClasses(index)}>
              <PetCard
                {...pet}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('prev')}
          className="pet-slider__nav-button pet-slider__nav-button--prev"
          aria-label="Mascota anterior"
        >
          ←
        </button>

        <button
          onClick={() => navigate('next')}
          className="pet-slider__nav-button pet-slider__nav-button--next"
          aria-label="Siguiente mascota"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default React.memo(PetSlider);