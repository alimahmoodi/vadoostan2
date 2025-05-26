import type { NextConfig } from 'next';
import path from 'path';
import { baseUrl } from 'shared-components';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: baseUrl,
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
        destination: `https://${baseUrl}/api/:path*`, // Target URL
      },
    ];
  },
  transpilePackages: ['shared-components'],
  experimental: {
    externalDir: true, // Allows importing from outside the app directory
  },
};

export default nextConfig;
