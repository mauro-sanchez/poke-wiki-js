import pokeballIcon from "../assets/pokeball_icon.svg";
import PropTypes from "prop-types";

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

Container.propTypes = {
  children: PropTypes.node,
};


export default Container;

