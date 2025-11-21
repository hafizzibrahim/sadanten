"use client";

import { useState, useEffect } from "react";
// Import komponen Image dari Next.js
import Image from "next/image"; 

// Menggunakan path lokal dari folder public/
const images = [
  "/hero/hero1.jpg",
  "/hero/hero2.jpeg",
  "/hero/hero3.jpg",
  "/hero/hero4.jpg",
  "/hero/hero5.png",
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  // Auto slide setiap 4 detik (tetap sama)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[450px] mt-16 overflow-hidden rounded-b-2xl">
      
      {/* Slides */}
      {images.map((imgSrc, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out 
            ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          {/* 1. Komponen Image untuk gambar utama */}
          <Image
            src={imgSrc}
            alt="Warisan Budaya Banten"
            fill // Mengisi seluruh parent container
            className="object-cover" // Mirip dengan background-size: cover
            sizes="(max-width: 768px) 100vw, 100vw"
            priority={i === 0} // Mempercepat loading gambar pertama
          />
          
          {/* 2. Overlay gelap terpisah */}
          <div className="absolute inset-0 bg-black/60 z-[1]"></div>
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 z-[2]">Selamat Datang</h1>
        <p className="text-lg md:text-xl max-w-2xl z-[2]">
          Jelajahi Kekayaan dan Keunikan Warisan Budaya di Provinsi Banten
        </p>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === i ? "bg-white" : "bg-white/40"
            }`}
          ></button>
        ))}
      </div>

    </div>
  );
};

export default Hero;