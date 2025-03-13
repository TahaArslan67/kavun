import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import Navbar from '../src/components/Navbar'
import { AuthProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kavun - Geleceğe Adım At',
  description: 'Kavun resmi web sitesi',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/logo.ico" />
      </head>
      <body className={`${inter.className} bg-emerald-50 text-emerald-900 min-h-screen`}>
        <AuthProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#2ecc71',
                color: '#ecfdf5',
                borderRadius: '8px',
              },
              success: {
                style: {
                  background: '#2ecc71',
                },
                iconTheme: {
                  primary: '#ecfdf5',
                  secondary: '#2ecc71',
                },
              },
              error: {
                style: {
                  background: '#991b1b',
                },
                iconTheme: {
                  primary: '#fee2e2',
                  secondary: '#991b1b',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}