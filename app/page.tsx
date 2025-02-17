'use client';

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Navigation */}
        <nav className="absolute top-0 left-0 w-full z-10 p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Image 
                src="/seatrium-logo.svg" 
                alt="Seatrium" 
                width={150} 
                height={40}
                className="h-10 w-auto"
              />
            </div>
            
            {/* Auth Button */}
            <div>
              {isSignedIn ? (
                <div className="flex items-center gap-4">
                  <span className="text-white">
                    Welcome, {user.firstName}
                  </span>
                  <button
                    onClick={() => router.push('/chatbot')}
                    className="bg-green-500 text-white px-6 py-2 rounded-full
                             hover:bg-green-600 transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-green-300"
                  >
                    Go to App
                  </button>
                  <SignOutButton>
                    <button className="bg-white text-blue-600 px-6 py-2 rounded-full
                                     hover:bg-blue-50 transition-colors duration-200
                                     focus:outline-none focus:ring-2 focus:ring-blue-300">
                      Sign Out
                    </button>
                  </SignOutButton>
                </div>
              ) : (
                <SignInButton>
                  <button className="bg-white text-blue-600 px-6 py-2 rounded-full
                                   hover:bg-blue-50 transition-colors duration-200
                                   focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Sign In
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative bg-blue-600 pt-32 pb-20 sm:pt-40 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Streamline Your</span>
                <span className="block">Steel Manufacturing Data</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
                Efficiently collect and manage sustainability data for your steel manufacturing process. 
                Make informed decisions with comprehensive data analysis.
              </p>
              
              {/* CTA Buttons */}
              <div className="mt-10 flex justify-center gap-4">
                {isSignedIn ? (
                  <button
                    onClick={() => router.push('/chatbot')}
                    className="bg-green-500 text-white px-8 py-3 rounded-full
                             text-lg font-semibold hover:bg-green-600 
                             transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-green-300"
                  >
                    Launch Application
                  </button>
                ) : (
                  <SignInButton>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-full
                                     text-lg font-semibold hover:bg-blue-50 
                                     transition-colors duration-200
                                     focus:outline-none focus:ring-2 focus:ring-blue-300">
                      Get Started
                    </button>
                  </SignInButton>
                )}
              </div>
            </div>
          </div>

          {/* Decorative blob */}
          <div className="absolute inset-y-0 right-0 hidden lg:block lg:left-2/3">
            <svg
              className="absolute inset-0 h-full w-full text-blue-500"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d="M0 0L100 0L100 100L25 100C11.1929 100 0 88.8071 0 75V0Z"
                fill="currentColor"
                opacity="0.1"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};