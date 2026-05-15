import { fireEvent, render, screen } from '@testing-library/react';
import {
  describe,
  it,
  vi,
  expect,
  beforeEach,
  afterEach,
  type Mock,
} from 'vitest';
import { useParams, useOutletContext, MemoryRouter } from 'react-router-dom';
import CharacterDetails from './CharacterDetails';
import * as api from '@/services/api';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<object>('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useOutletContext: vi.fn(),
  };
});

vi.mock('@/services/api', () => ({
  apiFetch: vi.fn(),
}));

vi.mock('@components/Loader', () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

describe('CharacterDetails', () => {
  const mockCharacter = {
    id: '1',
    name: 'Rick Sanchez',
    image: 'rick.png',
    status: 'Alive',
    location: 'Earth',
  };

  const handleCloseCharacterDetails = vi.fn();

  beforeEach(() => {
    (useParams as Mock).mockReturnValue({ id: '1' });
    (useOutletContext as Mock).mockReturnValue({
      handleCloseCharacterDetails,
    });
    (api.apiFetch as Mock).mockResolvedValue(mockCharacter);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the loader initially', async () => {
    render(
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>
    );
    expect(screen.getByRole('status')).toBeInTheDocument();

    await screen.findAllByText('x');
  });

  it('should call handleCloseCharacterDetails when close button is clicked', async () => {
    render(
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>
    );

    const closeButton = await screen.findByText('x');

    fireEvent.click(closeButton);

    expect(handleCloseCharacterDetails).toHaveBeenCalled();
  });

  it('should display an error message in the UI when the API request fails', async () => {
    (api.apiFetch as Mock).mockRejectedValueOnce(new Error('Database Down'));

    render(
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>
    );

    const errorMessage = await screen.findByTestId('error-message');

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(
      'Failed to fetch characters. Please try again later.'
    );

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByText('Name:')).not.toBeInTheDocument();
  });
});
