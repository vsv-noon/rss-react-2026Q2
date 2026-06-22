'use client';

import { Suspense } from 'react';

import { useTranslations } from 'next-intl';

import Loader from '../Loader';
import LocaleSwitcher from '../LocaleSwitcher';

import styles from './Header.module.scss';

import NavLink from '@/components/NavLink';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('Header');

  return (
    <header className={styles.header}>
      <nav>
        <NavLink
          href="/"
          className={styles.navLink}
          activeClassName={styles.isActive}
        >
          {t('home')}
        </NavLink>
        {' | '}
        <NavLink
          href="/about"
          className={styles.navLink}
          activeClassName={styles.isActive}
        >
          {t('about')}
        </NavLink>
      </nav>
      <div className={styles.btns}>
        <Suspense fallback={<Loader variant="fullscreen" />}>
          <LocaleSwitcher />
        </Suspense>
        <button onClick={toggleTheme}>
          {/* {theme === 'light' ? '☀️ Light' : '🌙 Dark'} */}
          {theme === 'light' ? `☀️ ${t('light')}` : `🌙 ${t('dark')}`}
        </button>
      </div>
    </header>
  );
}
