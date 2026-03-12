import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.axis.com',
      },
      {
        protocol: 'https',
        hostname: 'www.hikvision.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.hikvision.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/api/v1/images/**',
      },
    ],
    localPatterns: [
      {
        pathname: '/api/images',
      },
      {
        pathname: '/api/v1/images/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/images/:path*',
        destination: 'http://localhost:8000/api/v1/images/:path*',
      },
      {
        source: '/api/v1/video-download/:path*',
        destination: 'http://localhost:8000/api/v1/video-download/:path*',
      },
    ];
  },
};

export default nextConfig;
