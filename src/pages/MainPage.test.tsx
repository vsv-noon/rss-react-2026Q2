import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MainPage } from './MainPage';

vi.mock('../components/SearchSection', () => ({
  default: ({
    setIsLoading,
    setFetchedCharacter,
  }: {
    setIsLoading: (loading: boolean) => void;
    setFetchedCharacter: (character: { id: number; name: string }) => void;
  }) => (
    <div>
      <button onClick={() => setIsLoading(true)}>Set Loading</button>
      <button onClick={() => setFetchedCharacter({ id: 1, name: 'Rick' })}>
        Set Character
      </button>
    </div>
  ),
}));

vi.mock('../components/ResultList', () => ({
  default: ({
    isLoading,
    fetchedCharacter,
  }: {
    isLoading: boolean;
    fetchedCharacter: { id: number; name: string } | null;
  }) => (
    <div>
      {isLoading && <span>Loading...</span>}
      {fetchedCharacter && <span>{fetchedCharacter.name}</span>}
    </div>
  ),
}));

describe('MainPage', () => {
  test('renders SearchSection and ResultList', () => {
    render(<MainPage />);
    expect(screen.getByText('Set Loading')).toBeInTheDocument();
    expect(screen.getByText('Set Character')).toBeInTheDocument();
  });

  test('sets loading state when setIsLoading is called', () => {
    render(<MainPage />);
    fireEvent.click(screen.getByText('Set Loading'));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('sets fetchedCharacter when setFetchedCharacter is called', () => {
    render(<MainPage />);
    fireEvent.click(screen.getByText('Set Character'));
    expect(screen.getByText('Rick')).toBeInTheDocument();
  });

  test('throw error when error button is clicked', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      render(<MainPage />);
      fireEvent.click(screen.getByText('Create an error!'));
    }).toThrow('I crashed!');
    spy.mockRestore();
  });
});
