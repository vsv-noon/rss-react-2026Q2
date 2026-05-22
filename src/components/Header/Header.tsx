import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

import { useTheme } from '@/context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className={styles.header}>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.isActive}` : styles.navLink
          }
          viewTransition
        >
          Home
        </NavLink>{' '}
        |{' '}
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.isActive}` : styles.navLink
          }
          viewTransition
        >
          About
        </NavLink>
      </nav>
      <button onClick={toggleTheme}>
        {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  );
};

export default Header;
