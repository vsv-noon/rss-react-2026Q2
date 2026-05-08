import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultList from './ResultList';

describe('Loader', () => {
  test('renders loading spinner when isLoading is true', () => {
    render(<ResultList isLoading={true} fetchedCharacter={null} />);
    expect(screen.getByAltText(/loading/i)).toBeInTheDocument();
  });
});
