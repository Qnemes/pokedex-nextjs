import typeColors from './elementColor';
import Image from 'next/image';

type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

function PokemonPage({ pokemon }): JSX.Element {
  return (
    <div
      className="z-10 relative bg-[#f1faee] text-[#112A46] rounded-2xl cursor-pointer overflow-hidden 
      transition-all duration-[.6s] w-1/2 mx-auto my-2"
    >
      <div className="text-center font-extrabold capitalize">{pokemon.name}</div>
      <div className="bg-[#caf0f8] mb-1">
        <Image
          width="40px"
          height="40px"
          className="mx-auto my-0"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
      </div>

      <div className="flex justify-center">
        {pokemon.types.map((type: PokemonType) => {
          return (
            <div
              key={type.slot}
              className="capitalize py-2 px-4 m-4 rounded-lg text-white"
              style={{ backgroundColor: typeColors[type.type.name] }}
            >
              {type.type.name}
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <div className="capitalize pb-4">
          <p className="font-bold">Weight:</p>
          <p>{pokemon.weight}</p>
        </div>
        <div className="capitalize pb-4">
          <p className="font-bold">Height:</p>
          <p>{pokemon.height}</p>
        </div>
        <div className="capitalize pb-4">
          <p className="font-bold">Abilities:</p>
          {pokemon.abilities.map((ability, i) => (
            <p key={i}>{ability.ability.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonPage;
