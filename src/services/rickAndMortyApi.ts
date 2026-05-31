import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { getCharactersArgs } from './types';
import type { ApiResponse } from '@/types/types';

const CACHE_TTL_SECONDS = Number(import.meta.env.VITE_CACHE_TTL_SECONDS) || 300;

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  keepUnusedDataFor: CACHE_TTL_SECONDS,
  tagTypes: ['Characters', 'Details'],
  endpoints: (builder) => ({
    getCharacters: builder.query<ApiResponse, getCharactersArgs>({
      query: ({ name, page }) => ({
        url: 'character',
        params: { name, page },
      }),
      providesTags: ['Characters'],
    }),
    getCharacterById: builder.query({
      query: (id) => `character/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Details', id }],
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } =
  rickAndMortyApi;
