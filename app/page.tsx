'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { universities } from '@/data/universities';
import Navbar from '@/src/components/Navbar';

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [localUniversities, setLocalUniversities] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [error, setError] = useState('');
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleRoleSelect = (role: 'student' | 'teacher') => {
    router.push(`/auth/register?role=${role}&university=${encodeURIComponent(searchTerm)}`);
  };

  const handleCloseDialog = () => {
    setShowRoleDialog(false);
  };

  const handleDialogKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCloseDialog();
    }
  };

  const handleUniversitySelect = (uni: string) => {
    setSearchTerm(uni);
    setShowDropdown(false);
    setActiveIndex(-1);
    setError('');
    setShowRoleDialog(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalUniversities(universities);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setActiveIndex(-1);
  }, [searchTerm]);

  useEffect(() => {
    if (error) setError('');
  }, [searchTerm]);

  const filteredUniversities = searchTerm
    ? localUniversities
        .filter(uni => 
          uni.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || loading) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => 
          prev < filteredUniversities.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        if (activeIndex >= 0 && activeIndex < filteredUniversities.length) {
          handleUniversitySelect(filteredUniversities[activeIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setActiveIndex(-1);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFB996] to-[#FFECEC]">
      <Navbar />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
              <h1 className="text-5xl lg:text-6xl font-bold text-[#994D1C] mb-6">
                Öğrencileri ve eğitmenleri buluşturan platform
              </h1>
              <p className="text-xl text-[#6B3416] mb-8">
                Kavun, öğrencileri ve eğitmenleri bir araya getiren yeni nesil bir eğitim platformudur.
                İhtiyacınıza uygun eğitmeni bulun veya eğitmen olarak platformumuza katılın.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/auth/register"
                  className="px-8 py-3 bg-gradient-to-r from-[#FF8B5E] to-[#FFB996] text-white font-semibold rounded-md hover:from-[#994D1C] hover:to-[#FF8B5E] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Ücretsiz Başla
                </a>
                <a
                  href="/courses"
                  className="px-8 py-3 bg-white text-[#994D1C] font-semibold rounded-md border-2 border-[#994D1C] hover:bg-[#994D1C] hover:text-white transition-all duration-300"
                >
                  Kursları Keşfet
                </a>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white p-8 rounded-lg shadow-xl">
                <div className="w-full max-w-xl relative">
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Üniversitenizi seçin..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                        setError('');
                      }}
                      onFocus={() => setShowDropdown(true)}
                      onBlur={() => {
                        setTimeout(() => setShowDropdown(false), 200);
                      }}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 bg-white border rounded-lg outline-none transition-all duration-200
                        ${loading 
                          ? 'border-[#FFB996] opacity-75 cursor-not-allowed animate-pulse' 
                          : error
                            ? 'border-[#FF8B5E] hover:border-[#FF8B5E] focus:border-[#FF8B5E] focus:ring-2 focus:ring-[#FF8B5E]/20'
                            : 'border-[#FFE5D9] hover:border-[#FFB996] focus:border-[#FFB996] focus:ring-2 focus:ring-[#FFB996]/20'
                        }
                        text-[#6B3416] placeholder-[#FFB996]`}
                      disabled={loading}
                      role="combobox"
                      aria-expanded={showDropdown}
                      aria-controls="university-listbox"
                      aria-activedescendant={activeIndex >= 0 ? `university-option-${activeIndex}` : undefined}
                      aria-label="Üniversite ara"
                      aria-busy={loading}
                      aria-invalid={!!error}
                    />
                    {error && (
                      <div className="absolute mt-1 text-sm text-[#FF8B5E] font-medium" role="alert">
                        {error}
                      </div>
                    )}
                    {loading && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2" aria-hidden="true">
                        <div className="animate-spin rounded-full h-5 w-5 border-[2.5px] border-[#FFB996]/30 border-t-[#FF8B5E] shadow-sm"></div>
                      </div>
                    )}
                  </div>
                  {showDropdown && searchTerm && (
                    <div 
                      ref={dropdownRef}
                      id="university-listbox"
                      role="listbox"
                      className="absolute w-full mt-1 bg-white border border-[#FFE5D9] rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
                      aria-label="Üniversite seçenekleri"
                    >
                      {loading ? (
                        <div className="px-4 py-3 text-[#994D1C] text-center" role="status">
                          <div className="inline-block animate-spin rounded-full h-4 w-4 border-[2.5px] border-[#FFB996]/30 border-t-[#FF8B5E] shadow-sm mr-2" aria-hidden="true"></div>
                          <span className="animate-pulse">Üniversiteler yükleniyor...</span>
                        </div>
                      ) : filteredUniversities.length > 0 ? (
                        filteredUniversities.map((uni, index) => (
                          <div
                            key={index}
                            id={`university-option-${index}`}
                            role="option"
                            aria-selected={index === activeIndex}
                            className={`group px-4 py-3 hover:bg-gradient-to-r hover:from-[#FFE5D9] hover:to-[#FFF5F0] cursor-pointer transition-all duration-200
                              ${index === activeIndex ? 'bg-gradient-to-r from-[#FFE5D9] to-[#FFF5F0]' : ''}`}
                            onClick={() => handleUniversitySelect(uni)}
                          >
                            <div className={`transition-colors duration-200
                              ${index === activeIndex ? 'text-[#6B3416]' : 'text-[#994D1C] group-hover:text-[#6B3416]'}`}>
                              {uni}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-[#994D1C] text-center" role="status">
                          Sonuç bulunamadı
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Role Selection Dialog */}
      {showRoleDialog && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseDialog}
          onKeyDown={handleDialogKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="role-dialog-title"
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 
                id="role-dialog-title"
                className="text-2xl font-bold text-[#6B3416] text-center flex-1"
              >
                Nasıl devam etmek istersiniz?
              </h2>
              <button
                onClick={handleCloseDialog}
                className="text-[#994D1C] hover:text-[#6B3416] transition-colors duration-200 p-2"
                aria-label="Kapat"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleRoleSelect('student')}
                className="w-full px-8 py-3 bg-gradient-to-r from-[#FF8B5E] to-[#FFB996] text-white font-semibold rounded-md hover:from-[#994D1C] hover:to-[#FF8B5E] transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="Öğrenci olarak devam et"
              >
                Öğrenci Olarak Devam Et
              </button>
              <button
                onClick={() => handleRoleSelect('teacher')}
                className="w-full px-8 py-3 bg-white text-[#994D1C] font-semibold rounded-md border-2 border-[#994D1C] hover:bg-[#994D1C] hover:text-white transition-all duration-300"
                aria-label="Eğitmen olarak devam et"
              >
                Eğitmen Olarak Devam Et
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}