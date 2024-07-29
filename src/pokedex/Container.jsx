import React from "react";
import pokeballIcon from "../assets/pokeball_icon.svg";

const Container = ({ children }) => {
  return (
    <>
      <div className="main-pokedex-tab">
        <div className="button-1" />
        <div className="button-2" />
        <div className="button-3" />
      </div>
      <div className="main-pokedex">
        <div className="pokedex-slope">
          <img src={pokeballIcon} className="pokeball-icon" /> Pokédex
        </div>
        {children}
      </div>
    </>
  );
};

export default Container;
