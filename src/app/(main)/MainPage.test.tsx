import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { vi, describe, it, expect } from 'vitest';

import MainPage from './page';

import { useAppSelector } from '@/store/hooks';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div data-testid="mock-outlet">Outlet</div>,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

vi.mock('@/store/hooks', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

vi.mock('@/components/SearchSection', () => ({
  default: () => <div data-testid="mock-search-section"></div>,
}));

vi.mock('@/components/ResultList', () => ({
  default: () => <div data-testid="mock-result-list">ResultList</div>,
}));

vi.mock('@/components/Pagination', () => ({
  default: () => <div data-testid="mock-pagination">Pagination</div>,
}));

vi.mock('@/components/Loader', () => ({
  default: () => <div data-testid="mock-loader" />,
}));

describe('MainPage', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(''),
      vi.fn(),
    ]);
  });

  it('should throw error when crash error button is clicked', async () => {
    vi.mocked(useAppSelector).mockReturnValue({
      isLoading: false,
      characters: { results: [], error: null },
    });
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<MainPage />);

    const crashButton = screen.getByRole('button', {
      name: /create an error!/i,
    });

    expect(() => fireEvent.click(crashButton)).toThrow('I crashed!');
    consoleSpy.mockRestore();
  });
});
