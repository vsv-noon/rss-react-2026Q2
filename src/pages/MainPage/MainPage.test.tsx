import { vi, describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MainPage from './MainPage';
import { apiFetch } from '@/services/api';
import type { ApiResponse } from '@/types/types';

const mockNavigate = vi.fn();
let mockSearchParams = new URLSearchParams('');

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useSearchParams: () => [mockSearchParams],
  Outlet: () => <div data-testid="mock-outlet" />,
}));

vi.mock('@/services/api', () => ({ apiFetch: vi.fn() }));

const mockSetQuery = vi.fn();
vi.mock('@/hooks/useLocalStorage', () => ({
  default: (key: string, initialValue: string) => ['Rick', mockSetQuery],
}));

vi.mock('@/components/SearchSection', () => ({
  default: () => <div data-testid="search-section"></div>,
}));

vi.mock('@/components/ResultList', () => ({
  default: ({ characters }: { characters: ApiResponse | null }) => (
    <div data-testid="result-list">{characters?.results?.[0]?.name}</div>
  ),
}));

vi.mock('@/components/Pagination', () => ({
  default: ({ onPageChange }: { onPageChange: (page: number) => void }) => (
    <button data-testid="page-change-btn" onClick={() => onPageChange(2)}>
      Go to Page 2
    </button>
  ),
}));

vi.mock('@/components/Loader', () => ({
  default: () => <div data-testid="loader" />,
}));

const mockApiResponse = {
  info: { pages: 5, count: 100, next: null, prev: null },
  results: [{ id: 1, name: 'Rick Sanchez' }],
};

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams('');
    vi.mocked(apiFetch).mockResolvedValue(mockApiResponse);
  });

  it('should throw error when error button is clicked', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      render(<MainPage />);
      fireEvent.click(screen.getByText('Create an error!'));
    }).toThrow('I crashed!');
    spy.mockRestore();
  });

  it('should show loader and calls apiFetch on init', async () => {
    render(<MainPage />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    expect(apiFetch).toHaveBeenCalledWith({
      searchString: 'Rick',
      page: '1',
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
    expect(screen.getByTestId('result-list')).toHaveTextContent('Rick Sanchez');
  });

  it('should calls navigate with new page on click pagination button', async () => {
    render(<MainPage />);

    await waitFor(() =>
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    );

    const pageBtn = screen.getByTestId('page-change-btn');
    fireEvent.click(pageBtn);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });

  it('should throw error when error button is clicked', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      render(<MainPage />);
      fireEvent.click(screen.getByText('Create an error!'));
    }).toThrow('I crashed!');
    spy.mockRestore();
  });

  it('should correctly display an error if characters are not found on the backend', async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      error: 'There is nothing here',
      results: null,
      info: { pages: 0, count: 0, next: null, prev: null },
    });

    render(<MainPage />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'There is nothing here'
      );
    });
  });
});
