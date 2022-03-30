import { useState, Fragment, useMemo } from 'react';
import { GetStaticProps } from 'next';
import Header from '../components/Header';
import PokemonItem from '../components/PokemonItem';
import Pagination from '../components/Pagination';
import { useDebounce } from '../hooks/useDebounce';
import { Pokemon } from '../types/interface';

const validatePokemonName = (name: string) => {
  const pokemonURL = {
    'nidoran-f': 'normal-sprite/nidoran_f',
    'nidoran-m': 'normal-sprite/nidoran_m',
    'mr-mime': 'normal-sprite/mr.mime',
    'deoxys-normal': 'normal-sprite/deoxys',
    'wormadam-plant': 'normal-sprite/wormadam',
    'mime-jr': 'normal-sprite/mime_jr',
    'giratina-altered': 'normal-sprite/giratina',
    'shaymin-land': 'normal-sprite/shaymin',
    'basculin-red-striped': 'normal-sprite/basculin',
    'darmanitan-standard': 'normal-sprite/darmanitan',
    'pumpkaboo-average': 'normal-sprite/pumpkaboo',
    'gourgeist-average': 'normal-sprite/gourgeist',
    'zygarde-50': 'normal-sprite/zygarde',
    'oricorio-baile': 'normal-sprite/oricorio',
    'lycanroc-midday': 'normal-sprite/lycanroc',
    'wishiwashi-solo': 'normal-sprite/wishiwashi',
    'type-null': 'normal-sprite/typenull',
    'minior-red-meteor': 'normal-sprite/minior',
    'mimikyu-disguised': 'normal-sprite/mimikyu',
    'tapu-koko': 'normal-sprite/tapukoko',
    'tapu-lele': 'normal-sprite/tapulele',
    'tapu-bulu': 'normal-sprite/tapubulu',
    'tapu-fini': 'normal-sprite/tapufini',
    'toxtricity-amped': 'normal-sprite/toxtricity',
    'sirfetchd': 'sprites-models/swsh-normal-sprites/sirfetchd',
    'kubfu': 'sprites-models/swsh-normal-sprites/kubfu',
    'urshifu-single-strike': 'sprites-models/swsh-normal-sprites/urshifu',
    'zarude': 'sprites-models/swsh-normal-sprites/zarude',
    'mr-rime': 'normal-sprite/mr.rime',
    'eiscue-ice': 'normal-sprite/eiscue',
    'indeedee-male': 'normal-sprite/indeedee',
    'morpeko-full-belly': 'normal-sprite/morpeko',
    'tornadus-incarnate': 'normal-sprite/tornadus',
    'thundurus-incarnate': 'normal-sprite/thundurus',
    'landorus-incarnate': 'normal-sprite/landorus',
    'keldeo-ordinary': 'normal-sprite/keldeo',
    'meloetta-aria': 'normal-sprite/meloetta',
    'meowstic-male': 'normal-sprite/meowstic',
    'aegislash-shield': 'normal-sprite/aegislash',
  };
  return name in pokemonURL ? pokemonURL[name] : 'normal-sprite/' + name;
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=300'); // total pokemons: 893
    const { results } = await res.json();
    const pokemonData: Pokemon[] = results.map((pokemon: Pokemon) => {
      const image = `https://projectpokemon.org/images/${validatePokemonName(pokemon.name)}.gif`;
      return { ...pokemon, image };
    });

    return {
      props: { pokemonData },
    };
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default function Home({ pokemonData }: { pokemonData: Pokemon[] }): JSX.Element {
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const [filter, setFilter] = useState('');

  const debouncedFilter = useDebounce(filter, 200);

  const filteredPokemons = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return pokemonData
      .filter((pokemon) => pokemon.name.toLowerCase().includes(debouncedFilter.toLowerCase()))
      .slice(firstPageIndex, lastPageIndex);
  }, [debouncedFilter, currentPage, pokemonData]);

  return (
    <Fragment>
      <Header />
      <div className="flex flex-col">
        <Fragment>
          <div className="flex justify-center my-8 mx-0">
            <button className="btn-navigation">Previous page</button>
            <input
              className="flex justify-center w-5/12 rounded-lg p-2 border-[1px] border-[#303030]"
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Enter keywords..."
            />
            <button className="btn-navigation">Next page</button>
          </div>
          {filteredPokemons.length ? (
            <div className="w-[70%] my-0 mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {filteredPokemons.map((pokemon, index) => (
                <PokemonItem key={pokemon.name} pokemon={pokemon} index={index} />
              ))}
            </div>
          ) : (
            <div className="mx-auto my-0 text-center font-medium leading-tight text-5xl text-[#FF4081]">
              No results
            </div>
          )}
          <div className="flex justify-center my-8">
            <Pagination
              className="bg-cyan-100 border-2 border-cyan-500 text-cyan-700 px-4 py-3 rounded-md"
              currentPage={currentPage}
              totalCount={pokemonData.length}
              pageSize={pageSize}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
            {/* <button className="btn-navigation">Previous page</button>
            <button className="btn-navigation">Next page</button> */}
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
}
