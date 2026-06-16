import Link from 'next/link';

import { GITHUB_LINK, REACT_COURSE_LINK } from '../../constants/constants';

import styles from './About.module.scss';

export default function About() {
  return (
    <div className={styles.about}>
      <h1>About</h1>
      <div className={styles.text}>
        <h3> What is this?</h3>
        <p>
          App to browse and search characters and show details from Rick & Morty
          Tv show.
        </p>
        <h3>Who are you?</h3>
        <p>
          {' '}
          I&apos;m{' '}
          <Link
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            Viacheslav
          </Link>{' '}
          a guy who likes to develop things.
        </p>
      </div>
      <Link
        href={REACT_COURSE_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.courseLink}
      >
        RS School React course
      </Link>
    </div>
  );
}
