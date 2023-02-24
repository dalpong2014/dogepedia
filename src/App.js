import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const headers = {
    "x-api-key":
      "live_reIU47ngKmIH9cdlHLzOGqeg1s4ko1EWlDDIJXysP2JEl791lLiq2cMqytkGieq4",
  };

  const [pokemon, setPokemon] = useState([]);
  const [breeds, setBreeds] = useState([]);

  const [breedURL, setBreedURL] = useState(
    "https://api.thedogapi.com/v1/breeds"
  );

  const [currentPageUrl, setcurretPageUrl] = useState(
    "https://api.thedogapi.com/v1/images/search?limit=10"
  );
  const [nextPageUrl, setNextPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/next"
  );
  const [prevPageUrl, setPrevPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/prev"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(
        currentPageUrl,
        {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        },
        { headers: headers }
      )
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(
          res.data.map((p) => (
            <img style={{ height: 200, widows: 200 }} src={p.url} alt="" />
          ))
        );
      });

    axios
      .get(
        breedURL,
        {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        },
        { headers: headers }
      )
      .then((res) => {
        setBreeds(res.data.map((breed) => console.log(breed)));
      });

    //clean up function. Everytime we make new request, we clean up the last request
    return () => {
      cancel();
    };
  }, [currentPageUrl]);

  const gotoNextPage = () => {
    setcurretPageUrl(nextPageUrl);
  };
  const gotoPrevPage = () => {
    setcurretPageUrl(prevPageUrl);
  };

  if (loading) return "Loading...";

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
