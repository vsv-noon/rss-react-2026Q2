import { Suspense } from 'react';

import styles from './page.module.scss';

import CreateErrorButton from '@/components/CreateErrorButton';
import Loader from '@/components/Loader';
import ResultList from '@/components/ResultList';
import SearchSection from '@/components/SearchSection';
import SelectionActionBar from '@/components/SelectionActionBar/SelectionActionBar';
import { DEFAULT_PAGE } from '@/constants/constants';
import { getCharacters } from '@/lib/api/characters';

export default async function MainPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const name = sp?.name ?? '';
  const page = Number(sp?.page ?? DEFAULT_PAGE);

  const data = await getCharacters({ name, page });

  return (
    <div className={styles.mainPageContainer}>
      <SearchSection />
      <CreateErrorButton />

      <div className={styles.outletContainer}>
        <Suspense fallback={<Loader variant="fullscreen" />}>
          <ResultList data={data} name={name} page={page} />
        </Suspense>
      </div>

      <SelectionActionBar />
    </div>
  );
}
