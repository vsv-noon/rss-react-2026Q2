import { configureStore } from '@reduxjs/toolkit';

import { rickAndMortyApi } from '@/services/rickAndMortyApi';
import { selectCardsReducer } from '@/store/slices/selectCardsSlice';

export const store = configureStore({
  reducer: {
    selectedCards: selectCardsReducer,

    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
