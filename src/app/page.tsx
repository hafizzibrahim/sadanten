"use client";

import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import SearchBar from "../components/home/SearchBar";
import CultureCard from "../components/common/CultureCard";
import Footer from "../components/layout/Footer";
import LocationSection from "../components/home/LocationSection";
import { useState, useEffect } from "react";
import HomeService, { LocationEnsiklopedia } from "../services/HomeService";
import { Ensiklopedia } from "../models/Ensiklopedia";
import api from "../data/api";
import BackgroundDecorations from "../components/home/BackgroundDecorations";

// Versi aplikasi - perbarui setiap kali Anda membuat perubahan besar
const APP_VERSION = "v1.2.0";

export default function HomePage() {
  const [cultures, setCultures] = useState<Ensiklopedia[]>([]);
  const [allCultures, setAllCultures] = useState<Ensiklopedia[]>([]);
  const [locationCultures, setLocationCultures] = useState<LocationEnsiklopedia[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek versi aplikasi dan bersihkan cache jika perlu
    const lastVisitedVersion = localStorage.getItem('lastVisitedVersion');

    // Jika versi berbeda, bersihkan cache lokal dan service worker
    if (lastVisitedVersion && lastVisitedVersion !== APP_VERSION) {
      // Bersihkan data cache lokal
      localStorage.removeItem('lastVisitedVersion');
      console.log('Versi aplikasi berubah, cache lokal telah dibersihkan');

      // Hapus service worker lama agar dapat digantikan dengan yang baru
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
          for(let registration of registrations) {
            registration.unregister();
          }
        });
      }

      // Refresh halaman untuk mendapatkan versi terbaru
      window.location.reload();
    }

    // Simpan versi saat ini
    localStorage.setItem('lastVisitedVersion', APP_VERSION);

    const fetchCultures = async () => {
      try {
        const allData = await HomeService.getAllEnsiklopedia();
        setAllCultures(allData);

        // Ambil 6 data acak untuk ditampilkan di home
        const randomData = await HomeService.getRandomEnsiklopedia(6);
        setCultures(randomData);

        // Ambil data budaya berdasarkan lokasi (4 per lokasi)
        const locationData = await HomeService.getTopCulturesByLocations(4);
        setLocationCultures(locationData);
      } catch (error) {
        console.error("Error fetching cultures:", error);

        // Jika gagal, bisa tampilkan pesan error atau data kosong
        setCultures([]);
        setLocationCultures([]);
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
        const response = await api.get(
          `/ensiklopedia`,
          { params: { name: query } } // Gunakan params untuk penulisan yang lebih jelas
        );

        setCultures(response.data.data);
      } catch (error) {
        console.error("Error searching cultures:", error);

        // Jika API search gagal, gunakan filter lokal sebagai fallback
        const filtered = allCultures.filter((culture) =>
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
        <div className="z-20 relative">
          {" "}
          {/* ← Navbar bisa di sini atau di dalam komponen Navbar */}
          <Navbar />
        </div>

        <div className="mt-[-60px] relative z-10">
          <Hero />
        </div>

        <SearchBar onSearch={handleSearch} />

        {/* Gallery Section - untuk hasil pencarian atau tampilan acak */}
        {searchQuery ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Hasil Pencarian: "{searchQuery}"
            </h2>
            {cultures.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">
                  Tidak ada budaya yang ditemukan untuk "{searchQuery}"
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cultures.map((culture) => (
                  <CultureCard key={culture.id} culture={culture} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Section untuk budaya acak */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Gallery Budaya Banten
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cultures.map((culture) => (
                  <CultureCard key={culture.id} culture={culture} />
                ))}
              </div>
            </div>

            {/* Section untuk budaya berdasarkan lokasi */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Budaya Berdasarkan Wilayah
              </h2>
              {locationCultures.map((locationData) => (
                <LocationSection
                  key={locationData.location}
                  locationName={locationData.locationInfo.name}
                  locationType={locationData.locationInfo.type}
                  cultures={locationData.cultures}
                />
              ))}
            </div>
          </>
        )}

        <Footer />
      </div>
    </div>
  );
}
