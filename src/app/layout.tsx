import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundDecorations from "../components/home/BackgroundDecorations";
import PWAInstallButton from "../components/common/PWAInstallButtonWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sadanten - Sarana Budaya Banten",
  description: "Website eksplorasi warisan kebudayaan Banten",
  manifest: "/manifest.json",
  icons: {
    icon: '/logo-sadanten.ico',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Sadanten" />
        <meta name="apple-mobile-web-app-title" content="Sadanten" />
        <meta name="theme-color" content="#DC2626" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F5F5F5] relative overflow-x-hidden`}
      >
        {/* Register Service Worker dengan cache buster */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  // Tambahkan cache buster ke URL service worker
                  const cacheBuster = '?v=' + Date.now();
                  navigator.serviceWorker.register('/sw.js' + cacheBuster)
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `
          }}
        />
        {/* Background */}
        <BackgroundDecorations />

        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* PWA Install Button */}
        <div className="lg:hidden">
          <PWAInstallButton />
        </div>
      </body>
    </html>
  );
}