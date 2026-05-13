import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultList from './ResultList';
import { type ApiResponse } from '@/types/types';

describe('ResultList', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: 'rick.png',
    episode: [],
    url: '',
    created: '',
  };

  test('renders character cards when characters has results and not loading', () => {
    const data: ApiResponse = { results: [mockCharacter] };
    render(<ResultList isLoading={false} characters={data} />);
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
  });

  test('renders nothing when characters is null and not loading', () => {
    render(<ResultList isLoading={false} characters={null} />);
    expect(screen.queryByAltText(/loading/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });

  test('renders error message when characters has error and not loading', () => {
    const errorData: ApiResponse = { error: 'Not found' };
    render(<ResultList isLoading={false} characters={errorData} />);
    expect(screen.getByText(/Not found/i)).toBeInTheDocument();
  });
});
