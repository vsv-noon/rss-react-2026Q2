'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import styles from './CharacterDetails.module.scss';

import Loader from '@/components/Loader';
import { useRefreshCache } from '@/hooks/useRefreshCache';
import { useGetCharacterByIdQuery } from '@/services/rickAndMortyApi';
import { getErrorMessage } from '@/utils/getErrorMessage';

export default function CharacterDetails() {
  const params = useParams();
  const { back } = useRouter();
  const t = useTranslations('CharacterDetails');

  const id = params.id;

  const handleCloseCharacterDetails = () => {
    back();
  };

  const { data, isLoading, isFetching, isError, error } =
    useGetCharacterByIdQuery(id);

  const { refreshCacheCharacterDetails } = useRefreshCache();

  return (
    <div className={styles.detailsPanel}>
      {isLoading && <Loader variant="overlay" />}

      {isError && error && 'status' in error && (
        <div className={styles.errorMessage} data-testid="error-message">
          <div className={styles.errorLabel}>⚠️ Error code: </div>
          <code className={styles.errorCode}>{error.status}</code>

          <p className={styles.errorDetails}>{getErrorMessage(error)}</p>
        </div>
      )}

      {isFetching && <Loader variant="overlay" />}

      {!isError && !isFetching && data && (
        <>
          <div className={styles.buttonBlock}>
            <button
              className={styles.invalidateCacheBtn}
              onClick={() => refreshCacheCharacterDetails()}
            >
              <p>{t('refresh')}</p>
            </button>
          </div>

          <div
            className={styles.detailsCard}
            style={{
              opacity: isFetching ? 0.5 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            <div
              className={styles.closeBtn}
              onClick={handleCloseCharacterDetails}
            >
              x
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
        </>
      )}
    </div>
  );
}
