'use client';

import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Loader from '../Loader';
import Pagination from '../Pagination';

import styles from './ResultList.module.scss';

import Card from '@/components/Card';
import { DEFAULT_PAGE } from '@/constants/constants';
import { useNavigateWithParams } from '@/hooks/useNavigateWithParams';
import { useRefreshCache } from '@/hooks/useRefreshCache';
import { useGetCharactersQuery } from '@/services/rickAndMortyApi';

const ResultList: React.FC = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams?.get('name') || '';
  const currentPage = Number(searchParams?.get('page') || DEFAULT_PAGE);
  const pageParam = searchParams?.get('page');
  const { navigateToPage } = useNavigateWithParams();

  const { data, isLoading, isFetching, isError, error } = useGetCharactersQuery(
    {
      name: searchTerm,
      page: currentPage,
    }
  );

  const { refreshCacheCharacters } = useRefreshCache();
  const t = useTranslations('ResultList');

  const isInvalidPage =
    (pageParam !== null && isNaN(Number(pageParam))) ||
    currentPage < DEFAULT_PAGE;

  useEffect(() => {
    if (isInvalidPage) {
      navigateToPage(DEFAULT_PAGE);
    }
  }, [isInvalidPage, navigateToPage]);

  if (isLoading) {
    return <Loader variant="fullscreen" />;
  }

  return (
    <div className={styles.resultListContainer}>
      {isError && (
        <div className={styles.error}>
          <p>{t('error')}</p>
          <pre className={styles.jsonBlock}>
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}

      {isFetching && <Loader variant="overlay" />}

      {!isFetching && !isError && data?.results && data?.info && (
        <div className={styles.resultList}>
          <button
            className={styles.invalidateCacheBtn}
            onClick={() => refreshCacheCharacters()}
          >
            {t('refresh')}
          </button>

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
