'use client';
import { motion } from 'framer-motion';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-emerald-50 to-emerald-100 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/50 via-emerald-100/30 to-emerald-200/50" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Top Left Blob */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-br from-emerald-300/50 to-emerald-400/50 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
        />
        
        {/* Top Right Blob */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -top-48 -right-48 w-96 h-96 bg-gradient-to-br from-emerald-400/50 to-emerald-500/50 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
        />
        
        {/* Bottom Left Blob */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-br from-emerald-500/50 to-emerald-300/50 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"
        />
        
        {/* Bottom Right Blob */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute -bottom-48 -right-48 w-96 h-96 bg-gradient-to-br from-emerald-300/50 to-emerald-400/50 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
        />
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,95,70,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,95,70,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      {/* Content Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative min-h-screen flex items-center justify-center px-4"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative bg-emerald-50/80 backdrop-blur-sm border border-emerald-200 shadow-lg shadow-emerald-100/50 rounded-2xl overflow-hidden"
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 via-emerald-50/30 to-emerald-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative p-8">
              {children}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}