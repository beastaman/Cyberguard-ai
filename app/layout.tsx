import { Inter } from 'next/font/google'
import '@/app/globals.css'
import MagicalCursor from '@/components/MagicalCursor'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CyberGaurd AI',
  description: 'AI-Powered Cybersecurity Solutions',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-gray-100`}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <MagicalCursor />
        {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}