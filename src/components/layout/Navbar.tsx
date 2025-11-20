"use client";

import { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [active, setActive] = useState("Home");

const linkClass = (name: string): string =>
    `cursor-pointer font-medium transition ${
        active === name
            ? "text-red-800 font-bold"
            : "text-gray-700 hover:text-red-800"
    }`;

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50 rounded-b-2xl">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LEFT - LOGO */}
          <div className="flex items-center">
            <Image
              src="/sadanten_logo.svg"
              alt="SadanTen Logo"
              width={128}
              height={80}
              className="object-contain"
            />
          </div>

          {/* RIGHT - NAV */}
          <div className="flex space-x-8">
            <a
              onClick={() => setActive("Home")}
              className={linkClass("Home")}
            >
              Home
            </a>

            <a
              onClick={() => setActive("About")}
              className={linkClass("About")}
            >
              About
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
