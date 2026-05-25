import styles from './ResultList.module.scss';

import Card from '@/components/Card';
import { useAppSelector } from '@/store/hooks';

const ResultList: React.FC = () => {
  const characters = useAppSelector((state) => state.characters.characters);

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
