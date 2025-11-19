import { useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="max-w-3xl mx-auto -mt-10 mb-16 px-4 relative z-20">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Pencarian Budaya
        </h3>
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik untuk mencari (misal: debus)"
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-800 transition-colors"
          >
            {/* <Search size={24} /> */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;