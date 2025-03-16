'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(5);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;
      
      setIsLoading(true);
      try {
        const res = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Email doğrulama sırasında bir hata oluştu');
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
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token, router]);

  if (!token) {
    return (
      <div className="min-h-screen pt-20 bg-[#FFF5F0]">
        <div className="max-w-md mx-auto px-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#FFE5D9]">
            <h1 className="text-2xl font-bold text-[#6B3416] mb-6">
              Geçersiz Bağlantı
            </h1>
            <p className="text-[#994D1C] mb-4">
              Bu doğrulama bağlantısı geçersiz veya süresi dolmuş. Lütfen yeni bir doğrulama bağlantısı talep edin.
            </p>
            <Link
              href="/auth/login"
              className="w-full px-6 py-2 bg-[#FFB996] text-[#994D1C] rounded-full text-sm font-medium hover:bg-[#FF8B5E] transition-colors inline-block text-center"
            >
              Giriş Yap
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
            Email Doğrulama
          </h1>
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}
          {success ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFE5D9] border border-[#FFB996] text-[#994D1C] rounded-lg">
                {success}
              </div>
              <p className="text-center text-[#994D1C]">
                {remainingTime} saniye içinde yönlendirileceksiniz...
              </p>
              <Link
                href="/auth/login"
                className="w-full px-6 py-2 bg-[#FFB996] text-[#994D1C] rounded-full text-sm font-medium hover:bg-[#FF8B5E] transition-colors inline-block text-center"
              >
                Hemen Giriş Yap
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFB996]"></div>
              <span className="ml-3 text-[#994D1C]">Email doğrulanıyor...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
