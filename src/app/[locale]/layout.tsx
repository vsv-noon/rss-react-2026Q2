import { ReactNode } from 'react';

import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';

import styles from './layout.module.scss';
import { Providers } from './providers';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ThemeProvider } from '@/context/ThemeProvider';
import { routing } from '@/i18n/routing';

export default async function RootLayout({
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

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <ErrorBoundary>
          <NextIntlClientProvider>
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
        </ErrorBoundary>
      </body>
    </html>
  );
}
