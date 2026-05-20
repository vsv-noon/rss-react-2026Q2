import { createSlice } from '@reduxjs/toolkit';

import type { CharactersState } from './types';

const initialState: CharactersState = {
  characters: null,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters(state, action) {
      state.characters = action.payload;
    },
  },
});

export const { setCharacters } = charactersSlice.actions;
export default charactersSlice.reducer;
