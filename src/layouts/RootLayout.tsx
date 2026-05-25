import { Outlet } from 'react-router-dom';

import styles from './RootLayout.module.scss';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

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
