'use client'

import { useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'

export default function Dashboard() {
  // In a prototype, we'll just store products in local state
  const [products, setProducts] = useState<{name: string, emissionFactor: number}[]>([])
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Products</h1>
        <Link 
          href="/create-product" 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Product
        </Link>
      </div>
      
      {products.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">No Products Yet</h2>
          <p className="text-gray-600 mb-6">Start by creating your first product to calculate its emissions.</p>
          <Link 
            href="/create-product" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Your First Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}