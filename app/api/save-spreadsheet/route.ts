// app/api/save-spreadsheet/route.ts
import { NextResponse } from 'next/server';
import { saveSpreadsheetData } from '@/lib/actions/user.action';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, userId, rows } = body;

    await saveSpreadsheetData({ productId, userId, rows });

    return NextResponse.json({ 
      success: true, 
      message: 'Spreadsheet data saved successfully',
    });

  } catch (error) {
    console.error('Error saving spreadsheet:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save spreadsheet data' },
      { status: 500 }
    );
  }
}