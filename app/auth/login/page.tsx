'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Giriş işlemleri burada yapılacak
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5F0] px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#6B3416]">Giriş Yap</h1>
          <p className="mt-2 text-[#994D1C]">Hesabınıza giriş yapın</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#6B3416]">
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-[#FFF5F0] border border-[#FFE5D9] rounded-lg outline-none transition-all duration-200 
                focus:border-[#FFB996] focus:ring-2 focus:ring-[#FFB996]/20 
                text-[#6B3416] placeholder-[#FFB996]"
              placeholder="ornek@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#6B3416]">
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-[#FFF5F0] border border-[#FFE5D9] rounded-lg outline-none transition-all duration-200 
                focus:border-[#FFB996] focus:ring-2 focus:ring-[#FFB996]/20 
                text-[#6B3416] placeholder-[#FFB996]"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-[#FFE5D9] text-[#FFB996] focus:ring-[#FFB996]/20"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-[#994D1C]">
                Beni hatırla
              </label>
            </div>
            <Link 
              href="/auth/forgot-password"
              className="text-sm font-medium text-[#994D1C] hover:text-[#6B3416] transition-colors duration-200"
            >
              Şifremi Unuttum
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FFB996] to-[#FF8B5E] text-[#6B3416] font-medium px-4 py-2 rounded-lg 
              transition-all duration-300 hover:shadow-lg hover:shadow-[#FFB996]/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            Giriş Yap
          </button>
        </form>

        <div className="text-center text-sm">
          <span className="text-[#994D1C]">Hesabınız yok mu? </span>
          <Link 
            href="/auth/register"
            className="text-[#6B3416] font-medium hover:text-[#994D1C] transition-colors duration-200"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </div>
  );
}