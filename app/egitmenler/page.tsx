'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaChalkboardTeacher, FaGraduationCap, FaCode, FaStar, FaUserGraduate } from 'react-icons/fa';

type Instructor = {
  _id: string;
  name: string;
  title: string;
  expertise: string[];
  rating: number;
  students: number;
  courses: number;
  image: string;
};

export default function InstructorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('');
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const expertiseAreas = [
    'Web Geliştirme',
    'Mobil Uygulama',
    'Veri Bilimi',
    'Siber Güvenlik',
    'Yapay Zeka',
    'Oyun Geliştirme'
  ];

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch('/api/instructors');
        if (!response.ok) {
          throw new Error('Eğitmenler getirilemedi');
        }
        const data = await response.json();
        setInstructors(data);
      } catch (err) {
        setError('Eğitmenler yüklenirken bir hata oluştu');
        console.error('Eğitmenler yüklenirken hata:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  const filteredInstructors = instructors.filter(instructor => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (instructor.title && instructor.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesExpertise = !selectedExpertise || (instructor.expertise && instructor.expertise.includes(selectedExpertise));
    return matchesSearch && matchesExpertise;
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-[#FFF5F0] flex items-center justify-center">
        <div className="text-[#994D1C] text-xl">Eğitmenler yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 bg-[#FFF5F0] flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-[#FFF5F0] relative">
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-[#6B3416]">
            Eğitmenlerimiz
          </h1>
          <p className="text-xl text-[#994D1C] max-w-2xl mx-auto">
            Alanında uzman eğitmenlerimizle yazılım yolculuğunuzda size rehberlik ediyoruz
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row gap-4 justify-center"
        >
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Eğitmen ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-[#FFE5D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB996] text-[#6B3416] placeholder-[#FFB996]"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaChalkboardTeacher className="text-[#FFB996]" />
            </div>
          </div>

          {/* Expertise Filter */}
          <select
            value={selectedExpertise}
            onChange={(e) => setSelectedExpertise(e.target.value)}
            className="px-4 py-2 bg-white border border-[#FFE5D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB996] text-[#6B3416]"
          >
            <option value="">Tüm Uzmanlıklar</option>
            {expertiseAreas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </motion.div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredInstructors.map((instructor, index) => (
            <motion.div
              key={instructor._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-[#FFE5D9] overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300"
            >
              {/* Instructor Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={instructor.image || '/instructors/default.jpg'}
                  alt={instructor.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Instructor Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#6B3416] mb-2">{instructor.name}</h3>
                <p className="text-[#994D1C] mb-4">{instructor.title || 'Eğitmen'}</p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {instructor.expertise?.map(exp => (
                    <span
                      key={exp}
                      className="px-3 py-1 bg-[#FFE5D9] text-[#994D1C] rounded-full text-sm"
                    >
                      {exp}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center border-t border-[#FFE5D9] pt-4">
                  <div>
                    <div className="flex items-center justify-center text-[#994D1C] mb-1">
                      <FaStar className="mr-1" />
                      <span>{instructor.rating || 0}</span>
                    </div>
                    <p className="text-sm text-[#994D1C]">Puan</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center text-[#994D1C] mb-1">
                      <FaUserGraduate className="mr-1" />
                      <span>{instructor.students || 0}</span>
                    </div>
                    <p className="text-sm text-[#994D1C]">Öğrenci</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center text-[#994D1C] mb-1">
                      <FaGraduationCap className="mr-1" />
                      <span>{instructor.courses || 0}</span>
                    </div>
                    <p className="text-sm text-[#994D1C]">Kurs</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredInstructors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#994D1C] text-lg">
              Aradığınız kriterlere uygun eğitmen bulunamadı.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
