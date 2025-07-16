import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar/NavBar';
import PetSlider from "../components/PetSlider/PetSlider";
import CardCategory from '../components/CardCategory/CardCategory';
import './HomePage.css';


import img1 from '../assets/cat.png';
import img2 from '../assets/dog.png';
import img3Light from '../assets/society.png'
import img3Dark from '../assets/societyLight.png'
import pepitaImg from '../assets/pepita.webp';
import bassImg from  '../assets/bass.webp';
import selvaImg from  '../assets/selva.webp';
import beckhamImg from  '../assets/beckham.webp';
import bombonImg from  '../assets/bombon.webp';
import pomeloImg from  '../assets/pomelo.webp';

import useTheme from '../hooks/useTheme';
import Dropdown from '../components/Btn/Dropdown';

import '../components/styles/Variables.css'

const dogs = [
  {
    id: "pepita",
    nombre: "Pepita",
    tipo: "Perro",
    edad: "1 año",
    genero: "Hembra",
    imagen: pepitaImg,
    vacunas: 1,
    esterilizado: 0,
    desc_fisica: "Pepita es una pug gordita, le gusta que la vistan y la bañen."
  },
  {
    id: "bass",
    nombre: "Bass",
    tipo: "Perro",
    edad: "2 años",
    genero: "Macho",
    imagen: bassImg,
    vacunas: 1,
    esterilizado: 1,
    desc_fisica: "Un perro de tamaño grande y con energía."
  },
  {
    id: "selva",
    nombre: "Selva",
    tipo: "Perro",
    edad: "9 meses",
    genero: "Hembra",
    imagen: selvaImg,
    vacunas: 0,
    esterilizado: 1,
    desc_fisica: "Criada en nuestro centro desde bebé, muy cariñosa y bien educada."
  },
];

const cats = [
  {
    id: "beckham",
    nombre: "Beckham",
    tipo: "Gato",
    edad: "3 años",
    genero: "Macho",
    imagen: beckhamImg,
    vacunas: 1,
    esterilizado: 1,
    desc_fisica: "Gato atigrado perteneciente a nuestra diseñadora Sara, no está disponible pero para que veáis lo guapo que es."
  },
  {
    id: "bombon",
    nombre: "Bombón",
    tipo: "Gato",
    edad: "4 años",
    genero: "Macho",
    imagen: bombonImg,
    vacunas: 1,
    esterilizado: 1,
    desc_fisica: "Un gato famoso ya que apareció en la famosa cuenta de Twitter 'Gatitos gorditos'."
  },
  {
    id: "pomelo",
    nombre: "Pomelo",
    tipo: "Gato",
    edad: "9 meses",
    genero: "Hembra",
    imagen: pomeloImg,
    vacunas: 1,
    esterilizado: 0,
    desc_fisica: "Una gata joven con mucha energía."
  },
];

export default function HomePage() {
  const { t } = useTranslation();
  const catRef = useRef(null);
  const dogRef = useRef(null);
  const navigate = useNavigate();

  const [theme] = useTheme(); // Obtén theme y la función para alternarlo

  const handleScrollTo = (category) => {
    if (category === 'cat' && catRef.current) {
      catRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (category === 'dog' && dogRef.current) {
      dogRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdopt = (petName) => {
    console.log(`Adopting ${petName}!`);
    navigate('/adopt', { state: { petData } });
  };

  const handleToggleLike = (petName, isLiked) => {
    console.log(`${petName} is ${isLiked ? 'liked' : 'unliked'}`);
  };

    return (
    <>
      <NavBar theme={theme} />
      <div className="home-container" data-theme={theme} >

        <div className='introduction'>
          <h1 className='introduction__heading'>{t('homepage.greeting')}</h1>
          <p className='introduction__paragrahp'>{t('homepage.introText')}</p>
          <img className='introduction__photo' src={theme === 'light' ? img3Light : img3Dark}  alt={t('homepage.societyAlt')} />
        </div>

        <div className='election-team'>
          <h1 className='election-team__heading'>{t('homepage.chooseTeam')}</h1>
          <p className='election-team__paragrahp'>{t('homepage.choosePet')}</p>
        </div>

        <div className="categories">
          <CardCategory
            title={t('homepage.cats')}
            image={img1}
            category='cat'
            onClick={() => handleScrollTo('cat')}
          />
          <CardCategory
            title={t('homepage.dogs')}
            image={img2}
            category='dog'
            onClick={() => handleScrollTo('dog')}
          />
        </div>

        <div className='cat-section'>
          <div className='cat-section__content'>
            <h1 ref={catRef} className='cat-section__heading'>{t('homepage.cats')} 🐱</h1>
            <p className='cat-section__paragraph'>{t('homepage.catSectionDesc')}</p>
            <h3 className='cat-section__subtitle'>{t('homepage.matchPerfect')}</h3>
            <p className='cat-section__instructions-paragraph'>{t('homepage.catInstructions')}</p>
          </div>
          <PetSlider tipoMascota="Gato" muestra={cats} onAdopt={handleAdopt}/>
        </div>

        <div className='dog-section'>
          <div className='dog-section__content'>
            <h1 ref={dogRef} className='dog-section__heading'>{t('homepage.dogs')} 🐶</h1>
            <p className='dog-section__paragrahp'>{t('homepage.dogSectionDesc')}</p>
            <h3 className='dog-section__subtitle'>{t('homepage.matchPerfect')}</h3>
            <p className='dog-section__instructions-paragrahp'>{t('homepage.dogInstructions')}</p>
          </div>
          <PetSlider tipoMascota="Perro" muestra={dogs} onAdopt={handleAdopt}/>
        </div>
        <Dropdown></Dropdown>
        <Footer />
      </div>
    </>
  );
}