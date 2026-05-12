import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  const character = {
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
  test('renders the character image with correct src and alt', () => {
    render(<Card name="Test Card" character={character} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', character.image);
    expect(img).toHaveAttribute('alt', character.name);
  });

  test('renders the provided name in an h2', () => {
    render(<Card name="Test Card" character={character} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Test Card');
  });

  test('renders different character props correctly', () => {
    const newCharacter = {
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
    render(<Card name="Morty Card" character={newCharacter} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', newCharacter.image);
    expect(img).toHaveAttribute('alt', newCharacter.name);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Morty Card');
  });
});
