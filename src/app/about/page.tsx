"use client";

import Image from "next/image";

export default function AboutPage() {
  const team = [
    { name: "Dini Fitriyani", role: "Researcher", img: "/team/dini.jpg" },
    { name: "Rizal Mantofani", role: "Researcher", img: "/team/rizal.jpg" },
    {
      name: "Syafiq Ali Fadlul R",
      role: "Researcher",
      img: "/team/syafiq.jpg",
    },
    {
      name: "Hafiz Ibrahim",
      role: "Backend Developer",
      img: "/team/hafiz.jpg",
    },
    {
      name: "Hara Anggraini",
      role: "Frontend Developer",
      img: "/team/hara.jpg",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* ABOUT WEBSITE CARD */}
      <section className="mb-16">
        <div
          className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-12
                        shadow-[0_8px_25px_rgba(0,0,0,0.15)]
                        hover:shadow-[0_12px_40px_rgba(0,0,0,0.22)]
                        transition-all duration-300 border border-neutral-200"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-neutral-900 text-center tracking-wide break-words">
            Tentang SADANTENpedia
          </h1>

          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed text-justify">
            SADANTENpedia merupakan platform yang dirancang untuk meningkatkan
            literasi budaya serta menyediakan ruang ekspresi kebudayaan yang
            mengangkat berbagai adat, tradisi, kesenian, kuliner lokal dan
            warisan daerah Provinsi Banten melalui pendekatan edukatif dan
            komunikatif.
            {/* Website ini dibuat untuk memperkenalkan budaya Indonesia dan
            memberikan informasi terkait berbagai adat, tradisi, dan warisan
            budaya dari seluruh daerah. Platform ini dirancang sebagai ruang
            edukatif yang modern, menarik, dan mudah dipahami agar generasi muda
            semakin mencintai dan melestarikan budaya Indonesia. */}
          </p>
        </div>
      </section>

      {/* TEAM CARD MERAH PREMIUM */}
      <section>
        <div
          className="bg-gradient-to-br from-red-800 to-red-700 text-white rounded-3xl p-6 sm:p-8 md:p-12
                        shadow-[0_10px_35px_rgba(128,0,0,0.45)] border border-red-900/30"
        >
          {/* Judul */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center tracking-wide mb-2 break-words">
            Tim Kami
          </h2>

          {/* Tagline premium */}
          <p className="text-center text-red-100 mb-6 sm:mb-8 md:mb-10 text-xs sm:text-sm uppercase tracking-[0.1em] sm:tracking-[0.25em]">
            Behind The Project
          </p>

          {/* GRID TEAM */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-10 place-items-center">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center hover:scale-105 transition-transform duration-300 w-full max-w-[120px]"
              >
                {/* Foto Bulat Elegant */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-2 sm:mb-4">
                  {/* Soft Gold Glow */}
                  <div className="absolute inset-0 rounded-full bg-yellow-200/20 blur-xl"></div>

                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-full
                               shadow-[0_4px_15px_rgba(0,0,0,0.35)]"
                    onError={(e) => {
                      // Placeholder image jika gambar tidak ditemukan
                      (
                        e.target as HTMLImageElement
                      ).src = `https://via.placeholder.com/112x112/DC2626/FFFFFF?text=${member.name.charAt(
                        0
                      )}`;
                    }}
                  />
                </div>

                {/* Nama */}
                <h3 className="text-sm sm:text-base md:text-lg font-semibold tracking-wide break-words">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-xs sm:text-sm md:text-base text-red-200">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
