require('dotenv').config();
const withOffline = require('next-offline');

const nextConfig = {
  distDir: 'build',
  env: {
    REACT_APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
  },
};

module.exports = withOffline(nextConfig);
