import { describe, it, expect } from 'vitest';

import reducer from './slice';
import { fetchCharacters } from './thunks';

import type { CharactersState } from './types';

import { DEFAULT_TOTAL_PAGES } from '@/constants/constants';

describe('charactersSlice', () => {
  const initialState: CharactersState = {
    characters: null,
    totalPages: DEFAULT_TOTAL_PAGES,
    isLoading: false,
    error: null,
  };

  it('should return the initial state when passed an empty action', () => {
    const result = reducer(undefined, { type: '' });
    expect(result);
  });

  it('should set isLoading to true and error to null when fetchCharacters is pending', () => {
    const prevState: CharactersState = {
      ...initialState,
      isLoading: false,
      error: 'previous error',
    };

    const action = { type: fetchCharacters.pending.type };
    const state = reducer(prevState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchCharacters.fulfilled and update characters and totalPages', () => {
    const mockPayload = {
      results: [{ id: 1, name: 'Rick' }],
      info: { pages: 10 },
    };

    const action = {
      type: fetchCharacters.fulfilled.type,
      payload: mockPayload,
    };

    const state = reducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.characters).toEqual(mockPayload);
    expect(state.totalPages).toBe(10);
  });

  it('should use default_total_pages if info.pages is missing in fulfilled payload', () => {
    const mockPayload = {
      result: [{ id: 2, name: 'Morty' }],
      info: undefined,
    };

    const action = {
      type: fetchCharacters.fulfilled.type,
      payload: mockPayload,
    };

    const state = reducer({ ...initialState, totalPages: 99 }, action);

    expect(state.totalPages).toBe(DEFAULT_TOTAL_PAGES);
  });

  it('should handle fetchCharacters.rejected and set error message', () => {
    const errorMessage = 'Failed to fetch data';
    const action = {
      type: fetchCharacters.rejected.type,
      payload: errorMessage,
    };

    const state = reducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
