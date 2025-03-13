'use client';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleRoleSelect = (role: 'student' | 'teacher') => {
    if (!user) {
      router.push(`/auth/register?role=${role}`);
    } else {
      router.push(`/dashboard/${role}`);
    }
  };

  return (
    <div className="min-h-screen pt-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 via-emerald-100 to-emerald-200" />

      {/* Content */}
      <div className="relative container mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-emerald-900">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 bg-clip-text text-transparent">
              Kavun
            </h1>
            <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
              Yazılım alanında kendini geliştirmek isteyen öğrenciler
              için eğitimler ve projeler düzenliyoruz.
            </p>
          </motion.div>

          {/* Role Selection Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 mt-8"
          >
            <button
              onClick={() => handleRoleSelect('student')}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-600 p-8 transition-all duration-300 hover:shadow-lg hover:from-emerald-600 hover:to-emerald-500"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-white mb-3">Öğrenciyim</h3>
                <p className="text-emerald-100">Yeni teknolojiler öğrenmek ve kendimi geliştirmek istiyorum</p>
              </div>
              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>

            <button
              onClick={() => handleRoleSelect('teacher')}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-700 p-8 transition-all duration-300 hover:shadow-lg hover:from-emerald-700 hover:to-emerald-600"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-white mb-3">Öğretmenim</h3>
                <p className="text-emerald-100">Bilgilerimi paylaşmak ve öğrencilere mentorluk yapmak istiyorum</p>
              </div>
              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
          >
            {[
              {
                title: 'Projeler',
                description: 'Gerçek dünya projelerinde deneyim kazanın',
                gradient: 'from-emerald-600 to-emerald-500',
              },
              {
                title: 'Mentorluk',
                description: 'Deneyimli yazılımcılardan birebir destek alın',
                gradient: 'from-emerald-700 to-emerald-600',
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="group relative p-6 rounded-xl overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-15 transition-opacity duration-300`} />
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-2 text-emerald-800">{feature.title}</h3>
                  <p className="text-emerald-700">{feature.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {!user && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-gray-500"
            >
              Devam etmek için lütfen{' '}
              <Link href="/auth/register" className="text-emerald-600 hover:text-emerald-700 font-medium">
                kayıt olun
              </Link>
              {' '}veya{' '}
              <Link href="/auth/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                giriş yapın
              </Link>
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}