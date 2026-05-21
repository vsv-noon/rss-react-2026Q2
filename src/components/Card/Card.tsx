import { Link, useSearchParams } from 'react-router-dom';

import styles from './Card.module.scss';

import type { CardProps } from './types';
import type { Character } from '@/types/types';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleSelectItem } from '@/store/slices/selectCardsSlice/slice';

const Card: React.FC<CardProps> = ({ character }) => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state) =>
    state.selectedCards.selectedItems.find((obj) => obj.id === character.id)
  );

  const handleCheckbox = (item: Character) => {
    dispatch(toggleSelectItem(item));
  };

  return (
    <div className={styles.cardContainer}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={isSelected ? true : false}
        onChange={() => handleCheckbox(character)}
      />
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
