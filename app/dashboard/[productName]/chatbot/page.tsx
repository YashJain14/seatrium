'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Chatbot from '@/components/chatbot';
import { useAuth } from '@clerk/nextjs';

const ChatbotPage: React.FC = () => {
  const { productName } = useParams();
  const { userId } = useAuth();

  if (!userId) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Chatbot userId={userId} productName={productName as string} />
    </div>
  );
};

export default ChatbotPage;
