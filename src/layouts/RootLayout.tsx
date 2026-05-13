import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import styles from './RootLayout.module.scss';

const RootLayout: React.FC = () => {
  return (
    <div className={styles.rootLayout}>
      <Header />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
