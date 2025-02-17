// app/dashboard/spreadsheet/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import DataSpreadsheet from '@/components/data-spreadsheet';  // Make sure this path matches your component location

export default function SpreadsheetPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get('data');
  
  if (!data) {
    return <div>No data provided</div>;  // Always return a valid React element
  }

  const schema = JSON.parse(decodeURIComponent(data));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <DataSpreadsheet schema={schema} />
      </div>
    </div>
  );
}