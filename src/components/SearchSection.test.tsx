import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { SearchSection } from './SearchSection';
import * as api from '../services/api';

describe('SearchSection', () => {
  const setFetchedCharacter = vi.fn();
  const setIsLoading = vi.fn();
  const mockFetchedCharacter = { results: [{ id: 1, name: 'Rick' }] };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(api, 'apiFetch').mockResolvedValue(mockFetchedCharacter);
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders input and button', () => {
    render(
      <SearchSection
        setFetchedCharacter={setFetchedCharacter}
        setIsLoading={setIsLoading}
      />
    );
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    render(
      <SearchSection
        setFetchedCharacter={setFetchedCharacter}
        setIsLoading={setIsLoading}
      />
    );
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Morty' } });
    expect(input.value).toBe('Morty');
  });

  test('calls handleSearch on button click', async () => {
    render(
      <SearchSection
        setFetchedCharacter={setFetchedCharacter}
        setIsLoading={setIsLoading}
      />
    );
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Summer' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(setIsLoading).toHaveBeenCalledWith(true);
      expect(api.apiFetch).toHaveBeenCalledWith('Summer');
      expect(setFetchedCharacter).toHaveBeenCalledWith(mockFetchedCharacter);
      expect(setIsLoading).toHaveBeenCalledWith(false);
      expect(localStorage.getItem('searchTerm')).toBe('Summer');
    });
  });

  test('calls handleSearch on Enter key', async () => {
    render(
      <SearchSection
        setFetchedCharacter={setFetchedCharacter}
        setIsLoading={setIsLoading}
      />
    );
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Beth' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(api.apiFetch).toHaveBeenCalledWith('Beth');
      expect(setFetchedCharacter).toHaveBeenCalledWith(mockFetchedCharacter);
    });
  });

  test('load last query from localStorage on mount', async () => {
    localStorage.setItem('searchTerm', 'Jerry');
    render(
      <SearchSection
        setFetchedCharacter={setFetchedCharacter}
        setIsLoading={setIsLoading}
      />
    );
    await waitFor(() => {
      expect(api.apiFetch).toHaveBeenCalledWith('Jerry');
      expect(screen.getByPlaceholderText('Search...')).toHaveValue('Jerry');
    });
  });

  test('calls handleSearch with empty string if on last query', async () => {
    render(
      <SearchSection
        setFetchedCharacter={setFetchedCharacter}
        setIsLoading={setIsLoading}
      />
    );
    await waitFor(() => {
      expect(api.apiFetch).toHaveBeenCalledWith('');
    });
  });
});
