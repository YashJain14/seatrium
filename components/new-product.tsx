// pages/new-product.tsx
'use client';

import React, { useState } from 'react';
import Chatbot from '@/components/chatbot';

const NewProduct: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productName.trim() !== '') {
      setSubmitted(true);
    }
  };

  if (!submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Create New Product</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="w-full border border-gray-300 p-2 rounded mb-4"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Start
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Pass the product name to the Chatbot component
  return <Chatbot productName={productName} />;
};

export default NewProduct;
