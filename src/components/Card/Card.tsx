import { Link } from 'react-router-dom';
import type { CardProps } from './types';
import styles from './Card.module.scss';

const Card: React.FC<CardProps> = ({ character }) => {
  return (
    <div className={styles.card}>
      <Link
        to={`details/${character.id}`}
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
