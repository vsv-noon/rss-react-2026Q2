import { render, fireEvent, screen } from '@testing-library/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import Pagination from './Pagination';

import { useAppSelector } from '@/store/hooks';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('@/store/hooks', () => ({
  useAppSelector: vi.fn(),
}));

describe('Pagination', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('should render without crashing', () => {
    vi.mocked(useAppSelector).mockReturnValue(5);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=1'),
      vi.fn(),
    ]);
    render(<Pagination />);
    expect(screen.getByRole('button', { name: /<</i })).toBeInTheDocument();
  });

  it('should return null (nothing render), if totalPages <= 0', () => {
    vi.mocked(useAppSelector).mockReturnValue(0);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(''),
      vi.fn(),
    ]);

    const { container } = render(<Pagination />);
    expect(container.firstChild).toBeNull();
  });

  it('should disable first page button on first page', () => {
    vi.mocked(useAppSelector).mockReturnValue(5);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=1'),
      vi.fn(),
    ]);
    render(<Pagination />);
    expect(screen.getByRole('button', { name: /<</i })).toBeDisabled();
  });

  it('should disable previous button on first page', () => {
    vi.mocked(useAppSelector).mockReturnValue(5);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=1'),
      vi.fn(),
    ]);
    render(<Pagination />);
    expect(screen.getByRole('button', { name: '<' })).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    vi.mocked(useAppSelector).mockReturnValue(5);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=5'),
      vi.fn(),
    ]);
    render(<Pagination />);
    expect(screen.getByRole('button', { name: '>' })).toBeDisabled();
  });

  it('should disable last page button on last page', () => {
    vi.mocked(useAppSelector).mockReturnValue(5);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=5'),
      vi.fn(),
    ]);
    render(<Pagination />);
    expect(screen.getByRole('button', { name: />>/i })).toBeDisabled();
  });

  it('should call onPageChange with next page when next is clicked', () => {
    vi.mocked(useAppSelector).mockReturnValue(5);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=2'),
      vi.fn(),
    ]);
    render(<Pagination />);
    fireEvent.click(screen.getByRole('button', { name: '>' }));
    expect(mockNavigate).toHaveBeenCalledWith('/?page=3');
  });

  it('should call change currentPage with previous page when previous is clicked', () => {
    vi.mocked(useAppSelector).mockReturnValue(5);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=3'),
      vi.fn(),
    ]);
    render(<Pagination />);
    fireEvent.click(screen.getByRole('button', { name: '<' }));
    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });

  it('should call First Page when first-page buttons is clicked', () => {
    vi.mocked(useAppSelector).mockReturnValue(5);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=5'),
      vi.fn(),
    ]);
    render(<Pagination />);
    fireEvent.click(screen.getByRole('button', { name: /<</i }));
    expect(mockNavigate).toHaveBeenCalledWith('/?page=1');
  });

  it('should call Last Page when last-page buttons is clicked', () => {
    vi.mocked(useAppSelector).mockReturnValue(5);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=1'),
      vi.fn(),
    ]);
    render(<Pagination />);
    fireEvent.click(screen.getByRole('button', { name: />>/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/?page=5');
  });
});
