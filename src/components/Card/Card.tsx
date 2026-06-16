import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import styles from './Card.module.scss';

import type { CardProps } from './types';
import type { Character } from '@/types/types';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleSelectItem } from '@/store/slices/selectCardsSlice/slice';

const Card: React.FC<CardProps> = ({ character }) => {
  const searchParams = useSearchParams();
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
        href={`details/${character.id}?${searchParams?.toString()}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={character.image}
          alt={character.name}
          width={150}
          height={150}
          priority
        />

        <h5>{character.name}</h5>
      </Link>
    </div>
  );
};

export default Card;
