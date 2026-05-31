import { fireEvent, render, screen } from '@testing-library/react';
import { useParams, useOutletContext } from 'react-router-dom';
import { describe, it, vi, expect, beforeEach, type Mock } from 'vitest';

import CharacterDetails from './CharacterDetails';

import { useRefreshCache } from '@/hooks/useRefreshCache';
import { useGetCharacterByIdQuery } from '@/services/rickAndMortyApi';
import { getErrorMessage } from '@/utils/getErrorMessage';

vi.mock('react-router-dom', async () => ({
  useParams: vi.fn(),
  useOutletContext: vi.fn(),
}));

vi.mock('@/services/rickAndMortyApi', () => ({
  useGetCharacterByIdQuery: vi.fn(),
}));

vi.mock('@/hooks/useRefreshCache', () => ({
  useRefreshCache: vi.fn(),
}));

vi.mock('@/utils/getErrorMessage', () => ({
  getErrorMessage: vi.fn(() => 'Mocked Error Message'),
}));

vi.mock('@/components/Loader', () => ({
  default: ({ variant }: { variant: string }) => (
    <div data-testid="loader" data-variant={variant}>
      Loading...
    </div>
  ),
}));

describe('CharacterDetails', () => {
  const mockHandleClose = vi.fn();
  const mockRefreshCacheCharacterDetails = vi.fn();

  const mockCharacterData = {
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    location: { name: 'Earth (C-137)' },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useParams).mockReturnValue({ id: '1' });
    vi.mocked(useOutletContext).mockReturnValue({
      handleCloseCharacterDetails: mockHandleClose,
    });
    vi.mocked(useRefreshCache).mockReturnValue({
      refreshCacheCharacterDetails: mockRefreshCacheCharacterDetails,
      refreshCacheCharacters: vi.fn(),
    });
  });

  it('should render only the fullscreen loader when initial data is loading', async () => {
    (useGetCharacterByIdQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
      isError: false,
      error: null,
    });

    render(<CharacterDetails />);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('data-variant', 'overlay');
    expect(screen.queryByText('Name: Rick Sanchez')).not.toBeInTheDocument();
  });

  it('should render background overlay loader when isFetching is true but isLoading is false', () => {
    (useGetCharacterByIdQuery as Mock).mockReturnValue({
      data: mockCharacterData,
      isLoading: false,
      isFetching: true,
      isError: false,
      error: null,
    });

    render(<CharacterDetails />);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('data-variant', 'overlay');
  });

  it('renders character details successfully when data is loading', () => {
    (useGetCharacterByIdQuery as Mock).mockReturnValue({
      data: mockCharacterData,
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
    });

    render(<CharacterDetails />);

    expect(screen.getByText(/Name: Rick Sanchez/)).toBeInTheDocument();
    expect(screen.getByText(/Status: Alive/)).toBeInTheDocument();
  });

  it('should call handleCloseCharacterDetails when close button is clicked', async () => {
    (useGetCharacterByIdQuery as Mock).mockReturnValue({
      data: mockCharacterData,
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
    });

    render(<CharacterDetails />);

    const closeButton = await screen.findByText('x');

    fireEvent.click(closeButton);

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it('should display an error message in the UI when the API request fails', async () => {
    const mockError = { status: 404, data: 'Not Found' };
    (useGetCharacterByIdQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      isError: true,
      error: mockError,
    });

    render(<CharacterDetails />);

    expect(screen.getByText(/Error code/)).toBeInTheDocument();

    const errorMessage = await screen.findByTestId('error-message');

    expect(errorMessage).toBeInTheDocument();
    expect(getErrorMessage).toHaveBeenCalledWith(mockError);

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('should trigger cache invalidation hooks correctly when buttons are clicked', () => {
    (useGetCharacterByIdQuery as Mock).mockReturnValue({
      data: mockCharacterData,
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
    });

    render(<CharacterDetails />);

    const invalidateAllBtn = screen.getByText('All Character Details');
    fireEvent.click(invalidateAllBtn);
    expect(mockRefreshCacheCharacterDetails).toHaveBeenNthCalledWith(1);

    const invalidateSpecificBtn = screen.getByText('Rick Sanchez');
    fireEvent.click(invalidateSpecificBtn);
    expect(mockRefreshCacheCharacterDetails).toHaveBeenNthCalledWith(2, '1');
  });
});
