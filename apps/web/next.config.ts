import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV !== 'development';
const DAEMON_PORT = Number(process.env.OD_PORT) || 7456;
const DAEMON_ORIGIN = `http://127.0.0.1:${DAEMON_PORT}`;

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  reactStrictMode: true,
  distDir: isProd ? 'out' : '.next',
  ...(isProd
    ? {
        output: 'export' as const,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        async rewrites() {
          return [
            { source: '/api/:path*', destination: `${DAEMON_ORIGIN}/api/:path*` },
            { source: '/artifacts/:path*', destination: `${DAEMON_ORIGIN}/artifacts/:path*` },
            { source: '/frames/:path*', destination: `${DAEMON_ORIGIN}/frames/:path*` },
          ];
        },
      }),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
