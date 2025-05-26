import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'colors.scss')],
    prependData: `@use 'colors.scss' as colors;`, // or additionalData
  },
};

export default nextConfig;
