import { getPokemonData, getPokemonFlavorText } from "./calls";

export const generateImageLink = ({ pokemonId }) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

export const generateSpriteLink = ({ pokemonId }) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

export const LIMIT = 12;

export const getPokemonsIds = ({ pokemonList }) =>
  pokemonList.map((x) => {
    const aryUrl = x.url.split("/");
    return aryUrl[aryUrl.length - 2];
  });

export const getPokemonListData = ({ pokemonList }) => {
  const pokemonIds = getPokemonsIds({ pokemonList });
  return Promise.all(pokemonIds.map((id) => getPokemonData({ id })));
};

export const getPokemonDeepData = ({ pokemonList }) => {
  return Promise.all(
    pokemonList.map((pokemon) =>
      getPokemonFlavorText({ id: pokemon?.species?.name })
    )
  );
};

