import React, { useState } from 'react';
import Spreadsheet, { Matrix, CellBase } from 'react-spreadsheet';
import { Plus } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface ViewSpreadsheetProps {
  spreadsheet: {
    spreadsheetId: string;
    productId: string;
    userId: string;
    data: Record<string, string>[];
    createdAt: string;
    updatedAt: string;
  };
}

interface SpreadsheetCell extends CellBase {
  value: string;
  readOnly: boolean;
}

const ViewSpreadsheet: React.FC<ViewSpreadsheetProps> = ({ spreadsheet }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState<Matrix<SpreadsheetCell>>(convertDataToMatrix(spreadsheet.data));
  const { userId} = useAuth();
  const router = useRouter();
  function convertDataToMatrix(jsonData: Record<string, string>[]): Matrix<SpreadsheetCell> {
    if (jsonData.length === 0) return [];

    const headers = Object.keys(jsonData[0]);
    
    // Create header row (read-only)
    const headerRow = headers.map(header => ({
      value: header,
      readOnly: true
    }));

    // Create data rows (editable)
    const dataRows = jsonData.map(row => 
      headers.map(header => ({
        value: row[header] ?? '',
        readOnly: false
      }))
    );

    return [headerRow, ...dataRows];
  }

  function convertMatrixToJson(matrix: Matrix<SpreadsheetCell>): Record<string, string>[] {
    if (matrix.length < 2) return []; // Need at least headers and one data row

    const headers = matrix[0].map(cell => cell?.value ?? '');
    const jsonData = matrix.slice(1).map(row => {
      const rowData: Record<string, string> = {};
      headers.forEach((header, index) => {
        const cellValue = row[index]?.value;
        if (header && cellValue !== undefined) {
          rowData[header] = cellValue;
        }
      });
      return rowData;
    });

    return jsonData;
  }

  const handleAddRow = () => {
    setData(currentData => {
      if (currentData.length === 0) return currentData;

      // Create a new row with empty values
      const numberOfColumns = currentData[0].length;
      const newRow = Array(numberOfColumns).fill(null).map(() => ({
        value: '',
        readOnly: false
      }));

      return [...currentData, newRow];
    });
  };

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      const updatedData = convertMatrixToJson(data);
      
      const response = await fetch('/api/update-spreadsheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spreadsheetId: spreadsheet.spreadsheetId,
          data: updatedData,
          userId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update spreadsheet');
      }

      // Optional: Update the last modified time
      const result = await response.json();
      if (result.updatedAt) {
        spreadsheet.updatedAt = result.updatedAt;
      }
      router.push('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Error updating spreadsheet:', error);
      alert('Failed to update spreadsheet. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      {/* Header Information */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Spreadsheet View</h2>
          <div className="flex gap-2">
            <button
              onClick={handleAddRow}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Plus size={18} />
              Add Row
            </button>
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isUpdating ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-600 space-y-1 mt-2">
          <p>Created: {formatDate(spreadsheet.createdAt)}</p>
          <p>Last Updated: {formatDate(spreadsheet.updatedAt)}</p>
        </div>
      </div>

      {/* Spreadsheet View */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="overflow-x-auto">
          <Spreadsheet<SpreadsheetCell>
            data={data}
            onChange={setData}
            className="w-full"
          />
        </div>
      </div>


    </div>
  );
};

export default ViewSpreadsheet;