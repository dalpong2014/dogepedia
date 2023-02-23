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
          <div key={p}>{p}</div>
        ))}
      </div>
    </>
  );
}
