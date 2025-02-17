import { NextResponse } from 'next/server';

import { updateSpreadsheetData } from '@/lib/actions/user.action';

export async function POST(req: Request) {
  try {
    // Check authentication


    // Parse request body
    const body = await req.json();
    const { spreadsheetId, data, userId } = body;

    if (!spreadsheetId || !Array.isArray(data)) {
      return new NextResponse('Invalid request data', { status: 400 });
    }

    // Update spreadsheet in database
    const updatedSpreadsheet = await updateSpreadsheetData(
      spreadsheetId,
      data,
      userId
    );

    // Return success response
    return NextResponse.json({
      message: 'Spreadsheet updated successfully',
      updatedAt: updatedSpreadsheet.updatedAt,
    });
  } catch (error) {
    console.error('API error:', error);
    
    if (error instanceof Error) {
      if (error.message === 'Spreadsheet not found or access denied') {
        return new NextResponse('Spreadsheet not found or access denied', { 
          status: 404 
        });
      }
      if (error.message === 'Failed to update spreadsheet data') {
        return new NextResponse('Failed to update spreadsheet', { 
          status: 500 
        });
      }
    }
    
    return new NextResponse('Internal server error', { status: 500 });
  }
}