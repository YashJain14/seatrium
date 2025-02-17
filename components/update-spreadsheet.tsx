import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Spreadsheet, { Matrix, CellBase } from 'react-spreadsheet';

interface UpdateSpreadsheetProps {
  spreadsheetId: string;
  productId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  data: Array<Record<string, string>>;
}

interface SpreadsheetCell extends CellBase {
  value: string;
  readOnly?: boolean;
}

const UpdateSpreadsheet: React.FC<UpdateSpreadsheetProps> = ({ 
  spreadsheetId,
  productId,
  userId,
  createdAt,
  updatedAt,
  data: initialData
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [spreadsheetData, setSpreadsheetData] = useState<Matrix<SpreadsheetCell>>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    const fetchSpreadsheetData = async () => {
      try {
        const response = await fetch(`/api/spreadsheet/${spreadsheetId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch spreadsheet data');
        }
        
        const result = await response.json();
        
        // Extract columns from the first data row
        const columnNames = Object.keys(result.data[0] || {});
        setColumns(columnNames);
        
        // Create header row
        const headerRow = columnNames.map(col => ({ 
          value: col, 
          readOnly: true 
        }));
        
        // Create data rows
        const dataRows = result.data.map((row: Record<string, string>) => 
          columnNames.map(col => ({
            value: row[col] || ''
          }))
        );
        
        setSpreadsheetData([headerRow, ...dataRows]);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsLoading(false);
      }
    };

    fetchSpreadsheetData();
  }, [spreadsheetId]);

  const addRow = () => {
    const newRow = columns.map(() => ({ value: '' }));
    setSpreadsheetData(prevData => [...prevData, newRow]);
  };

  const handleUpdate = async () => {
    try {
      const formattedData = {
        spreadsheetId,
        productId,
        userId,
        rows: spreadsheetData.slice(1).map((row: (SpreadsheetCell | undefined)[]) => {
          return row.reduce((acc: Record<string, string>, cell: SpreadsheetCell | undefined, index: number) => {
            acc[columns[index]] = cell?.value || '';
            return acc;
          }, {});
        })
      };

      const response = await fetch(`/api/spreadsheet/${spreadsheetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update spreadsheet data');
      }

      const result = await response.json();
      if (result.success) {
        alert('Data updated successfully!');
        router.push('/dashboard');
      } else {
        throw new Error(result.error || 'Failed to update data');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Failed to update data. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">Loading spreadsheet data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Update Spreadsheet</h2>
          <p className="text-sm text-gray-600">
            Last updated: {new Date(updatedAt).toLocaleString()}
          </p>
        </div>

        <div className="overflow-x-auto mb-6">
          <Spreadsheet<SpreadsheetCell>
            data={spreadsheetData}
            onChange={setSpreadsheetData}
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
            onClick={handleUpdate}
            className="px-6 py-2 bg-green-500 text-white rounded-full 
                     hover:bg-green-600 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Update Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateSpreadsheet;