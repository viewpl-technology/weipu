/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/weipu2',
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/auth',
        destination: '/auth/signin',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
