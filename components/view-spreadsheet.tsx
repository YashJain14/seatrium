import React from 'react';
import Spreadsheet, { Matrix, CellBase } from 'react-spreadsheet';

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
  // Convert the data into the format required by react-spreadsheet
  const spreadsheetData: Matrix<SpreadsheetCell> = React.useMemo(() => {
    if (spreadsheet.data.length === 0) return [];

    // Get headers from the first data object's keys
    const headers = Object.keys(spreadsheet.data[0]);
    
    // Create header row
    const headerRow = headers.map(header => ({
      value: header,
      readOnly: true
    }));

    // Create data rows
    const dataRows = spreadsheet.data.map(row => 
      headers.map(header => ({
        value: row[header] || '',
        readOnly: true
      }))
    );

    return [headerRow, ...dataRows];
  }, [spreadsheet.data]);

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
        <h2 className="text-xl font-semibold mb-2">Spreadsheet View</h2>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Created: {formatDate(spreadsheet.createdAt)}</p>
          <p>Last Updated: {formatDate(spreadsheet.updatedAt)}</p>
        </div>
      </div>

      {/* Spreadsheet View */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="overflow-x-auto">
          <Spreadsheet<SpreadsheetCell>
            data={spreadsheetData}
            onChange={() => {}} // Empty function since it's read-only
            className="w-full"
          />
        </div>
      </div>

      {/* Optional: Add any additional controls or information here */}
      <div className="mt-4 text-sm text-gray-600">
        <p>Spreadsheet ID: {spreadsheet.spreadsheetId}</p>
      </div>
    </div>
  );
};

export default ViewSpreadsheet;