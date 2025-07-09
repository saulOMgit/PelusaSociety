import PetCard from "./components/PetCard/PetCard";




const pets = [
  {
    name: "Pepita",
    image: "/public/dog-prueba.png",
    age: "4 años",
    gender: "Hembra",
    breed: "Pug",
    type: 'dog',
  },
  {
    name: "Max",
    image: "/public/dog-prueba.png",
    age: "2 años",
    gender: "Macho",
    breed: "Golden Retriever",
    type: 'cat'
  },
  {
    name: "Luna",
    image: "https://i.pinimg.com/736x/a4/5a/d9/a45ad937cfed4145cf87e0d7e71f3ef2.jpg",
    age: "3 años",
    gender: "Hembra",
    breed: "Border Collie",
  }
];

function App() {
  const handleAdopt = (petName) => {
    console.log(`Adopting ${petName}!`);
  };

  const handleToggleLike = (petName, isLiked) => {
    console.log(`${petName} is ${isLiked ? 'liked' : 'unliked'}`);
  };

  return (
    <div className="pets-grid">
      {pets.map((pet, index) => (
        <PetCard
          key={index}
          name={pet.name}
          image={pet.image}
          age={pet.age}
          gender={pet.gender}
          breed={pet.breed}
          type={pet.type}
          onAdopt={handleAdopt}
          onToggleLike={handleToggleLike}
          isLiked={false}
        />
      ))}
    </div>
  );
}

export default App