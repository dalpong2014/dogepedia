import { response } from "express";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ breeds }) {
  const [input, setInput] = useState("");

  const fetchBreed = (value) => {
    fetch("https://api.thedogapi.com/v1/breeds")
      .then((res) => response.json())
      .then((json) => console.log(json));
  };

  const handleChange = (value) => {
    setInput(value);
  };

  return (
    <div className="bg-white ">
      <FaSearch />
      <input
        placeholder="Type a Breed"
        className="h-10 m-4"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      ></input>
    </div>
  );
}

export default SearchBar;
