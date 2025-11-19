"use client";

import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import SearchBar from '../components/home/SearchBar';
import CultureCard from '../components/common/CultureCard';
import Footer from '../components/layout/Footer';
import { useState } from 'react';
import cultureData from '../data/cultureData';

import BackgroundDecorations from '../components/home/BackgroundDecorations';

export default function HomePage() {
  const [cultures, setCultures] = useState(cultureData);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setCultures(cultureData);
    } else {
      const filtered = cultureData.filter(
        (culture) =>
          culture.title.toLowerCase().includes(query.toLowerCase()) ||
          culture.category.toLowerCase().includes(query.toLowerCase()) ||
          culture.description.toLowerCase().includes(query.toLowerCase())
      );
      setCultures(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <BackgroundDecorations />
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <SearchBar onSearch={handleSearch} />

        {/* Gallery Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Galeri Budaya
          </h2>

          {cultures.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg">Tidak ada budaya yang ditemukan untuk &quot;{searchQuery}&quot;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cultures.map((culture) => (
                <CultureCard key={culture.id} culture={{ ...culture, id: Number(culture.id) }} />
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}