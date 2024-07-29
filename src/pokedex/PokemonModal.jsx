import { generateImageLink } from "../functions/common";
import PropTypes from "prop-types";

export const PokemonModal = ({ pokemon, modalRef }) => {
  const name = pokemon?.species?.name;
  const pokemonId = pokemon?.id;
  const pokemonImage = generateImageLink({ pokemonId });
  const pokemonName = pokemon?.species?.name;
  const types = pokemon?.types || [];
  const principalType = types.length > 0 ? types[0].type : "";
  const classNameType = `col-12 col-md-6 pokemon-bg color-type-${principalType.name}`;
  const typeBadges = types.map((type, i) => {
    const typeClass = `badge-type type-${type.type.name}`;
    return <div className={typeClass} key={i} />;
  });
  const abilities = (pokemon?.abilities || [])
    .map((ab) => ab.ability.name.replaceAll("-", " "))
    .join(", ");

  let chain = pokemon?.evolutionChain?.chain;
  const evolutionChain = chain?.species;

  const evolutionChainComponent = [
    <div className="col-auto" key="a">
      <span
        className={`${
          evolutionChain?.name === name ? "current-evolution" : ""
        }`}
      >
        {evolutionChain?.name}
      </span>
    </div>,
  ];
  if ((chain?.evolves_to || []).length > 0) {
    evolutionChainComponent.push(
      <div className="col-auto" key="b">
        {chain.evolves_to.map((x, i) => {
          return (
            <div className="row" key={i}>
              <div className="col-auto" key="c">
                <span
                  className={`${
                    x.species.name === name ? "current-evolution" : ""
                  }`}
                >
                  {x.species.name}
                </span>
              </div>
              {x.evolves_to.length > 0 ? (
                <div className="col-auto row" key="d">
                  {x.evolves_to.map((y, j = 100) => (
                    <div className="col-auto" key={j}>
                      <span
                        className={`${
                          y.species.name === name ? "current-evolution" : ""
                        }`}
                      >
                        {y.species.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className="modal fade"
      id="PokemonModal"
      aria-hidden="true"
      aria-labelledby="PokemonModalLabel"
      tabIndex={-1}
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-m-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              x
            </button>
            <h5 className="modal-title" id="PokemonModalLabel">
              {name}
            </h5>
          </div>
          <div className="modal-body mx-3">
            <div className="row">
              <div className={classNameType}>
                <div className="pokemon-number">
                  #{pokemon?.nationalPokedexNumber}
                </div>
                <div className="pokemon-types">{typeBadges}</div>
                <img
                  src={pokemonImage}
                  alt={`#${pokemon?.nationalPokedexNumber} ${pokemonName}`}
                  className="pokemon-image"
                />
              </div>
              <div className="col-12 col-md-6">
                <div className="row">
                  <div className="col-12 pokemon-title">{pokemonName}</div>
                  <div className="col-12 pokemon-weight">
                    {pokemon?.weight / 10} kg
                  </div>
                  <div className="col-12">{pokemon?.description}</div>
                  <div className="col-12 mt-3 fw-bold">Abilities</div>
                  <div className="col-12 text-capitalize">{abilities}</div>
                  <div className="col-12 mt-3 fw-bold">Evolution chain</div>
                  <div className="col-12 row evolution-chain">
                    {evolutionChainComponent}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PokemonModal.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number,
    weight: PropTypes.number,
    species: PropTypes.shape({
      name: PropTypes.string,
    }),
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string,
        }),
      })
    ),
    abilities: PropTypes.arrayOf(
      PropTypes.shape({
        ability: PropTypes.shape({
          name: PropTypes.string,
        }),
      })
    ),
    evolutionChain: PropTypes.shape({
      chain: PropTypes.shape({
        species: PropTypes.object,
      }),
    }),
    nationalPokedexNumber: PropTypes.number,
    description: PropTypes.string,
  }),
  modalRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.instanceOf(Element),
    }),
  ]),
};

export default PokemonModal;
