/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Optimized for Cloudflare Pages / Workers SSR and Docker
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://console-uat.onwalk.net/api/v1'
  }
};

module.exports = nextConfig;
