import { cache } from 'react';

const BASE_URL = 'https://rickandmortyapi.com/api';

export interface GetCharactersParams {
  name?: string;
  page?: number;
}

export const getCharacters = cache(
  async ({ name = '', page = 1 }: GetCharactersParams) => {
    const url = `${BASE_URL}/character?name=${name}&page=${page}`;
    console.log(url);

    const res = await fetch(url, {
      next: {
        revalidate: 60,
        tags: ['characters'],
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return {
          info: { pages: 0 },
          results: [],
        };
      }

      throw new Error('Failed to fetch characters');
    }

    const data = await res.json();

    return {
      info: data.info ?? { pages: 0 },
      results: data.results ?? [],
    };
  }
);
