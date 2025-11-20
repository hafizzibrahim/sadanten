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
        // Asumsi HomeService dan Ensiklopedia sudah di-import dengan benar
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
      // 🚀 SOLUSI 1: Tambahkan flex flex-col untuk layout full-height
      <div className="min-h-screen flex flex-col bg-gray-50 relative">
        <div className="absolute inset-0 z-0">
          <BackgroundDecorations />
        </div>
        <div className="relative z-10">
          <Navbar />
        </div>
        {/* 🚀 SOLUSI 1: Gunakan <main> dengan flex-grow agar konten mengisi ruang dan mendorong footer */}
        <main className="flex-grow max-w-6xl mx-auto pt-20 px-4 pb-20 flex items-center justify-center w-full">
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
      // 🚀 SOLUSI 1: Tambahkan flex flex-col untuk layout full-height
      <div className="min-h-screen flex flex-col bg-gray-50 relative">
        <div className="absolute inset-0 z-0">
          <BackgroundDecorations />
        </div>
        <div className="relative z-10">
          <Navbar />
        </div>
        {/* 🚀 SOLUSI 1: Gunakan <main> dengan flex-grow */}
        <main className="flex-grow max-w-6xl mx-auto pt-20 px-4 pb-20 w-full">
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
    // Struktur utama sudah bagus (min-h-screen flex flex-col)
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      {/* ✅ Dekorasi DITARUH DI BAWAH SEMUA ELEMEN UI */}
      <div className="absolute inset-0 z-0">
        <BackgroundDecorations />
      </div>

      {/* Navbar */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Main Content - Mengisi ruang yang tersisa (flex-grow sudah ada) */}
      <main className="flex-grow py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* LEFT CONTENT - bg-white sudah ada di sini, seharusnya tidak transparan */}
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

            {/* Jika description adalah HTML, gunakan:
            <div className="text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: culture.description || '' }} />
            Jika hanya teks biasa: */}
            <p className="text-gray-700 text-sm leading-relaxed">
              {culture.description}
            </p>

            {culture.audio && getAudioUrl(culture.audio) && (
              <>
                <h3 className="text-red-800 font-semibold text-lg">Audio</h3>
                <audio
                  controls
                  src={getAudioUrl(culture.audio)!} // Gunakan non-null assertion karena kita sudah pastikan nilainya
                  className="w-full h-12"
                />
              </>
            )}

            <Link href="/">
              <button className="mt-4 px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors">
                ← Kembali
              </button>
            </Link>
          </div>

          {/* RIGHT SIDEBAR */}
          {/* 🚀 SOLUSI 2: Hapus kelas lebar absolut, biarkan grid yang mengaturnya */}
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
        </div>
      </main>

      {/* Footer - Selalu di bawah */}
      <footer className="relative z-10">
        <Footer />
      </footer>
    </div>
  );
}
