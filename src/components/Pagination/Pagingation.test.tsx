import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from './Pagination';

const mockSetPageNumber = vi.fn();

describe('Pagination', () => {
  it('should render without crashing', () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockSetPageNumber}
        />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /<</i })).toBeInTheDocument();
  });

  it('should disable first page button on first page', () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockSetPageNumber}
        />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /<</i })).toBeDisabled();
  });

  it('should disable previous button on first page', () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockSetPageNumber}
        />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: '<' })).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPage={5}
          totalPages={5}
          onPageChange={mockSetPageNumber}
        />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: '>' })).toBeDisabled();
  });

  it('should disable last page button on last page', () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPage={5}
          totalPages={5}
          onPageChange={mockSetPageNumber}
        />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: />>/i })).toBeDisabled();
  });

  it('should call onPageChange with next page when next is clicked', () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPage={2}
          totalPages={5}
          onPageChange={mockSetPageNumber}
        />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: '>' }));
    expect(mockSetPageNumber).toHaveBeenCalledWith(3);
  });

  it('should call change currentPage with previous page when previous is clicked', () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockSetPageNumber}
        />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: '<' }));
    expect(mockSetPageNumber).toHaveBeenCalledWith(2);
  });

  it('should call First Page when first-page buttons is clicked', () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockSetPageNumber}
        />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /<</i }));
    expect(mockSetPageNumber).toHaveBeenCalledWith(1);
  });

  it('should call Last Page when last-page buttons is clicked', () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockSetPageNumber}
        />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: />>/i }));
    expect(mockSetPageNumber).toHaveBeenCalledWith(5);
  });
});
