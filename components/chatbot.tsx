'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  categories,
  NodeType,
  ChatbotNode,
  QuestionNode,
  LeafNode,
} from '../lib/questions';
import DataSpreadsheet from '@/components/data-spreadsheet';


interface ChatbotProps {
  userId: string;
  productName: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ userId, productName }) => {
  const router = useRouter();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(0);
  const [currentNode, setCurrentNode] = useState<ChatbotNode>(
    categories[0].root
  );
  const [aggregatedColumns, setAggregatedColumns] = useState<string[]>([]);
  const [done, setDone] = useState<boolean>(false);
  const [productSaved, setProductSaved] = useState<boolean>(false);
  const [productSchema, setProductSchema] = useState<any>(null); 

  const isQuestionNode = (node: ChatbotNode): node is QuestionNode =>
    node.type === NodeType.QUESTION;

  const isLeafNode = (node: ChatbotNode): node is LeafNode =>
    node.type === NodeType.LEAF;

  const handleOptionClick = (optionText: string) => {
    if (isQuestionNode(currentNode)) {
      const selectedOption = currentNode.options.find(
        (opt) => opt.text === optionText
      );
      if (selectedOption?.next) {
        setCurrentNode(selectedOption.next);
      }
    }
  };

  const moveToNextCategory = (node: ChatbotNode) => {
    if (!isLeafNode(node)) return;

    setAggregatedColumns((prev) => [...prev, ...node.columns]);

    const nextCategoryIndex = currentCategoryIndex + 1;
    if (nextCategoryIndex < categories.length) {
      setCurrentCategoryIndex(nextCategoryIndex);
      setCurrentNode(categories[nextCategoryIndex].root);
    } else {
      setDone(true);
    }
  };

  useEffect(() => {
    if (isLeafNode(currentNode)) {
      const timer = setTimeout(() => {
        moveToNextCategory(currentNode);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentNode, currentCategoryIndex]);

  // Save product when Q&A is done
  useEffect(() => {
    if (done && !productSaved) {
      const saveProduct = async () => {
        try {
          const res = await fetch('/api/save-product', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              productName,
              columns: aggregatedColumns,
            }),
          });
  
          if (!res.ok) {
            throw new Error('Failed to save product');
          }
  
          const data = await res.json(); // Fetch response
          setProductSchema(data.product); // Store schema in state
          console.log(data.product);
          setProductSaved(true);
        } catch (error) {
          console.error('Error saving product:', error);
        }
      };
      saveProduct();
    }
  }, [done, productSaved, aggregatedColumns, productName, userId]);



  if (done && productSchema) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Data Collection Form
          </h2>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Please fill in the following information:
            </h3>
            <p className="text-gray-600 mb-6">
              Enter your data in the spreadsheet below. You can add more rows as needed.
            </p>
            
            <DataSpreadsheet schema={productSchema} />
          </div>
        </div>
      </div>
    );
  }

  if (isLeafNode(currentNode)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            {categories[currentCategoryIndex].title}
          </h1>
          <div className="animate-pulse">
            <div className="text-lg text-gray-600">Processing response...</div>
            <div className="mt-4 h-2 w-40 bg-blue-200 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isQuestionNode(currentNode)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              {categories[currentCategoryIndex].title}
            </h1>
            <h2 className="text-xl text-gray-700 px-4">
              {currentNode.text}
            </h2>
          </div>
          <div className="space-y-3 max-w-xl mx-auto">
            {currentNode.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option.text)}
                className="w-full p-4 text-left bg-white border-2 border-gray-200 
                           rounded-full hover:bg-blue-50 hover:border-blue-300
                           transition-all duration-200 ease-in-out
                           text-gray-700 hover:text-blue-600
                           shadow-sm hover:shadow-md
                           focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <div>Invalid state</div>;
};

export default Chatbot;
