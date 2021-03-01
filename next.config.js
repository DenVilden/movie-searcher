const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  images: {
    domains: ['image.tmdb.org'],
  },
  experimental: {
    optimizeFonts: true,
  },
});
