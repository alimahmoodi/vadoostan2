import type { NextConfig } from 'next';
import path from 'path';
// import { baseUrl } from 'shared-components';

const baseUrl = 'cute-crayfish-currently.ngrok-free.app';

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
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*', // Your local proxy endpoint
  //       destination: `https://${baseUrl}/api/:path*`, // Target URL
  //     },
  //   ];
  // },
};

export default nextConfig;
