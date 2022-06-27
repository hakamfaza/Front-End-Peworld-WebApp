/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['peworld.herokuapp.com', 'localhost', 'images.unsplash.com', 'cdn.dribbble.com', 'drive.google.com']
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  }
};

module.exports = nextConfig;
