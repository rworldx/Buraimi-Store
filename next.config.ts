import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    // Exclude problematic modules from client-side bundles
    config.externals = config.externals || [];
    config.externals.push(
      'handlebars',
      '@genkit-ai/core',
      'genkit',
      '@genkit-ai/firebase'
    );
    
    return config;
  },
  transpilePackages: [
    'handlebars',
    '@genkit-ai/core',
    'genkit',
    '@genkit-ai/firebase'
  ],
};

export default nextConfig;