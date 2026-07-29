import type { Metadata, Viewport } from 'next'
import { Outfit, Space_Mono } from 'next/font/google'
import './globals.css'
import ClientShell from '@/components/client-shell'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Alpha Elefant — Multi-Vertical Powerhouse',
  icons: {
    icon: '/favicon.ico',
  },
  description:
    'Alpha Elefant is a next-generation multi-vertical company delivering institutional renovation, skill development, technology products, international tech services, and strategic business alliances.',
  keywords: ['Alpha Elefant', 'institutional renovation', 'skill development', 'fintech', 'cybersecurity', 'Pakistan'],
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#08111A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceMono.variable} bg-background`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ClientShell>
          <Navbar />
          <div className="pt-20">
            {children}
          </div>
          <Footer />
        </ClientShell>
        <script defer src="https://analytics.alphaelefant.com/script.js" data-website-id="8f7b0987-8a64-40a7-ac11-2bc73e9f8963"></script>
      </body>
    </html>
  )
}

