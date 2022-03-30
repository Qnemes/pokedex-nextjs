import { GetStaticProps, GetStaticPaths } from 'next';
import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Pokemon } from '../../types/interface';
import PokemonPage from '../../components/PokemonPage';

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=800'); // 893
  const { results } = await res.json();
  const paths = results.map((pokemon: Pokemon) => ({
    params: { name: pokemon.name },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { name } = params;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon = await res.json();

    return {
      props: { pokemon },
    };
  } catch (error) {
    console.log(error.message);
  }
};

const Pokemon = ({ pokemon }): JSX.Element => {
  return (
    <Fragment>
      <Head>
        <title>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</title>
      </Head>
      <PokemonPage pokemon={pokemon} />
      <div className="capitalize mt-10 text-center">
        <Link href="/">
          <a>
            <button className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg">
              Back to Home
            </button>
          </a>
        </Link>
      </div>
    </Fragment>
  );
};

export default Pokemon;
