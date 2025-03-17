'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const university = searchParams.get('university');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: role || '',
    university: university || ''
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
    // Kayıt işlemleri burada yapılacak
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5F0] px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#6B3416]">Kayıt Ol</h1>
          <p className="mt-2 text-[#994D1C]">Yeni bir hesap oluşturun</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#6B3416]">
              Ad Soyad
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-[#FFF5F0] border border-[#FFE5D9] rounded-lg outline-none transition-all duration-200 
                focus:border-[#FFB996] focus:ring-2 focus:ring-[#FFB996]/20 
                text-[#6B3416] placeholder-[#FFB996]"
              placeholder="Ad Soyad"
              required
            />
          </div>

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
            <label htmlFor="university" className="block text-sm font-medium text-[#6B3416]">
              Üniversite
            </label>
            <input
              id="university"
              name="university"
              type="text"
              value={formData.university}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-[#FFF5F0] border border-[#FFE5D9] rounded-lg outline-none transition-all duration-200 
                focus:border-[#FFB996] focus:ring-2 focus:ring-[#FFB996]/20 
                text-[#6B3416] placeholder-[#FFB996]"
              placeholder="Üniversite"
              required
              disabled={!!university}
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-[#6B3416]">
              Rol
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="mt-1 w-full px-4 py-2 bg-[#FFF5F0] border border-[#FFE5D9] rounded-lg outline-none transition-all duration-200 
                focus:border-[#FFB996] focus:ring-2 focus:ring-[#FFB996]/20 
                text-[#6B3416]"
              required
              disabled={!!role}
            >
              <option value="">Seçiniz</option>
              <option value="student">Öğrenci</option>
              <option value="teacher">Eğitmen</option>
            </select>
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
              minLength={8}
            />
            <p className="mt-1 text-xs text-[#994D1C]">En az 8 karakter olmalıdır</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#6B3416]">
              Şifre Tekrar
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-[#FFF5F0] border border-[#FFE5D9] rounded-lg outline-none transition-all duration-200 
                focus:border-[#FFB996] focus:ring-2 focus:ring-[#FFB996]/20 
                text-[#6B3416] placeholder-[#FFB996]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FFB996] to-[#FF8B5E] text-[#6B3416] font-medium px-4 py-2 rounded-lg 
              transition-all duration-300 hover:shadow-lg hover:shadow-[#FFB996]/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            Kayıt Ol
          </button>
        </form>

        <div className="text-center text-sm">
          <span className="text-[#994D1C]">Zaten hesabınız var mı? </span>
          <Link 
            href="/auth/login"
            className="text-[#6B3416] font-medium hover:text-[#994D1C] transition-colors duration-200"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  );
}