import React from "react";
import { generateImageLink } from "../functions/common";

export const PokemonItem = ({ pokemon, handleClick }) => {
  const pokemonId = pokemon.id;
  const pokemonImage = generateImageLink({ pokemonId });
  const pokemonName = pokemon.species.name;
  const types = pokemon.types;
  const principalType = types[0].type;
  const classNameType = `card-img-top color-type-${principalType.name}`;
  const typeBadges = types.map((type, i) => {
    const typeClass = `badge-type type-${type.type.name}`;
    return (
      <div className={typeClass} key={i} />
    );
  });
  const abilities = pokemon.abilities
    .map((ab) => ab.ability.name.replaceAll("-", " "))
    .join(", ");
  return (
    <div className="pokemon-item" onClick={() => handleClick(pokemon)}>
      <div className="card">
        <div className={classNameType}>
          <div className="pokemon-number">#{pokemon.id}</div>
          <div className="pokemon-types">{typeBadges}</div>
          <img
            src={pokemonImage}
            alt={`#${pokemon.id} ${pokemonName}`}
            className="pokemon-image "
          />
        </div>
        <div className="card-body">
          <div className="card-title d-flex flex-column">
            <div className="pokemon-title">{pokemonName}</div>
            <div className="pokemon-weight">{pokemon.weight / 10} kg</div>
            <div className="row">
              <div className="col-12 fw-bold">Abilities</div>
              <div className="col-12 text-capitalize">{abilities}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonItem;
