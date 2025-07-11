import { useRef } from 'react' //useRef es un hook que sirve para crear referencias mutables a un elemento del DOM
import Footer from './components/Footer/Footer'
import NavBar from './components/NavBar/NavBar'
import PetSlider from "./components/PetSlider/PetSlider";
import CardCategory from './components/CardCategory/CardCategory'
import './App.css'
import img1 from './assets/cat.png'
import img2 from './assets/dog.png'
import img3 from './assets/society.png'
import PetCard from "./components/PetCard/PetCard";





const pets = [
  {
    name: "Pepita",
    image: "/public/dog-prueba.png",
    age: "4 años",
    gender: "Hembra",
    breed: "Pug",
    type: 'dog',
    size: 'Mediano',
    energy: 'Baja energía',
    description: 'A Pepita le encanta tomar el sol en el parque. Esta pelusa está esperando a ser adoptada.',

  },
  {
    name: "Max",
    image: "/public/dog-prueba.png",
    age: "2 años",
    gender: "Macho",
    breed: "Golden Retriever",
    type: 'cat',
    size: 'Grande',
    energy: 'Alta energía'
  },
  {
    name: "Luna",
    image: "https://i.pinimg.com/736x/a4/5a/d9/a45ad937cfed4145cf87e0d7e71f3ef2.jpg",
    age: "3 años",
    gender: "Hembra",
    breed: "Border Collie",
    type: "dog"
  }
];

function App() {
    const catRef = useRef(null);
    const dogRef = useRef(null);

    const handleScrollTo = (category) => {
        if (category === 'cat' && catRef.current) {
            catRef.current.scrollIntoView({behavior: 'smooth'});
        } else if (category === 'dog' && dogRef.current) {
            dogRef.current.scrollIntoView({behavior: 'smooth'})
        }
    }

  const handleAdopt = (petName) => {
    console.log(`Adopting ${petName}!`);
  };

  const handleToggleLike = (petName, isLiked) => {
    console.log(`${petName} is ${isLiked ? 'liked' : 'unliked'}`);
  };

  return (
    <>
      <NavBar />
      <div className="app-container">

        <div className='introduction'>
          <h1 className='introduction__heading'>¡Hola!</h1>
          <p className='introduction__paragrahp'>Somos Pelusa Society, una protectora de animales que busca conectar animales abandonados con hogares que los cuiden y los quieran ❤️‍🩹</p>
          <img className='introduction__photo' src={img3} />
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
            onClick={() => handleScrollTo('dog')} />
        </div>
        <div className='cat-section'>
          <div className='cat-section__content'>
            <h1 ref={catRef} className='cat-section__heading'>Gatos 🐱</h1>
            <p className='cat-section__paragraph'>Estos michis buscan un hogar tranquilo y seguro con alguna manta suavecita, ¿será el tuyo?</p>
            <h3 className='cat-section__subtitle'>¡Haz el match perfecto!</h3>
            <p className='cat-section__instructions-paragraph'>¡Aquí podrás ver a todas nuestras pelusas! Desliza a la derecha para ver a la siguiente, a la izquierda para volver a atrás. Y si te has decidido ¡pulsa el botón de adoptar!</p>
          </div>
          <PetSlider tipoMascota="Gato" />
        </div>
        <div className='dog-section'>
          <div className='dog-section__content'>
            <h1 ref={dogRef} className='dog-section__heading'>Perros 🐶</h1>
            <p className='dog-section__paragrahp'>Tenemos todo tipo de peludos, desde abueletes hasta cachorros. Todos esperando llenar tu vida de mimos y aventuras.</p>
            <h3 className='dog-section__subtitle'>¡Haz el match perfecto!</h3>
            <p className='dog-section__instructions-paragrahp'>¡Aquí podrás ver a todas nuestras pelusas! Desliza a la derecha para ver a la siguiente, a la izquierda para volver a atrás. Y si te has decidido ¡pulsa el botón de adoptar!</p>
          </div>
          <PetSlider tipoMascota="Perro" />
        </div>
        <div className="App">
          <Footer />
        </div>
      </div>
    </>
  );
}


export default App;