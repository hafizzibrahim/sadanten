"use client";

import { useState, useEffect } from "react";

const BackgroundDecorations = () => {
  // SET POSISI FIX DI SINI (3 kolom x 2 row → 6 grid)
  const FIXED_POSITIONS = [
    // Grid 0 (Row 0, Col 0) → tengah area
    { top: "50%", left: "50%", rotation: -10 },
    // Grid 1 (Row 0, Col 1) → tengah area
    { top: "50%", left: "50%", rotation: 5 },
    // Grid 2 (Row 0, Col 2) → tengah area
    { top: "50%", left: "50%", rotation: -5 },

    // Grid 3 (Row 1, Col 0) → tengah area
    { top: "50%", left: "50%", rotation: 15 },
    // Grid 4 (Row 1, Col 1) → tengah area
    { top: "50%", left: "50%", rotation: -5 },
    // Grid 5 (Row 1, Col 2) → tengah area
    { top: "50%", left: "50%", rotation: 10 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {FIXED_POSITIONS.map((pos, i) => {
        const row = Math.floor(i / 3); // 3 kolom
        const col = i % 3;

        return (
          <div
            key={i}
            className="absolute"
            style={{
              top: `${row * 50}%`,
              left: `${col * (100 / 3)}%`,
              width: `${100 / 3}%`,
              height: "50%",
              position: "absolute",
              overflow: "hidden",
            }}
          >
            {/* Satu ikon besar per grid */}
            <img
              src="/background-asset.svg"
              alt="Decoration"
              className="absolute select-none"
              style={{
                top: pos.top,
                left: pos.left,
                transform: `translate(-50%, -50%) rotate(${pos.rotation}deg)`, // pusatkan ikon
                width: "100vw",           // 25% dari lebar viewport
                maxWidth: "100%",       // batas maksimal
                maxHeight: "100%",      // batas tinggi
                opacity: 0.08,           // samar-samar
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BackgroundDecorations;