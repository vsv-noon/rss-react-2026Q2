import { useDispatch } from 'react-redux';

import { rickAndMortyApi } from '@/services/rickAndMortyApi';

export const useRefreshCache = () => {
  const dispatch = useDispatch();

  const refreshCacheCharacters = () => {
    dispatch(rickAndMortyApi.util.invalidateTags(['Characters']));
  };

  const refreshCacheCharacterDetails = (
    characterId?: string | number | undefined
  ) => {
    dispatch(
      rickAndMortyApi.util.invalidateTags([
        characterId
          ? { type: 'Details', id: `${characterId}` }
          : { type: 'Details' },
      ])
    );
  };

  return { refreshCacheCharacters, refreshCacheCharacterDetails };
};
