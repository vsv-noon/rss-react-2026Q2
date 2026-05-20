import { Link, useSearchParams } from 'react-router-dom';

import styles from './Card.module.scss';

import type { CardProps } from './types';

const Card: React.FC<CardProps> = ({ character }) => {
  const [searchParams] = useSearchParams();

  return (
    <div className={styles.cardContainer}>
      <Link
        className={styles.card}
        to={`details/${character.id}?${searchParams}`}
        onClick={(e) => e.stopPropagation()}
        viewTransition
      >
        <img src={character.image} alt={character.name} />
        <h5>{character.name}</h5>
      </Link>
    </div>
  );
};

export default Card;
