import path from 'path';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@use "@/styles/functions" as *;`,
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      new URL('https://rickandmortyapi.com/api/character/avatar/**'),
    ],
  },
};

export default nextConfig;
