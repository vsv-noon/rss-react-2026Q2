import { describe, it, expect } from 'vitest';

import selectCardsReducer, { clearSelection, toggleSelectItem } from './slice';
import { type SelectedCardState, type SelectedItem } from './types';

describe('selectCardsSlice reducer', () => {
  const initialState: SelectedCardState = {
    selectedItems: [],
  };

  const itemRick = { id: 1, name: 'Rick Sanchez' } as SelectedItem;
  const itemMorty = { id: 1, name: 'Morty Smith' } as SelectedItem;

  it('should return a default state if unknown action is passed', () => {
    const result = selectCardsReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(result).toEqual(initialState);
  });

  it('should add an item to array if it was not there', () => {
    const nextState = selectCardsReducer(
      initialState,
      toggleSelectItem(itemRick)
    );

    expect(nextState.selectedItems).toHaveLength(1);
    expect(nextState.selectedItems[0]).toEqual(itemRick);
  });

  it('should remove item from array if it is already there', () => {
    const stateWithItem: SelectedCardState = {
      selectedItems: [itemRick, itemMorty],
    };

    expect(stateWithItem.selectedItems).toHaveLength(2);

    const nextState = selectCardsReducer(
      stateWithItem,
      toggleSelectItem(itemRick)
    );

    expect(nextState.selectedItems).toHaveLength(0);
  });

  it('should completely clear the array of selected elements when clearSelection is called', () => {
    const stateWithItem: SelectedCardState = {
      selectedItems: [itemRick, itemMorty],
    };

    const nextState = selectCardsReducer(stateWithItem, clearSelection());

    expect(nextState.selectedItems).toEqual([]);
    expect(nextState.selectedItems).toHaveLength(0);
  });
});
