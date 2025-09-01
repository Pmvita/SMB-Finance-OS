import type { NextConfig } from "next";
import { loadEnvConfig } from '@next/env';
import path from 'path';

// Load environment variables from root .env file
const projectDir = path.join(process.cwd(), '..');
loadEnvConfig(projectDir);

const nextConfig: NextConfig = {
  env: {
    // Load environment variables from root .env
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Trident Financial OS',
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/:path*`,
      },
    ];
  },
};

export default nextConfig;
