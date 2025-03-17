'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function InstructorsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-[#FFF5F0] pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#6B3416] mb-4">
            Eğitmen Bul
          </h1>
          <p className="text-lg text-[#994D1C] max-w-2xl mx-auto">
            İhtiyacınıza uygun eğitmeni bulun ve hemen iletişime geçin.
            Deneyimli eğitmenlerimiz size yardımcı olmak için hazır.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Eğitmen veya ders ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#FFE5D9] rounded-lg outline-none transition-all duration-200
                focus:border-[#FFB996] focus:ring-2 focus:ring-[#FFB996]/20
                text-[#6B3416] placeholder-[#FFB996]"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                className="w-5 h-5 text-[#FFB996]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'İngilizce'].map((subject) => (
            <button
              key={subject}
              className="px-4 py-2 bg-white border border-[#FFE5D9] rounded-full text-[#994D1C] 
                transition-all duration-200 hover:bg-[#FFE5D9] hover:text-[#6B3416]"
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Instructor Card */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <div className="relative h-48">
                <Image
                  src={`https://source.unsplash.com/random/400x300?teacher=${i}`}
                  alt="Eğitmen"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#6B3416] mb-2">
                  Eğitmen {i}
                </h3>
                <p className="text-[#994D1C] mb-4">
                  Matematik, Fizik
                </p>
                <div className="flex items-center text-[#FFB996] mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-[#994D1C]">5.0 (42 değerlendirme)</span>
                </div>
                <button className="w-full bg-gradient-to-r from-[#FFB996] to-[#FF8B5E] text-[#6B3416] font-medium px-4 py-2 rounded-lg 
                  transition-all duration-300 hover:shadow-lg hover:shadow-[#FFB996]/20 hover:scale-[1.02] active:scale-[0.98]">
                  İletişime Geç
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
