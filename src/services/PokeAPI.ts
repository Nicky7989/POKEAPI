import axios from "axios"


const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=200"

export const getPokemonById = async (id: number) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('No se pudo obtener el Pokémon');
  }
};
