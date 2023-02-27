import React from "react";

export default function PokemonList({ pokemon }) {
  const createBreedList = (breedList) => {};

  return (
    <>
      <select>
        <option>Choose a breed !</option>
      </select>
      <div>
        {pokemon.map((p) => (
          <div key={p}>
            {p}
            <h2 className="text-red-700">hello</h2>
          </div>
        ))}
      </div>
    </>
  );
}
