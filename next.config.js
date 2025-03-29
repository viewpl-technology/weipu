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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Run the env-config script when building
      if (process.env.NODE_ENV === 'production') {
        require('./env-config')
      }
    }
    return config
  },
}

module.exports = nextConfig
