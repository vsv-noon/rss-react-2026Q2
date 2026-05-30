import { renderHook } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useRefreshCache } from './useRefreshCache';

import { rickAndMortyApi } from '@/services/rickAndMortyApi';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.spyOn(rickAndMortyApi.util, 'invalidateTags');

describe('useRefreshCache Hook', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
  });

  it('should return cache refreshing functions', () => {
    const { result } = renderHook(() => useRefreshCache());

    expect(result.current.refreshCacheCharacters).toBeTypeOf('function');
    expect(result.current.refreshCacheCharacterDetails).toBeTypeOf('function');
  });

  it('should dispatch invalidateTags with ["Characters"] when refreshCacheCharacters is called', () => {
    const { result } = renderHook(() => useRefreshCache());

    result.current.refreshCacheCharacters();

    expect(rickAndMortyApi.util.invalidateTags).toHaveBeenCalledWith([
      'Characters',
    ]);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch general Details tag when refreshCacheCharacterDetails is called without ID', () => {
    const { result } = renderHook(() => useRefreshCache());

    result.current.refreshCacheCharacterDetails();

    expect(rickAndMortyApi.util.invalidateTags).toHaveBeenCalledWith([
      { type: 'Details' },
    ]);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch specific Details tag when refreshCacheCharacterDetails is called with string ID', () => {
    const { result } = renderHook(() => useRefreshCache());

    result.current.refreshCacheCharacterDetails('42');

    expect(rickAndMortyApi.util.invalidateTags).toHaveBeenCalledWith([
      { type: 'Details', id: '42' },
    ]);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('should format numeric ID to string when refreshCacheCharacterDetails is called with number ID', () => {
    const { result } = renderHook(() => useRefreshCache());

    result.current.refreshCacheCharacterDetails(100);

    expect(rickAndMortyApi.util.invalidateTags).toHaveBeenCalledWith([
      { type: 'Details', id: '100' },
    ]);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
