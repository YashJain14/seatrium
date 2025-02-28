// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Scope 3 Emissions Calculator',
  description: 'Calculate scope 3 emissions for steel products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="py-4 border-b">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-blue-600">
              Seatrium 
            </h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}