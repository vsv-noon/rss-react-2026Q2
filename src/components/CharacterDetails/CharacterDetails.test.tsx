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
import { useParams, useOutletContext } from 'react-router-dom';
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
    vi.useFakeTimers();
    (useParams as Mock).mockReturnValue({ id: '1' });
    (useOutletContext as Mock).mockReturnValue({
      handleCloseCharacterDetails,
    });
    (api.apiFetch as Mock).mockResolvedValue(mockCharacter);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should render the loader initially', async () => {
    render(<CharacterDetails />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should call handleCloseCharacterDetails when close button is clicked', async () => {
    render(<CharacterDetails />);
    vi.runAllTimers();
    await vi.waitFor(() => {
      expect(screen.getByText('x')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('x'));
    expect(handleCloseCharacterDetails).toHaveBeenCalled();
  });
});
