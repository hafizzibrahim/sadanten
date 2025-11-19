"use client";

import { useState, useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&h=450&fit=crop",
  "https://images.unsplash.com/photo-1549887534-3db1bd59dcca?w=1200&h=450&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=450&fit=crop"
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
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Selamat Datang</h1>
        <p className="text-lg md:text-xl max-w-2xl">
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
