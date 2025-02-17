'use client';

import { useParams, useSearchParams } from 'next/navigation';
import ViewSpreadsheet from '@/components/view-spreadsheet';
import { useEffect, useState } from 'react';

interface SpreadsheetData {
  spreadsheetId: string;
  productId: string;
  userId: string;
  data: Record<string, string>[];
  createdAt: string;
  updatedAt: string;
}

interface ProductData {
  productName: string;
  columns: string[];
}

export default function ViewSpreadsheetPage() {
  const params = useParams();
  const spreadsheetId = params.spreadsheetId as string;
  console.log("here", spreadsheetId)
  const [spreadsheetData, setSpreadsheetData] = useState<SpreadsheetData | null>(null);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!spreadsheetId) {
        setError('No spreadsheet ID provided');
        setIsLoading(false);
        return;
      }

      try {
        // Fetch spreadsheet data
        const spreadsheetResponse = await fetch(`/api/spreadsheet/${spreadsheetId}`);
        if (!spreadsheetResponse.ok) {
          throw new Error('Failed to fetch spreadsheet data');
        }
        const spreadsheet = await spreadsheetResponse.json();
        setSpreadsheetData(spreadsheet);


      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [spreadsheetId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !spreadsheetData ) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-red-600">{error || 'Data not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <ViewSpreadsheet 
          spreadsheet={spreadsheetData}
        />
      </div>
    </div>
  );
}