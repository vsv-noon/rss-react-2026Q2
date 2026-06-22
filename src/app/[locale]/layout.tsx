import { ReactNode } from 'react';

import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

import styles from './layout.module.scss';
import { Providers } from './providers';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ThemeProvider } from '@/context/ThemeProvider';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  sidebar,
  params,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Providers>
              <div className={styles.rootLayout}>
                <Header />
                <div className={styles.mainContainer}>
                  <main className={styles.mainContent}>{children}</main>
                  <aside className={styles.sidebarContent}>{sidebar}</aside>
                </div>
                <Footer />
              </div>
            </Providers>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
