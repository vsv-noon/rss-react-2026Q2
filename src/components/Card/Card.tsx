import type { CardProps } from './types';

const Card: React.FC<CardProps> = ({ name, character }) => {
  return (
    <div>
      <img src={character.image} alt={character.name} />
      <h2>{name}</h2>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
    </div>
  );
};

export default Card;
