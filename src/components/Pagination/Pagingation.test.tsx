import { render, fireEvent, screen } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import Pagination from './Pagination';

import { useNavigateWithParams } from '@/hooks/useNavigateWithParams';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('@/hooks/useNavigateWithParams', () => ({
  useNavigateWithParams: vi.fn(),
}));

describe('Pagination', () => {
  const mockNavigateToPage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigateWithParams).mockReturnValue({
      navigateToPage: mockNavigateToPage,
    });
  });

  it('should render without crashing', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=1'),
      vi.fn(),
    ]);
    render(<Pagination totalPages={5} />);
    expect(screen.getByRole('button', { name: /<</i })).toBeInTheDocument();
  });

  it('should return null (nothing render), if totalPages <= 0', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(''),
      vi.fn(),
    ]);

    const { container } = render(<Pagination totalPages={0} />);
    expect(container.firstChild).toBeNull();
  });

  it('should disable first page button on first page', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=1'),
      vi.fn(),
    ]);
    render(<Pagination totalPages={5} />);
    expect(screen.getByRole('button', { name: /<</i })).toBeDisabled();
  });

  it('should disable previous button on first page', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=1'),
      vi.fn(),
    ]);
    render(<Pagination totalPages={5} />);
    expect(screen.getByRole('button', { name: '<' })).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=5'),
      vi.fn(),
    ]);
    render(<Pagination totalPages={5} />);
    expect(screen.getByRole('button', { name: '>' })).toBeDisabled();
  });

  it('should disable last page button on last page', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=5'),
      vi.fn(),
    ]);
    render(<Pagination totalPages={5} />);
    expect(screen.getByRole('button', { name: />>/i })).toBeDisabled();
  });

  it('should call onPageChange with next page when next is clicked', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=2'),
      vi.fn(),
    ]);
    render(<Pagination totalPages={5} />);
    fireEvent.click(screen.getByRole('button', { name: '>' }));
    expect(mockNavigateToPage).toHaveBeenCalledWith(3);
  });

  it('should call change currentPage with previous page when previous is clicked', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=3'),
      vi.fn(),
    ]);
    render(<Pagination totalPages={5} />);
    fireEvent.click(screen.getByRole('button', { name: '<' }));
    expect(mockNavigateToPage).toHaveBeenCalledWith(2);
  });

  it('should call First Page when first-page buttons is clicked', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=5'),
      vi.fn(),
    ]);
    render(<Pagination totalPages={5} />);
    fireEvent.click(screen.getByRole('button', { name: /<</i }));
    expect(mockNavigateToPage).toHaveBeenCalledWith(1);
  });

  it('should call Last Page when last-page buttons is clicked', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=1'),
      vi.fn(),
    ]);
    render(<Pagination totalPages={5} />);
    fireEvent.click(screen.getByRole('button', { name: />>/i }));
    expect(mockNavigateToPage).toHaveBeenCalledWith(5);
  });
});
