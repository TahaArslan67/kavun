'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaInstagram, FaLinkedin, FaDiscord, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError(data.error || 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    } catch (error) {
      console.error('Form gönderimi sırasında hata:', error);
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'E-posta',
      value: 'info@kavun.org',
      href: 'mailto:info@kavun.org'
    }
  ];

  const socialLinks = [
    { 
      icon: FaInstagram, 
      href: 'https://www.instagram.com/codesmedipol/', 
      label: 'Instagram',
      description: 'Etkinliklerimizi ve güncel gelişmeleri takip edin'
    },
    { 
      icon: FaLinkedin, 
      href: 'https://www.linkedin.com/company/kavun', 
      label: 'LinkedIn',
      description: 'Profesyonel ağımıza katılın ve kariyer fırsatlarını keşfedin'
    },
    { 
      icon: FaDiscord, 
      href: 'https://discord.gg/kavun', 
      label: 'Discord',
      description: 'Topluluğumuza katılın ve diğer üyelerle etkileşime geçin'
    }
  ];

  return (
    <div className="min-h-screen pt-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 via-emerald-100 to-emerald-200" />

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800"
        >
          Bizimle İletişime Geçin
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-emerald-50/80 backdrop-blur-sm p-8 rounded-xl border border-emerald-200 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-emerald-900 mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-emerald-900 placeholder-emerald-400"
                  placeholder="Adınız Soyadınız"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-emerald-900 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-emerald-900 placeholder-emerald-400"
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-emerald-900 mb-2">
                  Konu
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-emerald-900 placeholder-emerald-400"
                  placeholder="Mesajınızın konusu"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-emerald-900 mb-2">
                  Mesaj
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-emerald-900 placeholder-emerald-400 resize-none"
                  placeholder="Mesajınız..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full relative overflow-hidden group bg-gradient-to-r from-emerald-600 to-emerald-500 text-emerald-50 py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-emerald-400/20 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-500" />
                <span className="relative">
                  {loading ? 'Gönderiliyor...' : 'Gönder'}
                </span>
              </button>

              {success && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-emerald-600 text-center mt-4"
                >
                  Mesajınız başarıyla gönderildi!
                </motion.p>
              )}

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-center mt-4"
                >
                  {error}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-12"
          >
            {/* Contact Info */}
            <div className="grid gap-8">
              {contactInfo.map((info) => (
                <a
                  key={info.title}
                  href={info.href}
                  className="group flex items-center p-6 bg-emerald-50/80 backdrop-blur-sm rounded-xl border border-emerald-200 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 text-emerald-50">
                    <info.icon className="text-2xl" />
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-medium text-emerald-600">{info.title}</p>
                    <p className="text-lg font-semibold text-emerald-900 group-hover:text-emerald-700 transition-colors duration-300">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-emerald-900">Bizi Takip Edin</h2>
              <div className="grid gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center p-6 bg-emerald-50/80 backdrop-blur-sm rounded-xl border border-emerald-200 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 text-emerald-50">
                      <link.icon className="text-2xl" />
                    </div>
                    <div className="ml-6">
                      <p className="text-lg font-semibold text-emerald-900 group-hover:text-emerald-700 transition-colors duration-300">
                        {link.label}
                      </p>
                      <p className="text-sm text-emerald-600">{link.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}