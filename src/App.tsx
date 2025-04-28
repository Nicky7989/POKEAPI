import { useEffect, useState } from 'react';
import { getPokemonById } from './services/PokeAPI';
import PokemonCard from './components/Poke';
import './index.css';

function App() {
  const [pokemon, setPokemon] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);

  const fetchPokemon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    setLoading(true);
    setError(null);
    try {
      const data = await getPokemonById(randomId);
      setPokemon(data);
    } catch (error) {
      console.error('Error trayendo el Pokémon:', error);
      setError('La pagina no la dió');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedScore = localStorage.getItem('pokemon-score');
    if (storedScore) {
      setScore(parseInt(storedScore, 10));
    }
    fetchPokemon();
  }, []);

  useEffect(() => {
    localStorage.setItem('pokemon-score', score.toString());
  }, [score]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-2xl text-white">
        Carganding...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex flex-col items-center justify-center p-4 text-white">
        <p className="text-2xl mb-4">{error}</p>
        <button
          onClick={fetchPokemon}
          className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-xl text-white text-lg"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url('https://assets.pokemon.com//assets/cms2/img/misc/virtual-backgrounds/masters/forest.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
      }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <PokemonCard
        pokemon={pokemon}
        fetchNewPokemon={fetchPokemon}
        score={score}
        setScore={setScore}
      />
    </div>
  );
}

export default App;
