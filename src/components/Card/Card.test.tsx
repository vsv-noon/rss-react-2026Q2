import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

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

  it('should renders the character image with correct src and alt', () => {
    render(
      <MemoryRouter>
        <Card character={character} />
      </MemoryRouter>
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', character.image);
    expect(img).toHaveAttribute('alt', character.name);
  });

  it('should renders the provided name in an h2', () => {
    render(
      <MemoryRouter>
        <Card character={character} />
      </MemoryRouter>
    );
    const heading = screen.getByRole('heading', { level: 5 });
    expect(heading).toHaveTextContent('Rick Sanchez');
  });

  it('should renders different character props correctly', () => {
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
    render(
      <MemoryRouter>
        <Card character={newCharacter} />
      </MemoryRouter>
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', newCharacter.image);
    expect(img).toHaveAttribute('alt', newCharacter.name);
    const heading = screen.getByRole('heading', { level: 5 });
    expect(heading).toHaveTextContent('Morty Smith');
  });
});
