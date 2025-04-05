/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },

  // Disable server-based APIs in this static export
  env: {
    STATIC_EXPORT: 'true',
  },

  // Run the environment config script before building
  webpack: (config) => {
    require('./env-config')
    return config
  },
}

module.exports = nextConfig
