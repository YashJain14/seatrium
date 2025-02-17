// app/api/spreadsheet/route.ts
import { NextResponse } from 'next/server';
import { getSpreadsheetsByUser } from '@/lib/actions/user.action';

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    const spreadsheets = await getSpreadsheetsByUser(userId);
    // console.log(spreadsheets);
    return NextResponse.json(spreadsheets);
  } catch (error) {
    console.error('Error fetching spreadsheets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spreadsheets' },
      { status: 500 }
    );
  }
}