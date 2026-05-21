import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ResultList from './ResultList';

import { useAppSelector } from '@/store/hooks';
import { type Character } from '@/types/types';

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

const mockCharacters = [
  { id: 1, name: 'Rick Sanchez', status: 'Alive', image: 'rick.png' },
  { id: 2, name: 'Morty Smith', status: 'Alive', image: 'morty.png' },
] as Character[];

describe('ResultList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the correct number of cards when given data', () => {
    vi.mocked(useAppSelector).mockReturnValue({ results: mockCharacters });

    render(<ResultList />);

    const cards = screen.getAllByTestId('mock-card');

    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Rick Sanchez');
    expect(cards[1]).toHaveTextContent('Morty Smith');
  });

  it('should renders nothing when characters is null and not loading', () => {
    vi.mocked(useAppSelector).mockReturnValue({ results: [] });
    render(<ResultList />);

    const cards = screen.queryAllByTestId('mock-card');
    expect(cards).toHaveLength(0);
    expect(screen.queryByAltText(/loading/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });
});
