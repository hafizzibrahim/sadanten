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
        // 1. ASET STATIS: Modifikasi cache untuk file JS/CSS agar tidak terlalu lama di-cache (untuk masalah redeploy)
        source: '/_next/static/chunks/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            // Lebih pendek dari sebelumnya, agar update UI lebih cepat terlihat
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
      {
        // 2. ASET STILASI: Untuk file JS utama dan CSS
        source: '/_next/static/css/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
      {
        // 3. RUTE DINAMIS/HALAMAN: Tidak ada Cache (Tujuan Anda)
        source: '/:path((?!_next|static).*)',
        headers: [
          {
            key: 'Cache-Control',
            // max-age=0: Tidak ada cache di browser
            // s-maxage=0: Tidak ada cache di Vercel CDN (atau 1 detik untuk revalidate yang sangat cepat)
            // must-revalidate: Memastikan browser HARUS memverifikasi ke server
            value: 'max-age=0, s-maxage=1, must-revalidate',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Tambahkan header tambahan untuk pencegahan cache
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
      {
        // 4. MANIFEST: Juga harus selalu diperbarui
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        // 5. Tambahkan header untuk API routes (jika diperlukan)
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
  // Konfigurasi webpack dihapus karena tidak kompatibel dengan Turbopack
  // Tetapi cache busting masih akan bekerja dengan metode lain
};

export default nextConfig;