import { describe, it, expect } from 'vitest';

import { store } from './store';

import { DEFAULT_TOTAL_PAGES } from '@/constants/constants';

describe('Redux Store', () => {
  it('should initialize with the correct reducer structure', () => {
    const state = store.getState();

    expect(state).toHaveProperty('characters');
    expect(state).toHaveProperty('selectedCards');
    expect(state.characters.characters).toBeNull();
    expect(state.characters.totalPages).toBe(DEFAULT_TOTAL_PAGES);
  });
});
