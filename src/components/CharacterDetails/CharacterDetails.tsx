import { useOutletContext, useParams } from 'react-router-dom';
import styles from './CharacterDetails.module.scss';
import { useEffect, useState } from 'react';
import type { Character } from '@/types/types';
import Loader from '../Loader';
import { apiFetch } from '@/services/api';

const CharacterDetails: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const { handleCloseCharacterDetails } = useOutletContext<{
    handleCloseCharacterDetails: () => void;
  }>();

  useEffect(() => {
    const getCharacterDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await apiFetch({ id: id });
        setCharacter(data);
      } catch (err) {
        const typedError = err as Error;
        console.error('Failed to fetch characters', typedError);
        setError('Failed to fetch characters. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    getCharacterDetails();
  }, [id]);

  return (
    <div className={styles.detailsPanel}>
      {isLoading && <Loader />}
      {!isLoading && error && (
        <div className={styles.errorMessage} data-testid="error-message">
          {error}
        </div>
      )}
      {!isLoading && !error && character && (
        <div className={styles.detailsCard}>
          <div
            className={styles.closeBtn}
            onClick={handleCloseCharacterDetails}
          >
            x
          </div>
          <img src={character.image} alt={character.name} />
          <h4>Name: {character.name}</h4>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Location: {character.location.name}</p>
        </div>
      )}
    </div>
  );
};

export default CharacterDetails;
