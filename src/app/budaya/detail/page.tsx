"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BackgroundDecorations from "../../../components/home/BackgroundDecorations";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import HomeService from "../../../services/HomeService";
import { Ensiklopedia } from "../../../models/Ensiklopedia";

export default function BudayaDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [culture, setCulture] = useState<Ensiklopedia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCultureDetail = async () => {
      if (!id) {
        setError("ID budaya tidak ditemukan");
        setLoading(false);
        return;
      }

      try {
        const data = await HomeService.getEnsiklopediaById(id);
        setCulture(data);
      } catch (err) {
        console.error("Error fetching culture detail:", err);
        setError("Gagal memuat detail budaya");
      } finally {
        setLoading(false);
      }
    };

    fetchCultureDetail();
  }, [id]);

  // Fungsi untuk mendapatkan URL foto yang benar
  const getPhotoUrl = (photo: string) => {
    if (!photo) return "/placeholder-image.jpg"; // fallback image

    if (photo.startsWith("http")) return photo;

    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://besadanten-production.up.railway.app/api";
    return `${baseUrl}${photo.startsWith("/") ? photo : "/" + photo}`;
  };

  // Fungsi untuk mendapatkan URL audio yang benar
  const getAudioUrl = (audio: string) => {
    if (!audio) return null;

    if (audio.startsWith("http")) return audio;

    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://besadanten-production.up.railway.app/api";
    return `${baseUrl}${audio.startsWith("/") ? audio : "/" + audio}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 relative">
        <div className="absolute inset-0 z-0">
          <BackgroundDecorations />
        </div>
        {/* Navbar sudah z-50 di dalamnya, cukup z-10 di sini */}
        <div className="relative z-10"> 
          <Navbar />
        </div>
        {/* Hapus z-10 dari main di loading */}
        <main className="flex-grow max-w-6xl mx-auto pt-20 px-4 pb-20 flex items-center justify-center w-full relative">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat detail budaya...</p>
          </div>
        </main>
        <footer className="relative z-10">
          <Footer />
        </footer>
      </div>
    );
  }

  if (error || !culture) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 relative">
        <div className="absolute inset-0 z-0">
          <BackgroundDecorations />
        </div>
        <div className="relative z-10">
          <Navbar />
        </div>
        {/* Hapus z-10 dari main di error */}
        <main className="flex-grow max-w-6xl mx-auto pt-20 px-4 pb-20 w-full relative">
          <div className="text-center text-red-600 py-12">
            <p className="text-lg">{error || "Budaya tidak ditemukan"}</p>
            <Link
              href="/"
              className="mt-4 inline-block px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              ← Kembali ke Home
            </Link>
          </div>
        </main>
        <footer className="relative z-10">
          <Footer />
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      
      <div className="absolute inset-0 z-0">
        <BackgroundDecorations />
      </div>

      {/* Navbar (z-50 di dalam komponen Navbar) */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Main Content */}
      {/* 🚀 PERBAIKAN: HAPUS 'z-10' dari <main> agar tidak menimpa menu Navbar (z-50) */}
      <main className="flex-grow py-20 px-4 relative"> 
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* LEFT CONTENT. Tetap punya bg-white. */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg space-y-4">
            {culture.photo ? (
              <img
                src={getPhotoUrl(culture.photo)}
                alt={culture.name}
                className="w-full h-64 object-cover rounded-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/placeholder-image.jpg";
                }}
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}

            <h2 className="text-red-800 font-semibold text-2xl">
              {culture.name}
            </h2>

            <p className="text-gray-700 text-sm leading-relaxed">
              {culture.description}
            </p>

            {culture.audio && getAudioUrl(culture.audio) && (
              <>
                <h3 className="text-red-800 font-semibold text-lg">Audio</h3>
                <audio
                  controls
                  src={getAudioUrl(culture.audio)!}
                  className="w-full h-12"
                />
              </>
            )}

            {/* Desktop: Tombol Kembali di sini */}
            <div className="hidden lg:block">
              <Link href="/">
                <button className="mt-4 px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors">
                  ← Kembali
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDEBAR. Tetap punya bg-white. */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 space-y-4">
              <h2 className="text-red-800 text-lg font-bold">Info Singkat</h2>
              <div className="h-px bg-gray-200" />

              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <p className="text-red-800 text-sm font-semibold">Lokasi</p>
                  <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                    {culture.location}
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <p className="text-red-800 text-sm font-semibold">Kategori</p>
                  <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                    {culture.category}
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <p className="text-red-800 text-sm font-semibold">Status</p>
                  <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                    {culture.status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE ONLY: Tombol Kembali di bawah Info Singkat */}
          <div className="lg:hidden w-full mt-6">
            <Link href="/">
              <button className="w-full px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors">
                ← Kembali
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10">
        <Footer />
      </footer>
    </div>
  );
}