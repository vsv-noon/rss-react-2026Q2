import Card from '@/components/Card';
import Loader from '@/components/Loader';
import type { ResultListProps } from './types';
import styles from './ResultList.module.scss';

const ResultList: React.FC<ResultListProps> = ({
  characters,
  isLoading,
}) => {
  return (
    <div className={styles.resultList}>
      <h1 className={styles.title}>Rick and Morty</h1>
      <div className={styles.charactersList}>
        {isLoading && <Loader />}

        {!isLoading && characters?.error && (
          <h3>{`${characters.error}`}</h3>
        )}
        {!isLoading &&
          characters?.results &&
          characters.results.map((character) => (
            <Card key={character.id} character={character} />
          ))}
      </div>
    </div>
  );
};

export default ResultList;
