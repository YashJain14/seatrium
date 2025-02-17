import { NextResponse } from 'next/server';
import { getSpreadsheetBySpreadsheetId } from '@/lib/actions/user.action';

export async function GET(
  request: Request,
  { params }: { params: { spreadsheetId: string } }
) {
  try {
    const spreadsheet = await getSpreadsheetBySpreadsheetId(params.spreadsheetId);
    
    if (!spreadsheet) {
      return NextResponse.json(
        { error: 'Spreadsheet not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(spreadsheet);
  } catch (error) {
    console.error('Error fetching spreadsheet:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spreadsheet' },
      { status: 500 }
    );
  }
}