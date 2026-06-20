import { getTranslations, setRequestLocale } from 'next-intl/server';

import { GITHUB_LINK, REACT_COURSE_LINK } from '../../../constants/constants';

import styles from './About.module.scss';

import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function About({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  return (
    <div className={styles.about}>
      <h1>{t('title')}</h1>
      <div className={styles.text}>
        <h3> {t('aboutProject.title')}</h3>
        <p>{t('aboutProject.text')}</p>
        <h3>{t('introduction.title')}</h3>
        <p>
          {t('introduction.textStart')}
          <Link
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            {t('introduction.name')}
          </Link>
          {t('introduction.textEnd')}
        </p>
      </div>
      <Link
        href={REACT_COURSE_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.courseLink}
      >
        {t('courseLink')}
      </Link>
    </div>
  );
}
