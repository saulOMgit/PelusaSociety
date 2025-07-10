import React from 'react'
import NavBar from './components/NavBar/NavBar'

const App = () => {
  return (
    <>
    <NavBar />
    </>
  )
}

export default App
import PetSlider from "./components/PetSlider/PetSlider";
import React from 'react'
import CardCategory from './components/CardCategory/CardCategory'
import './App.css'
import img1 from './assets/cat.png'
import img2 from './assets/dog.png'

const App = () => {
  return (
    <>
      <div className="categories">
        <CardCategory 
        title='Gatos'
        image={img1}
        category='cat'
        />

        <CardCategory 
        title='Perros'
        image={img2}
        category='dog'/>
      </div>

  // Sliders, importan ellos la PetCard

  <div>

<PetSlider tipoMascota="Perro" />
<PetSlider tipoMascota="Gato" />
    </div>
    </>
  )
}

export default App



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




