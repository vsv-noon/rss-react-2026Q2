import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiFetch } from '@/services/api';
import { type ApiResponse } from '@/types/types';

export type FetchCharactersArgs = {
  searchQuery: string;
  page: string;
};

export const fetchCharacters = createAsyncThunk<
  ApiResponse,
  FetchCharactersArgs,
  { rejectValue: string }
>(
  'characters/fetchCharacters',
  async ({ searchQuery, page }, { rejectWithValue }) => {
    try {
      const data = await apiFetch({
        searchString: searchQuery,
        page: page,
      });
      return data;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to fetch characters';
      return rejectWithValue(message);
    }
  }
);
