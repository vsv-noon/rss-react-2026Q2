import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { getCharactersArgs } from './types';
import type { ApiResponse } from '@/types/types';

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<ApiResponse, getCharactersArgs>({
      query: ({ name, page }) => ({
        url: 'character',
        params: { name, page },
      }),
    }),
    getCharacterById: builder.query({
      query: (id) => `character/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } =
  rickAndMortyApi;
