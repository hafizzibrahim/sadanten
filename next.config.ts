import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      // ... (konfigurasi images yang sudah ada)
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'besadanten-production.up.railway.app',
        pathname: '/api/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/api/uploads/**',
      },
    ],
  },
  async headers() {
    return [
      {
        // 🎯 TARGET: Aset statis yang di-cache Next.js, Anda mungkin tidak perlu menyentuh ini
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            // Default Vercel/Next.js sudah baik: 1 tahun untuk berkas ber-hash
            value: 'public, max-age=31536000, immutable', 
          },
        ],
      },
      {
        // 🎯 TARGET: Semua rute halaman/API lainnya (termasuk '/')
        source: '/:path((?!_next|static).*)', // Mencocokkan semua rute kecuali aset Next.js
        headers: [
          {
            key: 'Cache-Control',
            // Contoh: Server/CDN Cache selama 10 menit (s-maxage=600), revalidate jika ada permintaan baru
            value: 's-maxage=600, stale-while-revalidate=59', 
          },
          // Header yang sudah Anda miliki:
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
          // Pastikan manifest.json segera diperbarui (cache pendek)
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate', 
          },
        ],
      },
    ];
  },
};

export default nextConfig;