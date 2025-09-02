import type {NextConfig} from 'next';

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
      }
    ],
  },
  devServer: {
    allowedDevOrigins: [
      "https://6000-firebase-studio-1755813175938.cluster-57i2ylwve5fskth4xb2kui2ow2.cloudworkstations.dev"
    ]
  }
};

export default nextConfig;
