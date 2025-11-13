"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardButton from "./DashboardButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY != 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`font-cormorantgaramond fixed w-full z-100 top-0 left-0 transition-all duration-300 ${
        scrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl text-gray-800 tracking-logo uppercase"
            >
              Resepsibali
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="flex space-x-6 items-center text-lg font-medium">
            <DashboardButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
