"use client";

import { useState, useEffect } from "react";

const images = [
  "https://i.ibb.co.com/CKcdnsD5/1571029828-Rampak-Bedug-thumb.jpg",
  "https://i.ibb.co.com/Ng3BdFvG/juli2024-3.jpg",
  "https://i.ibb.co.com/HpKYczH3/Screenshot-2025-02-26-112809.png",
  "https://i.ibb.co.com/JRMw1sQD/1280px-Debus-The-Ancient-Martial-Art-and-Culture-of-Banten.jpg",
  "https://i.ibb.co.com/RkD04krZ/124283092.jpg",
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  // Auto slide setiap 4 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[450px] mt-16 overflow-hidden rounded-b-2xl">
      {/* Slides */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out 
            ${i === index ? "opacity-100" : "opacity-0"}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${img})`,
            // Tetap menggunakan "cover" untuk mengisi penuh area
            backgroundSize: "cover",
            backgroundPosition: "center", 
            backgroundRepeat: "no-repeat"
          }}
        ></div>
      ))}
      {/* Content dan Dots tetap sama */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Selamat Datang</h1>
        <p className="text-lg md:text-xl max-w-2xl">
          Jelajahi Kekayaan dan Keunikan Warisan Budaya di Provinsi Banten
        </p>
      </div>

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
