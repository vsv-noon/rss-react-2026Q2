import { useOutletContext, useParams } from 'react-router-dom';

import Loader from '../Loader';

import styles from './CharacterDetails.module.scss';

import { useGetCharacterByIdQuery } from '@/services/rickAndMortyApi';

const CharacterDetails: React.FC = () => {
  const { id } = useParams();

  const { handleCloseCharacterDetails } = useOutletContext<{
    handleCloseCharacterDetails: () => void;
  }>();

  const { data, isLoading, isFetching, isError, error } =
    useGetCharacterByIdQuery(id);

  return (
    <div className={styles.detailsPanel}>
      {isLoading && <Loader variant="fullscreen" />}
      {isError && error && 'status' in error && (
        <div className={styles.errorMessage} data-testid="error-message">
          {error.status}
        </div>
      )}
      {isFetching && <Loader variant="overlay" />}
      {data && (
        <div
          className={styles.detailsCard}
          style={{ opacity: isFetching ? 0.5 : 1, transition: 'opacity 0.2s' }}
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
      )}
    </div>
  );
};

export default CharacterDetails;
