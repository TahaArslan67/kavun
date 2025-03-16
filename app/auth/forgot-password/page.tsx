'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Şifre sıfırlama isteği sırasında bir hata oluştu');
      }

      setSuccess('Şifre sıfırlama bağlantısı email adresinize gönderildi. Lütfen email kutunuzu kontrol edin.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Şifre sıfırlama isteği sırasında bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-[#FFF5F0]">
      <div className="max-w-md mx-auto px-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#FFE5D9]">
          <h1 className="text-2xl font-bold text-[#6B3416] mb-6">
            Şifremi Unuttum
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-2 bg-[#FFB996] text-[#994D1C] rounded-full text-sm font-medium hover:bg-[#FF8B5E] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Gönderiliyor...' : 'Şifre Sıfırlama Bağlantısı Gönder'}
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
