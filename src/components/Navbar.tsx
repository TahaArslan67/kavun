import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-white z-50 border-b border-[#FFE5D9] shadow-sm">
      <div className="w-full h-16 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB996]/20 rounded px-1.5 py-0.5">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 mr-2 sm:mr-2.5 transition-transform duration-200 group-hover:scale-[1.02] group-active:scale-[0.98]">
            <Image
              src="/logo.png"
              alt="Kavun"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-[#6B3416] text-lg sm:text-xl font-medium transition-colors duration-200 group-hover:text-[#994D1C]">
            Kavun
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-3 sm:space-x-6 md:space-x-8">
          <Link 
            href="/egitmen-bul" 
            className="text-[#994D1C] text-sm sm:text-base font-medium transition-colors duration-200 hover:text-[#6B3416] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB996]/20 rounded px-1.5 py-0.5"
            aria-label="Eğitmen bulmak için tıklayın"
          >
            Eğitmen Bul
          </Link>
          <Link 
            href="/giris-yap" 
            className="text-[#994D1C] text-sm sm:text-base font-medium transition-colors duration-200 hover:text-[#6B3416] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB996]/20 rounded px-1.5 py-0.5"
            aria-label="Giriş yapmak için tıklayın"
          >
            Giriş Yap
          </Link>
          <Link 
            href="/kayit-ol" 
            className="bg-[#FFB996] text-[#994D1C] text-sm sm:text-base font-medium px-4 sm:px-6 py-1.5 sm:py-2 rounded-full transition-all duration-200 hover:bg-[#FF8B5E] hover:text-[#6B3416] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB996]/20"
            aria-label="Kayıt olmak için tıklayın"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;