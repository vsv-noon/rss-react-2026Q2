import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import SearchSection from './SearchSection';

import useLocalStorage from '@/hooks/useLocalStorage';
import { useAppDispatch } from '@/store/hooks';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

vi.mock('@/store/hooks', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

vi.mock('@/hooks/useLocalStorage', () => ({ default: vi.fn() }));

vi.mock('@/store/slices/charactersSlice', () => ({
  fetchCharacters: vi.fn(),
}));

describe('SearchSection', () => {
  const mockNavigate = vi.fn();
  const mockSetSearchParams = vi.fn();
  const mockDispatch = vi.fn();
  const mockSetPersistedSearch = vi.fn();
  const mockAbort = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    mockDispatch.mockReturnValue({ abort: mockAbort });
    vi.mocked(useLocalStorage).mockReturnValue(['', mockSetPersistedSearch]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should renders input and button', () => {
    const mockParams = new URLSearchParams('');
    vi.mocked(useSearchParams).mockReturnValue([
      mockParams,
      mockSetSearchParams,
    ]);
    render(<SearchSection />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should initialized with the value from the query prop', () => {
    vi.mocked(useLocalStorage).mockReturnValue([
      'Rick',
      mockSetPersistedSearch,
    ]);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=2'),
      mockSetSearchParams,
    ]);

    render(<SearchSection />);
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    expect(input.value).toBe('Rick');
  });

  it('should update the internal value on input, but not call setPersistedSearch', async () => {
    render(<SearchSection />);
    const input = screen.getByPlaceholderText('Search...');

    await userEvent.type(input, 'Morty');

    expect(input).toHaveValue('Morty');
    expect(mockSetPersistedSearch).not.toHaveBeenCalled();
  });

  it('should calls setPersistedSearch with trim extra spaces on button click', async () => {
    render(<SearchSection />);
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, '  Summer  ');
    await userEvent.click(button);

    expect(mockSetPersistedSearch).toHaveBeenCalledWith('Summer');
    expect(mockSetPersistedSearch).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('Summer');
  });

  it('should calls setPersistedSearch with trim extra spaces on Enter key', async () => {
    render(<SearchSection />);
    const input = screen.getByPlaceholderText('Search...');

    await userEvent.type(input, '  Jerry  {Enter}');

    expect(mockSetPersistedSearch).toHaveBeenCalledWith('Jerry');
    expect(mockSetPersistedSearch).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('Jerry');
  });

  it("should didn't call setPersistedSearch on click any keys, except Enter", async () => {
    render(<SearchSection />);
    const input = screen.getByPlaceholderText('Search...');

    await userEvent.type(input, 'Beth{Escape}');

    expect(mockSetPersistedSearch).not.toHaveBeenCalled();
  });
});
