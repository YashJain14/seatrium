import type { Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: 'Seatrium',
  description: 'Seatrium',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>

          {children}
        </body>
      </html>
    </ClerkProvider>
  )

}
