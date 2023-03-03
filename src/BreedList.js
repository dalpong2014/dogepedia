import React from "react";

export default function PokemonList(breeds) {
  console.log("breed in list", breeds);
  return (
    <>
      <div>
        <ul>
          {breeds.breeds.map((eachBreed) => {
            return <li>{eachBreed}</li>;
          })}
        </ul>
      </div>
    </>
  );
}
