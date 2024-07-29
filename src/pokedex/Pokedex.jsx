import React, { useEffect, useRef, useState } from "react";
import {
  getPokemonBySearch,
  getPokemonEvolutions,
  getPokemonFlavorText,
  getPokemonList,
} from "../functions/calls";
import {
  getPokemonDeepData,
  getPokemonListData,
  LIMIT,
} from "../functions/common";
import PokemonItem from "./PokemonItem";
import Spinner from "../Spinner";
import Pagination from "./Pagination";
import PokemonModal from "./PokemonModal";
import PokeSearch from "./PokeSearch";
import { isNull } from "lodash";
import Alert from "../Alert";
import * as bootstrap from "bootstrap";

export const Pokedex = () => {
  const [offset, setOffset] = useState(0);
  const [activePokemon, setActivePokemon] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [pokemonItems, setPokemonItems] = useState([]);
  const [alert, setAlert] = useState({
    showMessage: false,
    messageType: undefined,
    messages: [],
    messageTitle: undefined,
  });

  const showMessage = (messageType, messageTitle, messages) => {
    setAlert((prev) => {
      prev.showMessage = true;
      prev.messageType = messageType;
      prev.messageTitle = messageTitle;
      prev.messages = messages;
      return { ...prev };
    });
  };

  const closeAlert = () =>
    setAlert((prev) => {
      prev.showMessage = false;
      return { ...prev };
    });

  useEffect(() => {
    if (alert.showMessage) var timeoutAlert = setTimeout(closeAlert, 3000);
    return () => clearTimeout(timeoutAlert);
  }, [alert]);

  const pokemonModalRef = useRef();

  useEffect(() => {
    new bootstrap.Modal(pokemonModalRef.current);
  }, []);

  const getPokemons = ({ newOffset = 0 }) => {
    setIsLoading(true);
    let pokemonList = [];
    getPokemonList({ offset: newOffset })
      .then((response) => {
        const totalPokemons = response?.data?.count;
        setTotalPokemons(totalPokemons);
        return response?.data?.results;
      })
      .then((response) => getPokemonListData({ pokemonList: response }))
      .then((response) => {
        pokemonList = response.map((x) => x.data);
        return getPokemonDeepData({ pokemonList });
      })
      .then((results) => {
        pokemonList.forEach((pokemon) => {
          const pokemonData = results.find(
            (x) => x.data.name === pokemon.species.name
          ).data;
          const flavorTexts = pokemonData.flavor_text_entries.filter(
            (text) => text.language.name === "en"
          );
          pokemon.description = flavorTexts[flavorTexts.length - 1].flavor_text;
          pokemon.nationalPokedexNumber = pokemonData.pokedex_numbers.find(
            (x) => x.pokedex.name === "national"
          ).entry_number;
          pokemon.evolutionChainUrl = pokemonData.evolution_chain.url;
        });
        loadPokemonItems(pokemonList);
      })
      .catch((error) => console.error(error))
      .finally(() => setOffset(newOffset));
  };

  useEffect(() => {
    getPokemons({});
  }, []);

  const loadPokemonItems = (list) => {
    const pokemonItems = list.map((pokemon) => {
      return (
        <PokemonItem
          pokemon={pokemon}
          handleClick={(pokemon) => handlePokemonClick(pokemon)}
          key={pokemon.id}
        />
      );
    });
    setPokemonItems(pokemonItems);
    setIsLoading(false);
  };

  const handlePokemonClick = (pokemon) => {
    setIsLoading(true);
    getPokemonEvolutions({ url: pokemon.evolutionChainUrl })
      .then((response) => {
        pokemon.evolutionChain = response.data;
        setActivePokemon(pokemon);
      })
      .finally(() => {
        showPokemonModal();
        setIsLoading(false);
      });
  };

  const showPokemonModal = () =>
    bootstrap.Modal.getInstance(pokemonModalRef.current).show();

  const handlePageClick = (page) => {
    const newOffset = page * LIMIT - LIMIT;
    getPokemons({ newOffset });
  };

  const handleSearch = (searchText) => {
    if (searchText) {
      setIsLoading(true);
      let pokemon = null;
      getPokemonBySearch({ idOrName: searchText.toLowerCase() })
        .then((response) => {
          pokemon = response.data;
          return getPokemonFlavorText({ id: pokemon.id });
        })
        .then((response) => {
          const flavorTexts = response.data.flavor_text_entries.filter(
            (text) => text.language.name === "en"
          );
          pokemon.description = flavorTexts[flavorTexts.length - 1].flavor_text;
          pokemon.nationalPokedexNumber = response.data.pokedex_numbers.find(
            (x) => x.pokedex.name === "national"
          ).entry_number;
          pokemon.evolutionChainUrl = response.data.evolution_chain.url;
          return getPokemonEvolutions({ url: pokemon.evolutionChainUrl });
        })
        .then((response) => {
          pokemon.evolutionChain = response.data;
          setActivePokemon(pokemon);
        })
        .catch((error) => {
          setActivePokemon(null);
          if (error.response.status === 404) {
            showMessage("primary", "Error", ["Pokemon not found"]);
          }
          console.error(error);
        })
        .finally(() => {
          if (!isNull(pokemon)) showPokemonModal();
          setIsLoading(false);
        });
    } else {
      showMessage("primary", "Error", ["Nothing to search"]);
    }
  };

  const pokemonListClass = alert.showMessage
    ? "pokemon-list has-error"
    : "pokemon-list";

  return (
    <div className="pokedex">
      <Spinner isLoading={isLoading} />
      <Alert
        alertClass={alert.messageType}
        isShowing={alert.showMessage}
        messages={alert.messages}
        title={alert.messageTitle}
        onClose={closeAlert}
      />
      <div className="pokedex-screen">
        <PokeSearch handleSearch={handleSearch} />
        <div className={pokemonListClass}>{pokemonItems}</div>
        <Pagination
          currentOffset={offset}
          totalCount={totalPokemons}
          handlePageClick={handlePageClick}
        />
      </div>
      <PokemonModal modalRef={pokemonModalRef} pokemon={activePokemon} />
    </div>
  );
};

export default Pokedex;
