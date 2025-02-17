import React, { useState, useMemo } from 'react';
import Spreadsheet, { Matrix, CellBase } from 'react-spreadsheet';

interface SpreadsheetProps {
  columns: string[];
}

interface SpreadsheetCell extends CellBase {
  value: string;
  readOnly?: boolean;
}

const DataSpreadsheet: React.FC<SpreadsheetProps> = ({ columns }) => {
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

  const handleSave = () => {
    // Convert spreadsheet data to a more usable format
    const formattedData = data.slice(1).map((row: (SpreadsheetCell | undefined)[]) => {
      return row.reduce((acc: Record<string, string>, cell: SpreadsheetCell | undefined, index: number) => {
        // Handle potentially undefined cells
        acc[columns[index]] = cell?.value || '';
        return acc;
      }, {});
    });

    console.log('Saving data:', formattedData);
    alert('Data saved successfully!');
  };

  const handleChange = (newData: Matrix<SpreadsheetCell>) => {
    // Ensure all cells have at least an empty string value
    const validatedData = newData.map(row => 
      row.map(cell => cell || { value: '' })
    );
    setData(validatedData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="overflow-x-auto mb-6">
        <Spreadsheet<SpreadsheetCell>
          data={data}
          onChange={handleChange}
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
  );
};

export default DataSpreadsheet;