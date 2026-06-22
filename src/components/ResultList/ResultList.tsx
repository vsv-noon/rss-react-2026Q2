import { getTranslations } from 'next-intl/server';

import Card from '../Card';
import Pagination from '../Pagination';
import RefreshButton from '../RefreshButton';

import styles from './ResultList.module.scss';

import { routing } from '@/i18n/routing';
import { ApiResponse } from '@/types/types';

export interface ResultListProps {
  data: ApiResponse;
  name: string;
  page: number;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ResultList({ data }: ResultListProps) {
  const t = await getTranslations('ResultList');

  return (
    <div className={styles.resultListContainer}>
      <h1>{t('title')}</h1>
      {data && (
        <div>
          <RefreshButton />
          <div>
            <Pagination totalPages={data.info.pages} />
          </div>
          <div className={styles.charactersList}>
            {data.results.map((character) => (
              <Card key={character.id} character={character} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
