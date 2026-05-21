import { createSlice } from '@reduxjs/toolkit';

import { fetchCharacters } from './thunks';

import type { CharactersState } from './types';

import { DEFAULT_TOTAL_PAGES } from '@/constants/constants';

const initialState: CharactersState = {
  characters: null,
  totalPages: DEFAULT_TOTAL_PAGES,
  isLoading: false,
  error: null,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.characters = action.payload;
        state.totalPages = action.payload.info?.pages || DEFAULT_TOTAL_PAGES;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default charactersSlice.reducer;
