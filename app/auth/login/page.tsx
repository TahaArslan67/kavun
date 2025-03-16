'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Başarıyla giriş yapıldı');
      router.push(role ? `/dashboard/${role}` : '/');
    } catch (error: any) {
      toast.error(error.message || 'Giriş yapılırken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-[#FFF5F0]">
      <div className="max-w-md mx-auto px-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#FFE5D9]">
          <h1 className="text-2xl font-bold text-[#6B3416] mb-6">
            Giriş Yap
          </h1>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium text-[#994D1C] hover:text-[#6B3416]"
              >
                Şifremi Unuttum
              </Link>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-2 bg-[#FFB996] text-[#994D1C] rounded-full text-sm font-medium hover:bg-[#FF8B5E] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-[#994D1C]">
            Hesabın yok mu?{' '}
            <Link href={role ? `/auth/register?role=${role}` : '/auth/register'} className="font-medium text-[#6B3416] hover:text-[#994D1C]">
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}