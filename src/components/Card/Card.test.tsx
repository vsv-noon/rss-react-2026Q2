import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import Card from './Card';

import type { Character } from '@/types/types';

import { toggleSelectItem } from '@/store/slices/selectCardsSlice/slice';

vi.mock('@/store/slices/selectCardsSlice/slice', () => ({
  toggleSelectItem: vi.fn((item) => ({ type: 'SELECT_TOGGLE', payload: item })),
}));

const mockCharacter = {
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
};

const createMockStore = (selectedItems: Character[] = []) => {
  return configureStore({
    reducer: {
      selectedCards: () => ({ selectedItems }),
    },
  });
};

describe('Card', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should renders the character image with correct src and alt', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card character={mockCharacter} />
        </MemoryRouter>
      </Provider>
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockCharacter.image);
    expect(img).toHaveAttribute('alt', mockCharacter.name);
  });

  it('should renders the provided name in an h5', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card character={mockCharacter} />
        </MemoryRouter>
      </Provider>
    );
    const heading = screen.getByRole('heading', { level: 5 });
    expect(heading).toHaveTextContent('Rick Sanchez');
  });

  it('should renders different character props correctly', () => {
    const store = createMockStore();

    const newMockCharacter = {
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
    };
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card character={newMockCharacter} />
        </MemoryRouter>
      </Provider>
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', newMockCharacter.image);
    expect(img).toHaveAttribute('alt', newMockCharacter.name);
    const heading = screen.getByRole('heading', { level: 5 });
    expect(heading).toHaveTextContent('Morty Smith');
  });

  it('should display an unchecked checkbox, if the character is not selected', () => {
    const store = createMockStore([]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card character={mockCharacter} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should display a checked checkbox, if the character is in the selected list', () => {
    const store = createMockStore([mockCharacter]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card character={mockCharacter} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should call dispatch with toggleSelectItem action with the checkbox is clicked', () => {
    const store = createMockStore([]);
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card character={mockCharacter} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(dispatchSpy).toHaveBeenCalled();
    expect(toggleSelectItem).toHaveBeenCalledWith(mockCharacter);
  });

  it('should create the correct link taking into searchParams', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/cards?page=2']}>
          <Card character={mockCharacter} />
        </MemoryRouter>
      </Provider>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/details/1?page=2');
  });
});
