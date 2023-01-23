/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      port: '',
      hostname: 'thispersondoesnotexist.com',
      pathname: '/image'
    }]
  }
}

module.exports = nextConfig
