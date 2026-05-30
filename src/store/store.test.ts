import { describe, it, expect } from 'vitest';

import { store } from './store';

describe('Redux Store', () => {
  it('should initialize with the correct reducer structure', () => {
    const state = store.getState();

    expect(state).toHaveProperty('selectedCards');
  });
});
