/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}
const withNextIntl = require('next-intl/plugin')(
  "./i18n.ts"
);

module.exports = withNextIntl(nextConfig)
