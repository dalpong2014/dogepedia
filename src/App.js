import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
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
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.map((p) => <img src={p.url} alt="" />));
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
