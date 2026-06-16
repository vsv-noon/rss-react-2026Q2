import { ParamValue } from 'next/dist/server/request/params';
import { useDispatch } from 'react-redux';

import { rickAndMortyApi } from '@/services/rickAndMortyApi';

export const useRefreshCache = () => {
  const dispatch = useDispatch();

  const refreshCacheCharacters = () => {
    dispatch(rickAndMortyApi.util.invalidateTags(['Characters']));
  };

  const refreshCacheCharacterDetails = (characterId?: ParamValue) => {
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
