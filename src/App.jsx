import PetSlider from "./components/PetSlider/PetSlider";

const App = () => {
  

  return (
    <div>
     <h1>Perritos gorditos</h1>
<PetSlider tipoMascota="Perro" />

<h1>Gatitos gorditos</h1>
<PetSlider tipoMascota="Gato" />
    </div>
  );
};

export default App;