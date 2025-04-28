import { useState } from 'react';
import React from 'react';

interface PokeProps {
  pokemon: any;
  fetchNewPokemon: () => void;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

function Poke({ pokemon, fetchNewPokemon, score, setScore }: PokeProps) {
  const [guess, setGuess] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleGuess = () => {
    if (guess.trim().toLowerCase() === pokemon.name.toLowerCase()) {
      setFeedback('Si... le sabes mucho y que 😒');
      setRevealed(true);
      setScore(prev => prev + 1);
    } else {
      setFeedback('NO LE SABES JAJA 🤪');
    }
  };

  const handleNext = () => {
    setGuess(''); 
    setFeedback('');
    setRevealed(false);
    fetchNewPokemon();
  };

  const handleSkip = () => {
    setGuess('');
    setFeedback('');
    setRevealed(false);
    fetchNewPokemon();
  };

  return (

    <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center w-full max-w-md">
      <img src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
        alt="pokemon"
        style={{
        filter: revealed ? 'none' : 'brightness(0)',
        transition: 'filter 0.5s ease-in-out',
  }}
  className="w-60 h-60 object-contain"
/>


      <div className="mt-6 flex flex-col items-center gap-4 w-full">
        
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="¿Quién es este Pokémon?"
          className="p-3 w-full border rounded-xl text-center text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {!revealed && (
        <button
          onClick={handleGuess}
          className="bg-indigo-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition w-full"
        >
          Adivinar
        </button>)}

        {feedback && (
          <div
            className={`mt-1 text-lg font-semibold ${
              feedback.includes('Si... le sabes mucho y que 😒') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {feedback}
          </div>
        )}

        {revealed ? (
          <button
            onClick={handleNext}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition w-full"
          >
            Siguiente
          </button>
        ) : (

          <button
            onClick={handleSkip}
            className="bg-yellow-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition w-full"
            >
                Saltar Pokémon
            </button>
                )}

                <div className="mt-4 text-gray-700 font-semibold">
                Puntos: {score}
                </div>
            </div>
        </div>
  );
}

export default Poke;
