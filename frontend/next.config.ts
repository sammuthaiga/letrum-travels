// frontend/next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    // Allow builds to complete even with TypeScript errors (set to false for strict mode)
    ignoreBuildErrors: false,
  },
  eslint: {
    // Allow builds to complete even with ESLint errors (set to false for strict mode)  
    ignoreDuringBuilds: false,
  },
  images: {
    // Allow images from Unsplash (for our beautiful safari photos)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    // Add experimental features here if needed in the future
  },
  env: {
    // Custom environment variables
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Redirects (currently empty but ready for future use)
  async redirects() {
    return [
      // Example redirect (commented out):
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ]
  },
  // Rewrites for API routes (currently empty but ready for future use)
  async rewrites() {
    return [
      // Example rewrite (commented out):
      // {
      //   source: '/api/proxy/:path*',
      //   destination: 'http://localhost:5000/api/v1/:path*',
      // },
    ]
  },
}

export default nextConfig