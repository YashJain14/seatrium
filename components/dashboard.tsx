// pages/dashboard.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  productName: string;
  columns: string[];
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
        <Link href="/new-product">
          <button className="mb-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            Create New Product
          </button>
        </Link>

        <h2 className="text-2xl font-semibold mb-4">Your Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <ul className="space-y-4">
            {products.map((product) => (
              <li key={product.id} className="p-4 bg-white shadow rounded-lg">
                <h3 className="text-xl font-bold">{product.productName}</h3>
                <p className="text-gray-600">
                  Columns: {product.columns.join(', ')}
                </p>
                <p className="text-gray-500 text-sm">
                  Created: {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
