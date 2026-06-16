import { ReactNode } from 'react';

import { Metadata } from 'next';

import styles from './layout.module.scss';
import { Providers } from './providers';

import '@/styles/index.scss';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ThemeProvider } from '@/context/ThemeProvider';

export const metadata: Metadata = {
  title: 'Rick and Morty client',
  description:
    'A feature-rich, responsive web application for browsing and managing characters from the Rick and Morty universe.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <ThemeProvider>
            <Providers>
              <div className={styles.rootLayout}>
                <Header />
                <main className={styles.mainContent}>{children}</main>
                <Footer />
              </div>
            </Providers>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
