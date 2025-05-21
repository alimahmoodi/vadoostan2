import type { NextConfig } from 'next';
import path from 'path';
import { baseUrl2 } from './services/apiClient';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: baseUrl2,
        port: '',
        pathname: '/public/**',
        search: '',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'colors.scss')],
    prependData: `@use 'colors.scss' as colors;`, // or additionalData
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Your local proxy endpoint
        destination: `https://${baseUrl2}/api/:path*`, // Target URL
      },
    ];
  },
};

export default nextConfig;
