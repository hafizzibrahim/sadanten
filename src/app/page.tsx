"use client";

import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import SearchBar from '../components/home/SearchBar';
import CultureCard from '../components/common/CultureCard';
import Footer from '../components/layout/Footer';
import { useState, useEffect } from 'react';
import HomeService from '../services/HomeService';
import { Ensiklopedia } from '../models/Ensiklopedia';
import api from '../data/api';
import BackgroundDecorations from '../components/home/BackgroundDecorations';

export default function HomePage() {
  const [cultures, setCultures] = useState<Ensiklopedia[]>([]);
  const [allCultures, setAllCultures] = useState<Ensiklopedia[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCultures = async () => {
      try {
        const allData = await HomeService.getAllEnsiklopedia();
        setAllCultures(allData);

        // Ambil 6 data acak untuk ditampilkan di home
        const randomData = await HomeService.getRandomEnsiklopedia(6);
        setCultures(randomData);
      } catch (error) {
        console.error("Error fetching cultures:", error);
        // Jika gagal, bisa tampilkan pesan error atau data kosong
        setCultures([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCultures();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      // Kembalikan ke 6 data acak ketika search kosong
      const randomData = [...allCultures]
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
      setCultures(randomData);
    } else {
      // Panggil API dengan parameter pencarian berdasarkan name
      try {
        const response = await api.get(`/ensiklopedia?name=${encodeURIComponent(query)}`);
        setCultures(response.data.data);
      } catch (error) {
        console.error("Error searching cultures:", error);
        // Jika API search gagal, gunakan filter lokal sebagai fallback
        const filtered = allCultures.filter(
          (culture) =>
            culture.name.toLowerCase().includes(query.toLowerCase())
        );
        setCultures(filtered);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center relative">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat budaya Banten...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <BackgroundDecorations />

      <div className="relative z-10">
  <div className="z-20 relative"> {/* ← Navbar bisa di sini atau di dalam komponen Navbar */}
    <Navbar />
  </div>
  <div className="mt-[-60px] relative z-10">
    <Hero />
  </div>
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
                <CultureCard key={culture.id} culture={culture} />
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}