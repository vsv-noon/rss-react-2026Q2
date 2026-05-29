import { useOutletContext, useParams } from 'react-router-dom';

import Loader from '../Loader';

import styles from './CharacterDetails.module.scss';

import { useRefreshCache } from '@/hooks/useRefreshCache';
import { useGetCharacterByIdQuery } from '@/services/rickAndMortyApi';
import { getErrorMessage } from '@/utils/getErrorMessage';

const CharacterDetails: React.FC = () => {
  const { id } = useParams();

  const { handleCloseCharacterDetails } = useOutletContext<{
    handleCloseCharacterDetails: () => void;
  }>();

  const { data, isLoading, isFetching, isError, error } =
    useGetCharacterByIdQuery(id);

  const { refreshCacheCharacterDetails } = useRefreshCache();

  if (isLoading) {
    return <Loader variant="fullscreen" />;
  }

  return (
    <div className={styles.detailsPanel}>
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
              <p>
                Invalidate Cache:<span>All Character Details</span>
              </p>
            </button>

            <button
              className={styles.invalidateCacheBtn}
              onClick={() => refreshCacheCharacterDetails(id)}
            >
              <p>
                Invalidate Cache:<span>{data.name}</span>
              </p>
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
              <img src={data.image} alt={data.name} />
            </div>
            <h4>Name: {data.name}</h4>
            <p>Status: {data.status}</p>
            <p>Species: {data.species}</p>
            <p>Location: {data.location.name}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterDetails;
