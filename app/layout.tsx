import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import Navbar from '@/src/components/Navbar'

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
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.ico" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#FFF5F0',
                color: '#6B3416',
                border: '1px solid #FFE5D9',
              },
              success: {
                iconTheme: {
                  primary: '#6B3416',
                  secondary: '#FFF5F0',
                },
              },
              error: {
                iconTheme: {
                  primary: '#FF8B5E',
                  secondary: '#FFF5F0',
                },
              },
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}