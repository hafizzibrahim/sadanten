"use client";

import { useState } from "react";
import Link from "next/link";

const ParticipationFAB = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="group relative">
        {/* Bubble chat - Lebih Berani */}
        <div className="absolute mb-20 -left-40 max-w-xs px-4 py-2 bg-neutral-800 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-2 group-hover:translate-y-0">
          <div className="text-sm font-medium">
            Yuk berpartisipasi!
          </div>
          <div className="absolute -right-2 top-3 w-4 h-4 bg-neutral-800 transform rotate-45 -translate-y-1"></div> {/* Panah lebih tegas */}
        </div>

        <Link
          href="https://forms.gle/W8KydYG95hoEEaSM9"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-t from-red-700 to-red-900 shadow-xl hover:shadow-2xl hover:from-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-110 rotate-45 text-white" // Diputar 45 derajat
          title="Partisipasi"
        >
          {/* Ikon Panah Ke Atas Modern */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 -rotate-45 relative z-10" // Putar kembali ikon agar tegak
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 4.02l-6 6h4v8h4v-8h4l-6-6zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zm0 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z"/>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ParticipationFAB;