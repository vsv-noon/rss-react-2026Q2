import { ReactNode } from 'react';

import '@/styles/index.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rick and Morty client',
  description:
    'A feature-rich, responsive web application for browsing and managing characters from the Rick and Morty universe.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
