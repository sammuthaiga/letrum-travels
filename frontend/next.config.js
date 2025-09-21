/**
 * Next.js configuration for staging/demo deploys.
 * - ignoreDuringBuilds: skip ESLint during Vercel build (reduces blocking warnings)
 * - ignoreBuildErrors: skip TypeScript checks during build (useful for quick staging)
 * Note: These relaxations are for staging/demo only. Fixing the underlying lint/type issues is recommended for production.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
