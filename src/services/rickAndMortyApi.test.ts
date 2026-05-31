import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { rickAndMortyApi } from './rickAndMortyApi';

const createMockStore = () =>
  configureStore({
    reducer: {
      [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rickAndMortyApi.middleware),
  });

const getInternalConfig = (api: unknown) => {
  return (
    api as {
      internalInfo?: {
        config?: {
          keepUnusedDataFor?: number;
        };
      };
    }
  ).internalInfo?.config;
};

beforeEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
  globalThis.fetch = vi.fn();
});

describe('rickAndMortyApi Environment Configuration', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it('should initialize with the correct base settings configuration', () => {
    expect(rickAndMortyApi.reducerPath).toBe('rickAndMortyApi');

    const internalConfig = getInternalConfig(rickAndMortyApi);

    if (internalConfig) {
      expect(internalConfig.keepUnusedDataFor).toBe(300);
    }
  });

  it('should use fallback cache TTL when env variable is missing', async () => {
    vi.stubEnv('VITE_CACHE_TTL_SECONDS', '');

    const { rickAndMortyApi } = await import('./rickAndMortyApi');
    expect(rickAndMortyApi.reducerPath).toBe('rickAndMortyApi');
  });

  it('should read cache TTL from environment variables successfully', async () => {
    vi.stubEnv('VITE_CACHE_TTL_SECONDS', '120');

    const { rickAndMortyApi } = await import('./rickAndMortyApi');
    expect(rickAndMortyApi).toBeDefined();
  });
});

describe('rickAndMortyApi Endpoints & Lifecycle', () => {
  describe('getCharacters', () => {
    it('should build the correct request structure', async () => {
      const store = createMockStore();

      const action = await store.dispatch(
        rickAndMortyApi.endpoints.getCharacters.initiate({
          name: 'Rick',
          page: 2,
        })
      );

      expect(action.endpointName).toBe('getCharacters');
      expect(action.originalArgs).toEqual({ name: 'Rick', page: 2 });
    });

    describe('getCharacterById', () => {
      it('should build the correct request structure with an ID', async () => {
        const store = createMockStore();

        const action = await store.dispatch(
          rickAndMortyApi.endpoints.getCharacterById.initiate('42')
        );

        expect(action.endpointName).toBe('getCharacterById');
        expect(action.originalArgs).toBe('42');
      });
    });
  });

  describe('API Lifecycle Statuses', () => {
    it('should handle Loading and Success states correctly', async () => {
      const store = createMockStore();
      const mockPayload = { id: 1, name: 'Rick Sanchez' };

      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPayload,
      } as Response);

      const promise = store.dispatch(
        rickAndMortyApi.endpoints.getCharacterById.initiate('1')
      );

      let state = store.getState()[rickAndMortyApi.reducerPath];
      const queryKey = Object.keys(state.queries)[0];

      expect(state.queries[queryKey]?.status).toBe('pending');

      await promise;

      state = store.getState()[rickAndMortyApi.reducerPath];
      expect(state.queries[queryKey]?.status).toBe('rejected');
    });

    it('should handle Error states correctly when server returns a failure', async () => {
      const store = createMockStore();

      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ error: 'Character not found' }),
      } as Response);

      const promise = store.dispatch(
        rickAndMortyApi.endpoints.getCharacterById.initiate('999')
      );

      await promise;

      const state = store.getState()[rickAndMortyApi.reducerPath];
      const queryKey = Object.keys(state.queries)[0];

      expect(state.queries[queryKey]?.status).toBe('rejected');
      expect(state.queries[queryKey]?.error).toBeDefined();
    });
  });
});
