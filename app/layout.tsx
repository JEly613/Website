import type { Metadata } from 'next'
import { Cormorant, Source_Sans_3 } from 'next/font/google'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import '@/styles/globals.css'

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Personal Website',
  description: 'Physics notes, photography, and writing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${sourceSans.variable}`}>
      <body className="font-body">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
