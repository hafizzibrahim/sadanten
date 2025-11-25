"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [active, setActive] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk hamburger

  useEffect(() => {
    // Update active state berdasarkan pathname
    if (pathname === "/") {
      setActive("Home");
    } else if (pathname === "/about") {
      setActive("About");
    } else if (pathname === "/partisipasi") {
      setActive("Partisipasi");
    }
  }, [pathname]);

  const linkClass = (name: string): string =>
    `cursor-pointer font-medium transition ${
      active === name
        ? "text-red-800 font-bold"
        : "text-gray-700 hover:text-red-800"
    }`;

  // Toggle menu saat hamburger diklik
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Tutup menu saat link diklik
  const handleLinkClick = (name: string) => {
    setActive(name);
    setIsMenuOpen(false); // Tutup menu setelah klik
  };

  return (
    // <nav> adalah parent utama yang fixed dan w-full
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50 rounded-b-2xl">
      {/* Container utama untuk Logo dan Hamburger/Desktop Link. Ini yang punya padding. */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LEFT - LOGO */}
          <div className="flex items-center">
            <Link href="/" onClick={() => handleLinkClick("Home")}>
              <Image
                src="/ic_navbar.png"
                alt="SadanTen Logo"
                width={128}
                height={80}
                className="object-contain"
              />
            </Link>
          </div>

          {/* DESKTOP NAV - HIDDEN ON MOBILE */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              onClick={() => handleLinkClick("Home")}
              className={linkClass("Home")}
            >
              Beranda
            </Link>

            <Link
              href="/partisipasi"
              onClick={() => handleLinkClick("Partisipasi")}
              className={linkClass("Partisipasi")}
            >
              Partisipasi Kebudayaan
            </Link>

            <Link
              href="/about"
              onClick={() => handleLinkClick("About")}
              className={linkClass("About")}
            >
              Tentang
            </Link>
          </div>

          {/* HAMBURGER MENU - VISIBLE ON MOBILE */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-red-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {/* Hamburger Icon */}
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 🚀 SOLUSI: Keluarkan Mobile Menu dari div padding utamanya. */}
      {/* Sekarang menu ini adalah child langsung dari <nav> (yang fixed dan w-full) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-2xl absolute left-0 right-0 top-16 z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              onClick={() => handleLinkClick("Home")}
              className={`block px-3 py-2 rounded-md text-base font-medium ${linkClass(
                "Home"
              )}`}
            >
              Beranda
            </Link>

            <Link
              href="/partisipasi"
              onClick={() => handleLinkClick("Partisipasi")}
              className={`block px-3 py-2 rounded-md text-base font-medium ${linkClass(
                "Partisipasi"
              )}`}
            >
              Partisipasi Kebudayaan
            </Link>

            <Link
              href="/about"
              onClick={() => handleLinkClick("About")}
              className={`block px-3 py-2 rounded-md text-base font-medium ${linkClass(
                "About"
              )}`}
            >
              Tentang
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
