"use client";

import { useState, useEffect } from "react";

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Cek apakah perangkat iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    // Cek apakah aplikasi berjalan dalam mode standalone
    const isStandaloneMode = () => {
      return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    };

    setIsIOS(isIos());
    setIsStandalone(isStandaloneMode());

    const handler = (e: Event) => {
      // Mencegah prompt install otomatis
      e.preventDefault();
      // Simpan prompt untuk digunakan nanti
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Menampilkan prompt install
      (deferredPrompt as any).prompt();
      
      // Tunggu hasil dari prompt
      (deferredPrompt as any).userChoice.then((choiceResult: any) => {
        console.log(choiceResult.outcome);
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  // Jika sudah dalam mode standalone, jangan tampilkan tombol
  if (isStandalone) {
    return null;
  }

  // Untuk iOS, beri instruksi khusus
  if (isIOS) {
    return (
      <div className="fixed bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-red-200 z-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800">Pasang aplikasi Sadanten</p>
            <p className="text-sm text-gray-600">Ketuk <span className="font-semibold">"Bagikan"</span> lalu <span className="font-semibold">"Tambahkan ke Layar Utama"</span></p>
          </div>
          <button 
            onClick={() => document.querySelector('.pwa-install-instruction')?.remove()}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Untuk Android dan browser lainnya
  if (deferredPrompt) {
    return (
      <button
        onClick={handleInstallClick}
        className="fixed bottom-4 right-4 bg-red-800 text-white px-4 py-3 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50 flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Pasang Aplikasi
      </button>
    );
  }

  return null;
}