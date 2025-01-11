/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['server.booklyz.com'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['booklyz.com', '*.booklyz.com'],
    },
  },
};

export default nextConfig;
