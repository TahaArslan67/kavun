'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const university = searchParams.get('university');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: role || '',
    university: university || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          university: formData.university
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Kayıt sırasında bir hata oluştu');
      }

      setSuccess('Hesabınız başarıyla oluşturuldu! Email adresinize gönderilen doğrulama linkine tıklayarak hesabınızı aktifleştirebilirsiniz.');
      router.push(data.redirectUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kayıt sırasında bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-[#FFF5F0]">
      <div className="max-w-md mx-auto px-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#FFE5D9]">
          <h1 className="text-2xl font-bold text-[#6B3416] mb-6">
            Yeni Hesap Oluştur
          </h1>
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-[#FFE5D9] border border-[#FFB996] text-[#994D1C] rounded-lg">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#994D1C] mb-1">
                Ad Soyad
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-2 border border-[#FFE5D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB996] text-[#6B3416] placeholder-[#FFB996]"
                placeholder="Ad Soyad"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#994D1C] mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 border border-[#FFE5D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB996] text-[#6B3416] placeholder-[#FFB996]"
                placeholder="ornek@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="university" className="block text-sm font-medium text-[#994D1C] mb-1">
                Üniversite
              </label>
              <input
                id="university"
                name="university"
                type="text"
                required
                className="w-full px-4 py-2 border border-[#FFE5D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB996] text-[#6B3416] placeholder-[#FFB996] bg-[#FFF5F0]"
                value={formData.university}
                onChange={handleChange}
                disabled={true}
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-[#994D1C] mb-1">
                Rol
              </label>
              <select
                id="role"
                name="role"
                required
                className="w-full px-4 py-2 border border-[#FFE5D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB996] text-[#6B3416] bg-white"
                value={formData.role}
                onChange={handleChange}
                disabled={!!role || isLoading}
              >
                <option value="">Seçiniz</option>
                <option value="student">Öğrenci</option>
                <option value="teacher">Eğitmen</option>
              </select>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#994D1C] mb-1">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 border border-[#FFE5D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB996] text-[#6B3416] placeholder-[#FFB996]"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              <p className="mt-1 text-xs text-[#994D1C]">En az 8 karakter</p>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#994D1C] mb-1">
                Şifre Tekrar
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full px-4 py-2 border border-[#FFE5D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB996] text-[#6B3416] placeholder-[#FFB996]"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-2 bg-[#FFB996] text-[#994D1C] rounded-full text-sm font-medium hover:bg-[#FF8B5E] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Kaydediliyor...' : 'Kayıt Ol'}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-[#994D1C]">
            Zaten hesabın var mı?{' '}
            <Link href="/auth/login" className="font-medium text-[#6B3416] hover:text-[#994D1C]">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}