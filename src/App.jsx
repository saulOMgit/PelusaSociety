import { useEffect, useState } from 'react';
import { getPets } from '../src/services/PetService';

function PetList() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPets() {
      try {
        const data = await getPets();
        setPets(data);
      } catch (err) {
        setError('No se pudieron cargar las mascotas.');
      }
    }

    fetchPets();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Lista de Mascotas</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            {pet.nombre}
            <img src={pet.imagen} alt={pet.nombre} width="150" />

          </li>
        ))}
      </ul>

    </div>
  );
}

export default PetList;
