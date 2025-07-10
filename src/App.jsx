import { useEffect, useState } from 'react';
import { getPets } from '../src/services/PetService';
import AdoptPage from './pages/AdoptPage';

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
    <AdoptPage/>
  );
}

export default PetList;
