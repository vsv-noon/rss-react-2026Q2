import { configureStore } from '@reduxjs/toolkit';

import { charactersReducer } from '@/store/slices/charactersSlice';
import { selectCardsReducer } from '@/store/slices/selectCardsSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    selectedCards: selectCardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
