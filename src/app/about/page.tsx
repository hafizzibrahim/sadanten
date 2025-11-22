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
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* ABOUT WEBSITE CARD */}
      <section className="mb-16">
        <div
          className="bg-white/95 backdrop-blur-xl rounded-3xl p-12 
                        shadow-[0_8px_25px_rgba(0,0,0,0.15)] 
                        hover:shadow-[0_12px_40px_rgba(0,0,0,0.22)] 
                        transition-all duration-300 border border-neutral-200"
        >
          <h1 className="text-4xl font-extrabold mb-4 text-neutral-900 text-center tracking-wide">
            Tentang SADANTENpedia
          </h1>

          <p className="text-lg text-neutral-700 leading-relaxed text-justify">
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
          className="bg-gradient-to-br from-red-800 to-red-700 text-white rounded-3xl p-12
                        shadow-[0_10px_35px_rgba(128,0,0,0.45)] border border-red-900/30"
        >
          {/* Judul */}
          <h2 className="text-3xl font-bold text-center tracking-wide mb-2">
            Tim Kami
          </h2>

          {/* Tagline premium */}
          <p className="text-center text-red-100 mb-10 text-sm uppercase tracking-[0.25em]">
            Behind The Project
          </p>

          {/* GRID TEAM */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-10 place-items-center">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center hover:scale-105 transition-transform duration-300"
              >
                {/* Foto Bulat Elegant */}
                <div className="relative w-28 h-28 mx-auto mb-4">
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
                <h3 className="text-lg font-semibold tracking-wide">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-sm text-red-200">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
