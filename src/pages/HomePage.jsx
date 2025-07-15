import { useRef } from 'react';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar/NavBar';
import PetSlider from "../components/PetSlider/PetSlider";
import CardCategory from '../components/CardCategory/CardCategory';
import PetCard from "../components/PetCard/PetCard";
import './HomePage.css';

import img1 from '../assets/cat.png';
import img2 from '../assets/dog.png';
import img3 from '../assets/society.png';
import pepitaImg from '../assets/pepita.webp';
import bassImg from  '../assets/bass.webp';
import selvaImg from  '../assets/selva.webp';
import beckhamImg from  '../assets/beckham.webp';
import bombonImg from  '../assets/bombon.webp';
import pomeloImg from  '../assets/pomelo.webp';

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
  const catRef = useRef(null);
  const dogRef = useRef(null);

  const handleScrollTo = (category) => {
    if (category === 'cat' && catRef.current) {
      catRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (category === 'dog' && dogRef.current) {
      dogRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdopt = (petName) => {
    console.log(`Adopting ${petName}!`);
  };

  /*const handleToggleLike = (petName, isLiked) => {
    console.log(`${petName} is ${isLiked ? 'liked' : 'unliked'}`);
  };*/

  return (
    <>
      <NavBar />
      <div className="home-container">

        <div className='introduction'>
          <h1 className='introduction__heading'>¡Hola!</h1>
          <p className='introduction__paragrahp'>Somos Pelusa Society, una protectora de animales que busca conectar animales abandonados con hogares que los cuiden y los quieran ❤️‍🩹</p>
          <img className='introduction__photo' src={img3} alt="Society" />
        </div>

        <div className='election-team'>
          <h1 className='election-team__heading'>Escoge team</h1>
          <p className='election-team__paragrahp'>¿Qué peludito será el nuevo miembro de tu familia?</p>
        </div>

        <div className="categories">
          <CardCategory
            title='Gatos'
            image={img1}
            category='cat'
            onClick={() => handleScrollTo('cat')}
          />
          <CardCategory
            title='Perros'
            image={img2}
            category='dog'
            onClick={() => handleScrollTo('dog')}
          />
        </div>

        <div className='cat-section'>
          <div className='cat-section__content'>
            <h1 ref={catRef} className='cat-section__heading'>Gatos 🐱</h1>
            <p className='cat-section__paragraph'>Estos michis buscan un hogar tranquilo y seguro con alguna manta suavecita, ¿será el tuyo?</p>
            <h3 className='cat-section__subtitle'>¡Haz el match perfecto!</h3>
            <p className='cat-section__instructions-paragraph'>¡Aquí podrás ver a todas nuestras pelusas! Desliza a la derecha para ver a la siguiente, a la izquierda para volver a atrás. Y si te has decidido ¡pulsa el botón de adoptar!</p>
          </div>
          <PetSlider tipoMascota="Gato" muestra={cats} />
        </div>

        <div className='dog-section'>
          <div className='dog-section__content'>
            <h1 ref={dogRef} className='dog-section__heading'>Perros 🐶</h1>
            <p className='dog-section__paragrahp'>Tenemos todo tipo de peludos, desde abueletes hasta cachorros. Todos esperando llenar tu vida de mimos y aventuras.</p>
            <h3 className='dog-section__subtitle'>¡Haz el match perfecto!</h3>
            <p className='dog-section__instructions-paragrahp'>¡Aquí podrás ver a todas nuestras pelusas! Desliza a la derecha para ver a la siguiente, a la izquierda para volver a atrás. Y si te has decidido ¡pulsa el botón de adoptar!</p>
          </div>
          <PetSlider tipoMascota="Perro" muestra={dogs} />
        </div>

        <Footer />
      </div>
    </>
  );
}