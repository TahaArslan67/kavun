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
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-emerald-600 text-xl">Eğitmenler yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 via-emerald-100 to-emerald-200" />

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800">
            Eğitmenlerimiz
          </h1>
          <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
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
              className="w-full px-4 py-2 bg-emerald-50/80 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-emerald-900 placeholder-emerald-400"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaChalkboardTeacher className="text-emerald-400" />
            </div>
          </div>

          {/* Expertise Filter */}
          <select
            value={selectedExpertise}
            onChange={(e) => setSelectedExpertise(e.target.value)}
            className="px-4 py-2 bg-emerald-50/80 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-emerald-900"
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
              className="bg-emerald-50/80 backdrop-blur-sm rounded-xl border border-emerald-200 overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300"
            >
              {/* Instructor Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent z-10" />
                <img
                  src={instructor.image || '/instructors/default.jpg'}
                  alt={instructor.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Instructor Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-emerald-900 mb-2">{instructor.name}</h3>
                <p className="text-emerald-600 mb-4">{instructor.title || 'Eğitmen'}</p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {instructor.expertise?.map(exp => (
                    <span
                      key={exp}
                      className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm"
                    >
                      {exp}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center border-t border-emerald-200 pt-4">
                  <div>
                    <div className="flex items-center justify-center text-emerald-600 mb-1">
                      <FaStar className="mr-1" />
                      <span>{instructor.rating || 0}</span>
                    </div>
                    <p className="text-sm text-emerald-500">Puan</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center text-emerald-600 mb-1">
                      <FaUserGraduate className="mr-1" />
                      <span>{instructor.students || 0}</span>
                    </div>
                    <p className="text-sm text-emerald-500">Öğrenci</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center text-emerald-600 mb-1">
                      <FaGraduationCap className="mr-1" />
                      <span>{instructor.courses || 0}</span>
                    </div>
                    <p className="text-sm text-emerald-500">Kurs</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredInstructors.length === 0 && (
          <div className="text-center text-emerald-600 text-xl">
            {searchTerm || selectedExpertise ? 'Arama kriterlerine uygun eğitmen bulunamadı' : 'Henüz eğitmen bulunmuyor'}
          </div>
        )}
      </div>
    </div>
  );
}
