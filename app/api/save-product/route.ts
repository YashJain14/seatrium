import { NextRequest, NextResponse } from 'next/server';
import { createProduct } from '@/lib/actions/user.action';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received product data:', body);

    const { userId, productName, columns } = body;

    // Validate input
    if (!userId || !productName || !Array.isArray(columns)) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    // Save product using the createProduct function
    const product = await createProduct({
      userId,
      productName: decodeURIComponent(productName), // Decode URL encoding
      columns,
    });

    return NextResponse.json({ message: 'Product saved successfully', product }, { status: 201 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
