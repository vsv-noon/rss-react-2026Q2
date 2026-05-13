import Card from '@/components/Card';
import Loader from '@/components/Loader';
import type { ResultListProps } from './types';
import styles from './ResultList.module.scss';

const ResultList: React.FC<ResultListProps> = ({
  fetchedCharacter,
  isLoading,
}) => {
  return (
    <div className={styles.resultList}>
      <h1 className={styles.title}>Rick and Morty</h1>
      <div className={styles.charactersList}>
        {isLoading && <Loader />}

        {!isLoading && fetchedCharacter?.error && (
          <h3>{`${fetchedCharacter.error}`}</h3>
        )}
        {!isLoading &&
          fetchedCharacter?.results &&
          fetchedCharacter.results.map((character) => (
            <Card key={character.id} character={character} />
          ))}
      </div>
    </div>
  );
};

export default ResultList;
