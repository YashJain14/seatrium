import { useRouter } from 'next/navigation';
import React, { useState, useMemo } from 'react';
import Spreadsheet, { Matrix, CellBase } from 'react-spreadsheet';

interface SpreadsheetProps {
  schema: {
    productId: string;
    userId: string;
    productName: string;
    columns: string[];
    createdAt: string;
    updatedAt: string;
  }
}

interface SpreadsheetCell extends CellBase {
  value: string;
  readOnly?: boolean;
}

const DataSpreadsheet: React.FC<SpreadsheetProps> = ({ schema }) => {
  const { productId, userId, productName, columns, createdAt, updatedAt } = schema;
  const router = useRouter();

  // Initialize with header row plus one empty data row
  const initialData: Matrix<SpreadsheetCell> = useMemo(() => {
    // Create header row
    const headerRow = columns.map(col => ({ value: col, readOnly: true }));
    
    // Create one empty data row
    const emptyRow = columns.map(() => ({ value: '' }));
    
    return [headerRow, emptyRow];
  }, [columns]);

  const [data, setData] = useState<Matrix<SpreadsheetCell>>(initialData);

  const addRow = () => {
    const newRow = columns.map(() => ({ value: '' }));
    setData((prevData: Matrix<SpreadsheetCell>) => [...prevData, newRow]);
  };

  const handleSave = async () => {
    try {
      // Format the data for saving
      const formattedData = {
        productId: schema.productId,
        userId: schema.userId,
        rows: data.slice(1).map((row: (SpreadsheetCell | undefined)[]) => {
          return row.reduce((acc: Record<string, string>, cell: SpreadsheetCell | undefined, index: number) => {
            acc[schema.columns[index]] = cell?.value || '';
            return acc;
          }, {});
        })
      };
  
      const response = await fetch('/api/save-spreadsheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save spreadsheet data');
      }
  
      const result = await response.json();
      if (result.success) {
        alert('Data saved successfully!');
        router.push('/dashboard'); // Redirect to dashboard
      } else {
        throw new Error(result.error || 'Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      {/* Product Info Header */}
      
        <h2 className="text-xl font-semibold mb-2">{productName}</h2>
      

      {/* Spreadsheet */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="overflow-x-auto mb-6">
          <Spreadsheet<SpreadsheetCell>
            data={data}
            onChange={setData}
            className="w-full"
          />
        </div>
        
        <div className="mt-6 flex justify-between">
          <button
            onClick={addRow}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full 
                     hover:bg-gray-200 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Add Row
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-full 
                     hover:bg-blue-600 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Save Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataSpreadsheet;