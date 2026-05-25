import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import SelectionActionBar from './SelectionActionBar';

import type { Character } from '@/types/types';

import { clearSelection } from '@/store/slices/selectCardsSlice/slice';
import { downloadCSV } from '@/utils/csvDownloader';

vi.mock('@/store/slices/selectCardsSlice/slice', () => ({
  clearSelection: vi.fn(() => ({ type: 'CLEAR_SELECTION' })),
}));

vi.mock('@/utils/csvDownloader', () => ({
  downloadCSV: vi.fn(),
}));

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: 'https://example.com/rick.png',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: 'https://example.com/morty.png',
    episode: [],
    url: '',
    created: '',
  },
];

const createMockStore = (selectedItems: Character[] = []) => {
  return configureStore({
    reducer: {
      selectedCards: () => ({ selectedItems }),
    },
  });
};

describe('SelectionActionBar component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render anything (returns null) if the list of selected items is empty', () => {
    const store = createMockStore([]);

    const { container } = render(
      <Provider store={store}>
        <SelectionActionBar />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render the SelectionActionBar when there are selected characters', () => {
    const store = createMockStore(mockCharacters);

    render(
      <Provider store={store}>
        <SelectionActionBar />
      </Provider>
    );

    expect(screen.getByText('Selected items:')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('should correctly display the number of selected items', () => {
    const store = createMockStore(mockCharacters);

    render(
      <Provider store={store}>
        <SelectionActionBar />
      </Provider>
    );

    const countBadge = screen.getByText('2');
    expect(countBadge).toBeInTheDocument();
  });

  it('should call dispatch(clearSelection) when clicking "Unselect all"', () => {
    const store = createMockStore(mockCharacters);
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <SelectionActionBar />
      </Provider>
    );

    const unselectBtn = screen.getByRole('button', { name: /unselect all/i });
    fireEvent.click(unselectBtn);

    expect(dispatchSpy).toHaveBeenCalled();
    expect(clearSelection).toHaveBeenCalledTimes(1);
  });

  it('should call the downloadCSV function with the correct configuration when click "Download"', () => {
    const store = createMockStore(mockCharacters);
    render(
      <Provider store={store}>
        <SelectionActionBar />
      </Provider>
    );

    const downloadBtn = screen.getByRole('button', { name: /download/i });
    fireEvent.click(downloadBtn);

    const expectedConfig = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'status', label: 'Status' },
      { key: 'species', label: 'Species' },
      { key: 'url', label: 'url' },
    ];

    expect(downloadCSV).toHaveBeenCalledWith(
      mockCharacters,
      expectedConfig,
      '2_selectedCharacters.csv',
      expect.any(Object)
    );
  });
});
