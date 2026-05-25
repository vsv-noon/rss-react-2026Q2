import { describe, it, expect, vi, beforeEach } from 'vitest';

import { fetchCharacters, type FetchCharactersArgs } from './thunks';

import { apiFetch } from '@/services/api';

vi.mock('@/services/api', () => ({
  apiFetch: vi.fn(),
}));

describe('fetchCharacters thunk', () => {
  const mockArgs: FetchCharactersArgs = { searchQuery: 'Rick', page: '1' };

  const mockResponse = {
    info: { pages: 10, count: 20 },
    results: [{ id: 1, name: 'Rick Sanchez' }],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch pending and fulfilled actions an successful API call', async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce(mockResponse);

    const dispatch = vi.fn();
    const getState = vi.fn();

    const result = await fetchCharacters(mockArgs)(
      dispatch,
      getState,
      undefined
    );

    expect(apiFetch).toHaveBeenCalledWith({
      searchString: 'Rick',
      page: '1',
    });

    expect(result.type).toBe('characters/fetchCharacters/fulfilled');
    expect(result.payload).toEqual(mockResponse);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0].type).toBe(
      'characters/fetchCharacters/pending'
    );
    expect(dispatch.mock.calls[1][0].type).toBe(
      'characters/fetchCharacters/fulfilled'
    );
  });

  it('should dispatch rejected action with error message when apiFetch throws an Error', async () => {
    const customErrorMessage = 'Network Error';
    vi.mocked(apiFetch).mockRejectedValueOnce(new Error(customErrorMessage));

    const dispatch = vi.fn();
    const getState = vi.fn();

    const result = await fetchCharacters(mockArgs)(
      dispatch,
      getState,
      undefined
    );

    expect(result.type).toBe('characters/fetchCharacters/rejected');
    expect(result.payload).toBe(customErrorMessage);
  });

  it('should use default message when apiFetch throws an unknown error type', async () => {
    vi.mocked(apiFetch).mockRejectedValueOnce('Some string error');

    const dispatch = vi.fn();
    const getState = vi.fn();

    const result = await fetchCharacters(mockArgs)(
      dispatch,
      getState,
      undefined
    );

    expect(result.type).toBe('characters/fetchCharacters/rejected');
    expect(result.payload).toBe('Failed to fetch characters');
  });
});
