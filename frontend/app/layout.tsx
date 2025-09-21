import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Letrum Agency - Premier Tours & Travel Services in Kenya',
  description: 'Discover Africa with Letrum Agency. Premium safari tours, car rentals, visa assistance, and travel products. Your gateway to extraordinary African adventures.',
  keywords: 'Kenya safari, tours, travel, car rental, visa assistance, Masai Mara, Amboseli, Tsavo, travel agency Kenya',
  authors: [{ name: 'Letrum Agency' }],
  openGraph: {
    title: 'Letrum Agency - Premier Tours & Travel Services',
    description: 'Discover Africa with premium safari tours, car rentals, and travel services.',
    url: 'https://letrumagency.com',
    siteName: 'Letrum Agency',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Letrum Agency - African Safari Tours',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Letrum Agency - Premier Tours & Travel Services',
    description: 'Discover Africa with premium safari tours, car rentals, and travel services.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      {/* suppressHydrationWarning prevents React from warning when external extensions inject attributes */}
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <Toaster 
          position="top-right"
          richColors
          expand
          closeButton
          toastOptions={{
            style: {
              background: 'white',
              border: '1px solid #e5e7eb',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  )
}
