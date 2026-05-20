import styles from './ResultList.module.scss';

import type { ResultListProps } from './types';

import Card from '@/components/Card';

const ResultList: React.FC<ResultListProps> = ({ characters }) => {
  return (
    <div className={styles.resultList}>
      <div className={styles.charactersList}>
        {characters?.results &&
          characters.results.map((character) => (
            <Card key={character.id} character={character} />
          ))}
      </div>
    </div>
  );
};

export default ResultList;
