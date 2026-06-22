'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import styles from './CharacterDetails.module.scss';

import Loader from '@/components/Loader';
import { Character } from '@/types/types';

export interface CharacterDetailsClientProps {
  data: Character;
}

export default function CharacterDetailsClient({
  data,
}: CharacterDetailsClientProps) {
  const { back } = useRouter();
  const t = useTranslations('CharacterDetails');

  const handleCloseCharacterDetails = () => {
    back();
  };

  if (!data) {
    return <Loader variant="overlay" />;
  }

  return (
    <div className={styles.detailsCard}>
      <div className={styles.buttonBlock}>
        <div className={styles.closeBtn} onClick={handleCloseCharacterDetails}>
          x
        </div>
      </div>
      <div className={styles.image}>
        <Image
          src={data.image}
          alt={data.name}
          width={300}
          height={310}
          priority
        />
      </div>
      <h4>
        {t('character.name')}: {data.name}
      </h4>
      <p>
        {t('character.status')}: {data.status}
      </p>
      <p>
        {t('character.species')}: {data.species}
      </p>
      <p>
        {t('character.location')}: {data.location.name}
      </p>
    </div>
  );
}
