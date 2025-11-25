"use client";

import Link from "next/link";

export default function ParticipationPage() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Yuk Berpartisipasi!
        </h1>
        <div className="w-24 h-1 bg-red-800 mx-auto rounded"></div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-10 border border-red-100">
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 text-justify">
          Kami mengundang Anda untuk berkontribusi dalam pelestarian dan
          dokumentasi budaya Banten. Partisipasi Anda sangat berharga dalam
          upaya memperkaya dan menjaga warisan budaya yang mulai terlupakan.
          Dengan berbagi informasi tentang budaya, adat, dan tradisi Banten,
          kita bersama-sama melestarikan identitas daerah yang kaya akan
          nilai-nilai luhur.
        </p>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 text-justify">
          Melalui form berikut, Anda dapat menyumbang informasi tentang berbagai
          aspek budaya Banten seperti kesenian, upacara adat, bahasa daerah,
          kuliner khas, pakaian adat, dan lain sebagainya. Setiap kontribusi
          Anda akan menjadi bagian penting dari ensiklopedia budaya Banten.
        </p>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 text-justify">
          Bergabunglah bersama kami dalam misi mulia ini. Bersama, kita jaga dan
          lestarikan kekayaan budaya Banten untuk generasi mendatang.
        </p>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
          Anda dapat menyumbang informasi dan mengekspresikan budaya Banten
        </p>
      </div>

      <div className="text-center">
        <Link
          href="https://forms.gle/W8KydYG95hoEEaSM9" // Ganti dengan URL Google Form Anda
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-700 to-red-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 text-base sm:text-lg"
        >
          Isi Form Partisipasi Kebudayaan
        </Link>
      </div>
    </div>
  );
}
