import Link from 'next/link';
import Image from 'next/image';
import { Pokemon } from '../types/interface';

function PokemonItem({ pokemon, index }: { pokemon: Pokemon; index: number }): JSX.Element {
  return (
    <div
      key={index}
      className="z-10 relative bg-[#f1faee] text-[#112A46] rounded-2xl cursor-pointer overflow-hidden 
      transition-all duration-[.6s] shine-effect hover:z-40 hover:scale-[1.15]"
    >
      <Link href={`/pokemon/${pokemon.name}`}>
        <a className="border p-4 border-grey hover:shadow-md capitalize flex justify-evenly items-center text-lg bg-[#caf0f8] rounded-md">
          <div>
            <Image src={pokemon.image} alt={pokemon.name} width="80px" height="80px" />
          </div>
          <div>
            <span className="mr-1 font-bold">{index + 1}.</span>
            <span>{pokemon.name}</span>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default PokemonItem;
