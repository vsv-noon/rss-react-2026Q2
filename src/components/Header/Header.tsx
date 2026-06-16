'use client';

import styles from './Header.module.scss';

import NavLink from '@/components/NavLink';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <nav>
        <NavLink
          href="/"
          className={styles.navLink}
          activeClassName={styles.isActive}
        >
          Home
        </NavLink>
        {' | '}
        <NavLink
          href="/about"
          className={styles.navLink}
          activeClassName={styles.isActive}
        >
          About
        </NavLink>
      </nav>
      <button onClick={toggleTheme}>
        {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  );
}
