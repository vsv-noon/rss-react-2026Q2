import { useSearchParams } from 'react-router-dom';

import Loader from '../Loader';
import Pagination from '../Pagination';

import styles from './ResultList.module.scss';

import Card from '@/components/Card';
import { DEFAULT_PAGE } from '@/constants/constants';
import { useGetCharactersQuery } from '@/services/rickAndMortyApi';

const ResultList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('name') || '';
  const page = Number(searchParams.get('page') || DEFAULT_PAGE);
  const { data, isLoading, isFetching, isError, error } = useGetCharactersQuery(
    {
      name: searchTerm,
      page: page,
    }
  );

  if (isLoading) {
    return <Loader variant="fullscreen" />;
  }

  return (
    <div className={styles.resultListContainer}>
      {isError && (
        <div className={styles.error}>
          <p>Error fetching characters:</p>
          <pre className={styles.jsonBlock}>
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}

      {isFetching && <Loader variant="overlay" />}

      {!isFetching && !isError && data?.results && data?.info && (
        <div className={styles.resultList}>
          <div className={styles.paginationBlock}>
            <Pagination totalPages={data.info.pages} />
          </div>

          <div
            className={styles.charactersList}
            style={{
              opacity: isFetching ? 0.5 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {data.results.map((character) => (
              <Card key={character.id} character={character} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultList;
