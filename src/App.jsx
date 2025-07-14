import { useRef } from 'react';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import PetSlider from './components/PetSlider/PetSlider';
import CardCategory from './components/CardCategory/CardCategory';
import './App.css';
import img1 from './assets/cat.png';
import img2 from './assets/dog.png';
import img3 from './assets/society.png';

import { useTranslation } from 'react-i18next';

function App() {
  const catRef = useRef(null);
  const dogRef = useRef(null);
  const { t } = useTranslation();

  const pets = t('pets', { returnObjects: true });

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

  const handleToggleLike = (petName, isLiked) => {
    console.log(`${petName} is ${isLiked ? 'liked' : 'unliked'}`);
  };

  return (
    <>
      <NavBar />
      <div className="app-container">
        <div className="introduction">
          <h1 className="introduction-heading">{t('intro.heading')}</h1>
          <p className="introduction-paragraph">{t('intro.paragraph')}</p>
          <img className="introduction-photo" src={img3} />
        </div>

        <div className="election-team">
          <h1 className="election-team-heading">{t('team.heading')}</h1>
          <p className="election-team-paragraph">{t('team.paragraph')}</p>
        </div>

        <div className="categories">
          <CardCategory
            title={t('categories.cat')}
            image={img1}
            category="cat"
            onClick={() => handleScrollTo('cat')}
          />
          <CardCategory
            title={t('categories.dog')}
            image={img2}
            category="dog"
            onClick={() => handleScrollTo('dog')}
          />
        </div>

        <div className="cat-section">
          <div className="cat-content">
            <h1 ref={catRef} className="cat-heading">{t('cats.title')}</h1>
            <p className="cat-paragraph">{t('cats.description')}</p>
            <h3 className="cat-subtitle">{t('match.title')}</h3>
            <p className="cat-instructions">{t('match.instructions')}</p>
          </div>
          <PetSlider tipoMascota="Gato" pets={pets.filter(p => p.type === 'cat')} />
        </div>

        <div className="dog-section">
          <div className="dog-content">
            <h1 ref={dogRef} className="dog-heading">{t('dogs.title')}</h1>
            <p className="dog-paragraph">{t('dogs.description')}</p>
            <h3 className="dog-subtitle">{t('match.title')}</h3>
            <p className="dog-instructions">{t('match.instructions')}</p>
          </div>
          <PetSlider tipoMascota="Perro" pets={pets.filter(p => p.type === 'dog')} />
        </div>
       
        <Footer />
      </div>
    </>
  );
}

export default App;

