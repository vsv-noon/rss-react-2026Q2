import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { selectCardsReducer } from '@/store/slices/selectCardsSlice';

export const store = configureStore({
  reducer: {
    selectedCards: selectCardsReducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
