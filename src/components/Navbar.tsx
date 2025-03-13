'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FaInstagram, FaLinkedin, FaDiscord, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const isAuthPage = pathname?.includes('/auth/');
  const currentPath = pathname || '';

  const navItems = [
    { name: 'Eğitmenler', path: '/egitmenler' },
    { name: 'İletişim', path: '/iletisim' },
  ];

  const authNavItems = user ? [...navItems.slice(0, 1), { name: 'Kurslarım', path: '/courses' }, ...navItems.slice(1)] : navItems;

  const socialLinks = [
    { icon: FaInstagram, href: 'https://www.instagram.com/codesmedipol/', label: 'Instagram' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/company/kavun', label: 'LinkedIn' },
    { icon: FaDiscord, href: 'https://discord.gg/rF4hQt99vz', label: 'Discord' },
  ];

  return (
    <header className="fixed top-4 left-4 right-4 z-[100]">
      <nav className="relative bg-gray-950 backdrop-blur-sm border border-gray-800 shadow-lg rounded-lg">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-between w-full" style={{ height: '50px', paddingTop: '2px' }}>
              {/* Left Side: Logo and Navigation */}
              <div className="flex items-center space-x-8">
                {/* Logo */}
                <Link href="/" className="flex items-center group relative pl-8">
                  <div className="absolute -inset-1 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
                  <div className="relative">
                    <Image
                      src="/logo.png"
                      alt="Kavun Logo"
                      width={45}
                      height={45}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </Link>

                {/* Navigation Links */}
                {!isAuthPage && (
                  <div className="flex items-center space-x-12">
                    {authNavItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className="relative group px-4 py-2"
                      >
                        <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        <div className="absolute -inset-1 bg-white/10 rounded-lg blur opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
                        <span className="relative text-gray-100 text-lg font-semibold tracking-wide transition-all duration-300 group-hover:text-white">
                          {item.name}
                        </span>
                        <span className="absolute bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Side: Social Links and Auth */}
              <div className="flex items-center justify-end pr-8">
                {/* Social Links */}
                {!isAuthPage && (
                  <div className="flex items-center space-x-6 mr-8">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group px-4"
                        aria-label={link.label}
                      >
                        <div className="absolute -inset-2 bg-white/10 rounded-full blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
                        <link.icon className="relative text-2xl text-gray-100 transition-all duration-300 group-hover:text-white group-hover:scale-110" />
                      </a>
                    ))}
                  </div>
                )}

                {/* Auth Button */}
                {user ? (
                  <button
                    onClick={logout}
                    className="relative group p-2"
                    aria-label="Çıkış Yap"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-700 to-red-600 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
                    <FaSignOutAlt className="relative text-2xl text-gray-100 group-hover:text-red-300 transition-all duration-300 group-hover:scale-110" />
                  </button>
                ) : (
                  <div className="flex items-center">
                    {(!isAuthPage || !currentPath.includes('login')) && (
                      <Link
                        href="/auth/login"
                        className="relative group"
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
                        <span className="relative px-4 py-2.5 text-gray-100 font-semibold text-base block border-2 border-gray-700 rounded-lg transition-all duration-300 group-hover:text-white group-hover:border-gray-500 group-hover:scale-105">
                          Giriş Yap
                        </span>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}