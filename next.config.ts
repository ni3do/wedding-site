import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for optimized Docker deployment
  // This creates a minimal server with only required dependencies
  output: 'standalone',

  // Compression for better performance
  compress: true,

  // Security: Remove X-Powered-By header
  poweredByHeader: false,

  // Enable ETags for caching
  generateEtags: true,

  // Image optimization settings
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
