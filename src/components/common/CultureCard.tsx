import Link from 'next/link';

interface Culture {
  id: number;
  title: string;
  category: string;
  description: string;
}

const CultureCard = ({ culture }: { culture: Culture }) => {
  return (
    <Link href={`/budaya/detail`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-red-900 to-red-700 overflow-hidden">
          <div className="absolute inset-0 bg-red-900"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {culture.title}
          </h3>
          <p className="text-sm text-red-700 font-medium mb-3">{culture.category}</p>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
            {culture.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CultureCard;
