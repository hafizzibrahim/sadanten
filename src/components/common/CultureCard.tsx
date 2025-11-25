import Link from 'next/link';
import { Ensiklopedia } from '../../models/Ensiklopedia';

interface CultureCardProps {
  culture: Ensiklopedia;
}

const CultureCard = ({ culture }: CultureCardProps) => {
  // Fungsi untuk mendapatkan URL foto yang benar
  const getPhotoUrl = (photo: string) => {
    if (!photo) return "/placeholder-image.jpg"; // fallback image

    // Jika URL sudah lengkap, kembalikan langsung
    if (photo.startsWith("http")) return photo;

    // Jika URL adalah path relatif, tambahkan ke base URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://besadanten-production.up.railway.app/api";
    return `${baseUrl}${photo.startsWith('/') ? photo : '/' + photo}`;
  };

  return (
    <Link href={`/budaya/detail?id=${culture.id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col h-full">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-red-900 to-red-700 overflow-hidden">
          {culture.photo ? (
            <img
              src={getPhotoUrl(culture.photo)}
              alt={culture.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Hindari infinite loop jika fallback juga gagal
                target.src = "/placeholder-image.jpg"; // fallback image
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-red-900 flex items-center justify-center">
              <span className="text-white text-lg font-medium">No Image</span>
            </div>
          )}
        </div>

        {/* Content - Gunakan flex-grow untuk membuat tinggi seragam */}
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2">
            {culture.name}
          </h3>
          <p className="text-sm text-red-700 font-medium mb-3">{culture.category}</p>
          <p className="text-gray-600 text-sm leading-relaxed flex-grow line-clamp-4">
            {culture.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CultureCard;
