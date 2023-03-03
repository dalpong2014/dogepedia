import React from "react";
import { Select, Option } from "@material-tailwind/react";

export default function PokemonList({ breeds }) {
  console.log("breed in list", breeds);
  return (
    <div className="w-36">
      <Select label="Select a Breed">
        {breeds.map((eachBreed) => {
          return <Option key={eachBreed}>{eachBreed}</Option>;
        })}
      </Select>
    </div>
  );
}
