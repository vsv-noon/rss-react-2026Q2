import { fireEvent, render, screen } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { describe, it, expect, type Mock } from 'vitest';

import ResultList from './ResultList';

import { useNavigateWithParams } from '@/hooks/useNavigateWithParams';
import { useRefreshCache } from '@/hooks/useRefreshCache';
import { useGetCharactersQuery } from '@/services/rickAndMortyApi';
import { type Character } from '@/types/types';

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
}));

vi.mock('@/services/rickAndMortyApi', () => ({
  useGetCharactersQuery: vi.fn(),
}));

vi.mock('@/hooks/useNavigateWithParams', () => ({
  navigateToPage: vi.fn(),
  useNavigateWithParams: vi.fn(),
}));

vi.mock('@/hooks/useRefreshCache', () => ({
  useRefreshCache: vi.fn(),
}));

vi.mock('../Loader', () => ({
  default: ({ variant }: { variant: string }) => (
    <div data-testid="loader" data-variant={variant}>
      Loading...
    </div>
  ),
}));

vi.mock('../Pagination', () => ({
  default: ({ totalPages }: { totalPages: number }) => (
    <div data-testid="pagination">Pages: {totalPages}</div>
  ),
}));

vi.mock('@/components/Card', () => {
  return {
    default: ({ character }: { character: Character }) => (
      <div data-testid="mock-card">{character.name}</div>
    ),
  };
});

vi.mock('@/store/hooks', () => ({
  useAppSelector: vi.fn(),
}));

const mockCharactersData = {
  info: { pages: 5, count: 100 },
  results: [
    { id: 1, name: 'Rick Sanchez', status: 'Alive', image: 'rick.png' },
    { id: 2, name: 'Morty Smith', status: 'Alive', image: 'morty.png' },
  ] as Character[],
};

describe('ResultList', () => {
  const mockNavigateToPage = vi.fn();
  const mockRefreshCacheCharacters = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useNavigateWithParams).mockReturnValue({
      navigateToPage: mockNavigateToPage,
    });
    vi.mocked(useRefreshCache).mockReturnValue({
      refreshCacheCharacters: mockRefreshCacheCharacters,
      refreshCacheCharacterDetails: vi.fn(),
    });
  });

  it('should list rendered Cards and Pagination context when data resolves successfully', () => {
    const mockParamGet = () => null;
    (useSearchParams as Mock).mockReturnValue([{ get: mockParamGet }, vi.fn()]);
    (useGetCharactersQuery as Mock).mockReturnValue({
      data: mockCharactersData,
      isLoading: false,
      isFetching: false,
      isError: false,
    });

    render(<ResultList />);

    expect(screen.getByTestId('pagination')).toHaveTextContent('Pages: 5');

    const cards = screen.getAllByTestId('mock-card');

    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Rick Sanchez');
    expect(cards[1]).toHaveTextContent('Morty Smith');
  });

  it('should renders nothing when characters is null and not loading', () => {
    (useGetCharactersQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      isError: false,
    });

    render(<ResultList />);

    const cards = screen.queryAllByTestId('mock-card');
    expect(cards).toHaveLength(0);
    expect(screen.queryByAltText(/loading/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });

  it('should execute cache refresh handler when clicking invalidation CTA button', () => {
    const mockParamGet = () => null;
    (useSearchParams as Mock).mockReturnValue([{ get: mockParamGet }, vi.fn()]);

    (useGetCharactersQuery as Mock).mockReturnValue({
      data: mockCharactersData,
      isLoading: false,
      isFetching: false,
      isError: false,
    });

    render(<ResultList />);

    const invalidateBtn = screen.getByRole('button', {
      name: /invalidate cache/i,
    });
    fireEvent.click(invalidateBtn);

    expect(mockRefreshCacheCharacters).toHaveBeenCalledTimes(1);
  });
});
