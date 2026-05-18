import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchSection from './SearchSection';
import { MemoryRouter } from 'react-router-dom';

describe('SearchSection', () => {
  const mockSetQuery = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should renders input and button', () => {
    render(
      <MemoryRouter>
        <SearchSection query="Rick" setQuery={mockSetQuery} />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should initialized with the value from the query prop', () => {
    render(
      <MemoryRouter>
        <SearchSection query="Rick" setQuery={mockSetQuery} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    expect(input.value).toBe('Rick');
  });

  it('should update the internal value on input, but not call setQuery', async () => {
    render(
      <MemoryRouter>
        <SearchSection query="" setQuery={mockSetQuery} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Search...');

    await userEvent.type(input, 'Morty');

    expect(input).toHaveValue('Morty');
    expect(mockSetQuery).not.toHaveBeenCalled();
  });

  it('should calls setQuery with trim extra spaces on button click', async () => {
    render(
      <MemoryRouter>
        <SearchSection query="" setQuery={mockSetQuery} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, '  Summer  ');
    await userEvent.click(button);

    expect(mockSetQuery).toHaveBeenCalledWith('Summer');
    expect(mockSetQuery).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('Summer');
  });

  it('should calls setQuery with trim extra spaces on Enter key', async () => {
    render(
      <MemoryRouter>
        <SearchSection query="" setQuery={mockSetQuery} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Search...');

    await userEvent.type(input, '  Jerry  {Enter}');

    expect(mockSetQuery).toHaveBeenCalledWith('Jerry');
    expect(mockSetQuery).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('Jerry');
  });

  it("should didn't call setQuery on click any keys, except Enter", async () => {
    render(
      <MemoryRouter>
        <SearchSection query="" setQuery={mockSetQuery} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Search...');

    await userEvent.type(input, 'Beth{Escape}');

    expect(mockSetQuery).not.toHaveBeenCalled();
  });
});
