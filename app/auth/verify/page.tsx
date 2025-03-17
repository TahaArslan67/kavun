'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !verificationCode) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Email doğrulama sırasında bir hata oluştu');
      }

      setSuccess('Email adresiniz başarıyla doğrulandı! Giriş sayfasına yönlendiriliyorsunuz...');
      
      // Start countdown
      const timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push('/auth/login');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Email doğrulama sırasında bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="text-center space-y-4">
        <div className="text-[#994D1C] font-medium">
          Geçersiz veya süresi dolmuş doğrulama bağlantısı.
        </div>
        <Link
          href="/auth/login"
          className="text-[#FF8B5E] hover:text-[#994D1C] transition-colors font-medium"
        >
          Giriş sayfasına dön
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-[#994D1C] text-center">
          Email Doğrulama
        </h2>
        <p className="mt-2 text-sm text-[#6B3416] text-center">
          Email adresinize gönderilen 6 haneli doğrulama kodunu giriniz.
        </p>
      </div>

      {success ? (
        <div className="text-center space-y-4">
          <div className="text-[#994D1C] font-medium">
            {success}
          </div>
          <p className="text-[#6B3416]">
            {remainingTime} saniye içinde yönlendirileceksiniz...
          </p>
          <Link
            href="/auth/login"
            className="text-[#FF8B5E] hover:text-[#994D1C] transition-colors font-medium"
          >
            Hemen Giriş Yap
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-[#6B3416]">
              Doğrulama Kodu
            </label>
            <input
              type="text"
              id="code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="123456"
              className="mt-1 block w-full rounded-md border-[#FFB996] shadow-sm focus:border-[#FF8B5E] focus:ring focus:ring-[#FF8B5E] focus:ring-opacity-50"
              maxLength={6}
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !verificationCode}
            className="w-full bg-gradient-to-r from-[#FF8B5E] to-[#FFB996] text-white font-semibold py-3 px-6 rounded-md hover:from-[#994D1C] hover:to-[#FF8B5E] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {loading ? 'Doğrulanıyor...' : 'Doğrula'}
          </button>
        </form>
      )}
    </div>
  );
}
