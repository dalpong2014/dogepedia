import React from "react";
import SearchBar from "./components/SearchBar";

export default function PokemonList({ breeds }) {
  console.log("breed in list", breeds);

  return (
    <div className="bg-gray-400">
      <div className="items-center">
        <div className="flex-col">
          <SearchBar breeds={breeds} />
        </div>
        <div>SearchResults</div>
      </div>
    </div>
  );
}
