// app/budaya/detail/page.tsx

import { Suspense } from 'react';
import DetailContent from './DetailContent'; // ⬅️ Import komponen yang baru dibuat

// Fallback untuk ditampilkan saat DetailContent sedang dimuat
const LoadingFallback = () => (
  // Kita bisa menggunakan layout loading yang lebih minimalis di sini
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800 mx-auto"></div>
      <p className="mt-4 text-gray-600">Memuat detail budaya...</p>
    </div>
  </div>
);

// Ini adalah komponen yang diekspor sebagai halaman
export default function BudayaDetailPage() {
  return (
    // 💡 SOLUSI: Bungkus komponen client dengan Suspense
    <Suspense fallback={<LoadingFallback />}>
      <DetailContent />
    </Suspense>
  );
}