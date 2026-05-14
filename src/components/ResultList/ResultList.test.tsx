import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultList from './ResultList';
import { type Character } from '@/types/types';

vi.mock('@/components/Card', () => {
  return {
    default: ({ character }: { character: Character }) => (
      <div data-testid="mock-card">{character.name}</div>
    ),
  };
});

const mockCharacters = [
  { id: 1, name: 'Rick Sanchez', status: 'Alive', image: 'rick.png' },
  { id: 2, name: 'Morty Smith', status: 'Alive', image: 'morty.png' },
] as Character[];

describe('ResultList', () => {
  it('should render the correct number of cards when given data', () => {
    const props = {
      characters: {
        results: mockCharacters,
        info: { count: 2, pages: 1, next: null, prev: null },
      },
    };

    render(<ResultList {...props} />);

    const cards = screen.getAllByTestId('mock-card');

    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Rick Sanchez');
    expect(cards[1]).toHaveTextContent('Morty Smith');
  });

  it('should renders nothing when characters is null and not loading', () => {
    render(<ResultList characters={null} />);

    const cards = screen.queryAllByTestId('mock-card');
    expect(cards).toHaveLength(0);
    expect(screen.queryByAltText(/loading/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });
});
