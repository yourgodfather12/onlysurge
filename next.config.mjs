import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    optimizeCss: true,
    serverComponentsExternalPackages: [],
    optimizePackageImports: [
      '@headlessui/react',
      '@heroicons/react',
      'date-fns',
      'lucide-react',
    ],
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
      };
    }

    return config;
  },
};

export default process.env.ANALYZE === 'true' ? bundleAnalyzer(nextConfig) : nextConfig; 