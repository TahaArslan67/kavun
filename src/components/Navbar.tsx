'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full bg-white/95 backdrop-blur-sm z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-md border-b border-[#FFE5D9]/50' : ''
    }`}>
      <div className="w-full h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB996]/20 rounded-lg px-2 py-1">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 mr-2 sm:mr-2.5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Image
              src="/logo.png"
              alt="Kavun"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-[#6B3416] text-lg sm:text-xl font-semibold transition-colors duration-200 group-hover:text-[#994D1C]">
            Kavun
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
          <Link 
            href="/egitmenler" 
            className="relative group px-3 py-2"
          >
            <span className="relative z-10 text-[#994D1C] text-sm sm:text-base font-medium transition-colors duration-200 group-hover:text-[#6B3416]">
              Eğitmen Bul
            </span>
            <span className="absolute inset-0 h-full w-full bg-[#FFE5D9]/0 rounded-lg transition-all duration-200 group-hover:bg-[#FFE5D9]/50" />
          </Link>
          
          <Link 
            href="/auth/login" 
            className="relative group px-3 py-2"
          >
            <span className="relative z-10 text-[#994D1C] text-sm sm:text-base font-medium transition-colors duration-200 group-hover:text-[#6B3416]">
              Giriş Yap
            </span>
            <span className="absolute inset-0 h-full w-full bg-[#FFE5D9]/0 rounded-lg transition-all duration-200 group-hover:bg-[#FFE5D9]/50" />
          </Link>

          <Link 
            href="/auth/register" 
            className="relative overflow-hidden group bg-gradient-to-r from-[#FFB996] to-[#FF8B5E] text-[#6B3416] text-sm sm:text-base font-medium px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#FFB996]/20 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Kayıt Ol</span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF8B5E] to-[#FFB996] transition-transform duration-300 translate-x-full group-hover:translate-x-0" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;