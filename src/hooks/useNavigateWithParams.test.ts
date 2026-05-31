import { renderHook } from '@testing-library/react';
import {
  useNavigate,
  useSearchParams,
  useLocation,
  type Location,
} from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useNavigateWithParams } from './useNavigateWithParams';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useSearchParams: vi.fn(),
  useLocation: vi.fn(),
}));

describe('useNavigateWithParams Hook', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('should return navigateToPage function', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      vi.fn(),
    ]);
    vi.mocked(useLocation).mockReturnValue({ pathname: '/' } as Location);

    const { result } = renderHook(() => useNavigateWithParams());
    expect(result.current.navigateToPage).toBeTypeOf('function');
  });

  it('should append page parameter while preserving existing search params', () => {
    const existingParams = new URLSearchParams('name=Morty&status=alive');
    vi.mocked(useSearchParams).mockReturnValue([existingParams, vi.fn()]);
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/characters',
    } as Location);

    const { result } = renderHook(() => useNavigateWithParams());
    result.current.navigateToPage(3);

    expect(mockNavigate).toHaveBeenCalledWith(
      '/characters?name=Morty&status=alive&page=3'
    );
  });

  it('should overwrite the page parameter if it already exists', () => {
    const existingParams = new URLSearchParams('page=1');
    vi.mocked(useSearchParams).mockReturnValue([existingParams, vi.fn()]);
    vi.mocked(useLocation).mockReturnValue({ pathname: '/' } as Location);

    const { result } = renderHook(() => useNavigateWithParams());
    result.current.navigateToPage(2);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });

  it('should stringify numeric page numbers correctly', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      vi.fn(),
    ]);
    vi.mocked(useLocation).mockReturnValue({ pathname: '/home' } as Location);

    const { result } = renderHook(() => useNavigateWithParams());
    result.current.navigateToPage(5);

    expect(mockNavigate).toHaveBeenCalledWith('/home?page=5');
  });

  it('should strip "/details" and character ID from the pathname', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      vi.fn(),
    ]);
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/characters/details/123',
    } as Location);

    const { result } = renderHook(() => useNavigateWithParams());
    result.current.navigateToPage(1);

    expect(mockNavigate).toHaveBeenCalledWith('/characters?page=1');
  });

  it('should handle standalone "/details" route and fallback to root "/"', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      vi.fn(),
    ]);
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/details',
    } as Location);

    const { result } = renderHook(() => useNavigateWithParams());
    result.current.navigateToPage(1);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=1');
  });

  it('should guarantee a leading slash even if location.pathname lacks one', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      vi.fn(),
    ]);
    vi.mocked(useLocation).mockReturnValue({
      pathname: 'broken/path',
    } as Location);

    const { result } = renderHook(() => useNavigateWithParams());
    result.current.navigateToPage(2);

    expect(mockNavigate).toHaveBeenCalledWith('/broken/path?page=2');
  });
});
