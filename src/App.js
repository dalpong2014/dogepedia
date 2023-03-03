import React, { useState, useEffect } from "react";
import BreedList from "./BreedList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [breeds, setBreeds] = useState([]);

  const [breedURL, setBreedURL] = useState(
    "https://api.thedogapi.com/v1/breeds"
  );

  const [currentPageUrl, setcurretPageUrl] = useState(
    "https://api.thedogapi.com/v1/images/search?limit=11"
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
      .get(breedURL, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
        headers: {
          "x-api-key":
            "live_reIU47ngKmIH9cdlHLzOGqeg1s4ko1EWlDDIJXysP2JEl791lLiq2cMqytkGieq4",
        },
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        res.data.map((breed) => breeds.push(breed.name));
      });

    //clean up function. Everytime we make new request, we clean up the last request
    return () => {
      cancel();
    };
  }, [breedURL]);

  const gotoNextPage = () => {
    setcurretPageUrl(nextPageUrl);
  };
  const gotoPrevPage = () => {
    setcurretPageUrl(prevPageUrl);
  };

  if (loading) return "Loading...";

  return (
    <>
      <BreedList breeds={breeds} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
