'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Şifre sıfırlama sırasında bir hata oluştu');
      }

      setSuccess('Şifreniz başarıyla değiştirildi. Yeni şifrenizle giriş yapabilirsiniz.');
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Şifre sıfırlama sırasında bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen pt-20 bg-[#FFF5F0]">
        <div className="max-w-md mx-auto px-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#FFE5D9]">
            <h1 className="text-2xl font-bold text-[#6B3416] mb-6">
              Geçersiz Bağlantı
            </h1>
            <p className="text-[#994D1C] mb-4">
              Bu şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş. Lütfen yeni bir şifre sıfırlama bağlantısı talep edin.
            </p>
            <Link
              href="/auth/forgot-password"
              className="w-full px-6 py-2 bg-[#FFB996] text-[#994D1C] rounded-full text-sm font-medium hover:bg-[#FF8B5E] transition-colors inline-block text-center"
            >
              Şifremi Unuttum
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-[#FFF5F0]">
      <div className="max-w-md mx-auto px-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#FFE5D9]">
          <h1 className="text-2xl font-bold text-[#6B3416] mb-6">
            Yeni Şifre Belirle
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
              <label htmlFor="password" className="block text-sm font-medium text-[#994D1C] mb-1">
                Yeni Şifre
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
                Yeni Şifre Tekrar
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
              {isLoading ? 'Şifre Değiştiriliyor...' : 'Şifreyi Değiştir'}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-[#994D1C]">
            <Link href="/auth/login" className="font-medium text-[#6B3416] hover:text-[#994D1C]">
              Giriş sayfasına dön
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
