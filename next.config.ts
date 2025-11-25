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
        // 1. ASET JS/CSS: Kurangi masa cache dan tambahkan must-revalidate
        source: '/_next/static/(css|js|chunks)/(.*).js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate', // Hanya cache 1 jam, lalu harus revalidate
          },
        ],
      },
      {
        // 2. ASET CSS: Kurangi masa cache dan tambahkan must-revalidate
        source: '/_next/static/(css|js|chunks)/(.*).css',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate', // Hanya cache 1 jam, lalu harus revalidate
          },
        ],
      },
      {
        // 3. ASET LAINNYA: Untuk file lain di static, bisa tetap cache lama
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // 4. RUTE DINAMIS/HALAMAN: Tidak ada Cache (Tujuan Anda)
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
        // 5. MANIFEST: Juga harus selalu diperbarui
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
        // 6. Tambahkan header untuk API routes (jika diperlukan)
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