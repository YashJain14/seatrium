// components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">Emissions Calculator</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link 
              href="/dashboard" 
              className="px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}