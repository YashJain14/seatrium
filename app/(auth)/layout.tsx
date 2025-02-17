import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Weaver AI",
  description: "Craft Your Vision with AI-Powered Textile Designing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body
        className={cn(
          "font-sans antialiased bg-zinc-900",
          fontSans.variable
        ) }
      >
        
          {children}
       
        </body>
      </html>
    </ClerkProvider>
  );
}
