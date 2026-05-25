import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { SelectedCardState, SelectedItem } from './types';

const initialState: SelectedCardState = {
  selectedItems: [],
};

const selectCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    toggleSelectItem(state, action: PayloadAction<SelectedItem>) {
      const item = action.payload;
      const isExist = state.selectedItems.some((i) => i.id === item.id);
      if (isExist) {
        return {
          ...state,
          selectedItems: state.selectedItems.filter((i) => i.id !== item.id),
        };
      } else {
        return {
          ...state,
          selectedItems: [...state.selectedItems, item],
        };
      }
    },
    clearSelection: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { toggleSelectItem, clearSelection } = selectCardsSlice.actions;
export default selectCardsSlice.reducer;
