import { describe, test, expect, vi, beforeEach } from 'vitest';
import { apiFetch } from './api';

globalThis.fetch = vi.fn();

describe('apiFetch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('return data when response is ok', async () => {
    const mockData = { results: [{ id: 1, name: 'Rick' }] };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await apiFetch('');

    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      expect.objectContaining({
        href: 'https://rickandmortyapi.com/api/character/',
      })
    );
  });

  test('add search parameter when searchString is provided', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as Response);

    await apiFetch('morty');

    const calledUrl = (vi.mocked(fetch).mock.calls[0][0] as URL).href;
    expect(calledUrl).toContain('name=morty');
  });

  test('handle 404 status without throwing in response check', async () => {
    const mockNotFound = { error: 'Not Found' };
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => mockNotFound,
    } as Response);

    const result = await apiFetch('unknown');
    expect(result).toEqual(mockNotFound);
  });

  test('throw "Failed to fetch characters" on network error', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network Down'));

    await expect(apiFetch('')).rejects.toThrow('Failed to fetch characters');
  });

  test('throw on server error (5xx)', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    await expect(apiFetch('')).rejects.toThrow('Failed to fetch characters');
  });
});
