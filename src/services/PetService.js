// Función para obtener la lista de mascotas
export async function getPets() {
  try {
    const response = await fetch('https://huachitos.cl/api/animales');

    if (!response.ok) {
      throw new Error(`Error al obtener mascotas: ${response.status}`);
    }

    const json = await response.json();
    return json.data;  // Accedemos al array de animales
  } catch (error) {
    console.error('Error en petService:', error);
    throw error;
  }
}
