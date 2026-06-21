import styles from './page.module.scss';

import CreateErrorButton from '@/components/CreateErrorButton';
import ResultList from '@/components/ResultList';
import SearchSection from '@/components/SearchSection';
import SelectionActionBar from '@/components/SelectionActionBar/SelectionActionBar';

export default async function MainPage() {
  return (
    <div className={styles.mainPageContainer}>
      <SearchSection />
      <CreateErrorButton />

      <div className={styles.outletContainer}>
        <ResultList />
      </div>

      <SelectionActionBar />
    </div>
  );
}
